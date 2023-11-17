// Imports
import busboy from "busboy";
import express from "express";
import fs from 'fs';

// Get the config file, prefer the normal one
var c = "./config.example.js";
if (fs.existsSync("./config.js")) {
  c = "./config.js";
}
const config = await import(c);

// Make a server
const server = express();

// Serve static files from PREFIX, also handles index.html for some reason
server.use(express.static(config.PREFIX));
// Accept application/json data from POSTs
//server.use(express.json());

// Handle POSTing the bus location
server.post("/", (req, res) => {

  // Convienence
  const b = req.body;
  var time;
  var lat;
  var long;
  var sign;
  var status = 200;
  console.log(req.headers['content-length']);

  // Exit early on too-large content; I will NOT succumb to a gigabyte of 4's
  if (req.headers['content-length'] > config.MAX_MSG_BYTES) {

    res.status(413);
    res.send('Error 413: Content Too Large');
    return;
  }

  // Parse the request, with strict limits
  const bb = busboy({
    headers: req.headers,
    limits: {
      fieldNameSize: 32,
      fieldSize: config.MAX_MSG_BYTES,
      fields: 3,
      fileSize: config.MAX_MSG_BYTES,
      files: 1,
      parts: 4
    }
  });

  // Get the fields
  bb.on("field", (name, value) => {
    switch (name) {
      case "time":
        time = value; break;
      case "lat":
        lat = parseFloat(value); break;
      case "long":
        long = parseFloat(value); break;
      default:
        status = 400;
        break;
    }
  });

  // Get the file
  bb.on("file", (name, stream, info) => {
    var bufs = [];
    stream.on('data', (d) => { bufs.push(d); });
    stream.on('end', () => { sign = Buffer.concat(bufs); });
    console.log("Loaded file!");
  });

  // Validate message
  bb.on("close", () => {

    // Must have these fields
    // Sign should really be Buffer, but JS is lame
    if (typeof time !== "string"
      || typeof lat !== "number"
      || typeof long !== "number"
      || typeof sign !== "object" || sign == null) {
      
      status = 400;
      console.log("oops");
      console.log(time);
      console.log(lat);
      console.log(long);
      console.log(sign);
    } else {

      // Check the message signature
      // This SHOULD be all string concatenation
      const data = time + lat + long;
      console.log(data);
      if (!config.verifyRaw(data, sign)) {

        status = 401;
      }
    }

    switch (status) {
      case 200: res.send("200 OK; Bus updated!"); break;
      case 400: res.send("Error 400: Bad Request"); break;
      case 401: res.send('Error 401: Not Authorized'); break;
      default:  status = 500; res.send("Error 500: Internal Server Error"); break;
    }
    res.status(status);

    console.log("Processing over.");
  });

  req.pipe(bb);
});

// Start the server!
server.listen(config.PORT, () => {
  console.log(`Express running on http://${config.HOSTNAME}:${config.PORT}/`);
});
