# baron-bus-finder

This repo hosts the server and website behind Franciscan University's Baron Bus tracker.
Website files are in `./page/`, server file is `./server.js`. `./ssl/` is where the RSA public key(s) used by the tracker should go, `./signer.js` is a script used to test the message signing. `./config.example.js` should be altered as needed and copied to `./config.js` in production, although if the latter doesn't exist the server automatically loads the example. Please only use that directly in development.

### To run
Install NodeJS; this was tested against NodeJS v21.1.0, but it probably works with the latest and LTS versions as of 11/11/2023.
Running `node server.js` will start a server at http://localhost:3000 for testing.
