// This file contains configuration data (like passwords, server address, etc)
// The values herein are examples; for an actual deployment, rename to config.js and adjust the values
import fs from "fs";
import crypto from "crypto";

export const HOSTNAME = '127.0.0.1';
export const PORT = 3000;
export const MAX_MSG_BYTES = 1_024; // 1Kib, POSTs shouldn't ever be larger than this
export const PREFIX = "./page";

// This should be randomly generated on the client (the phone) and not changed in production.
// The private key should be left on the phone and the public copied to ./ssl/
const bits = "4096";
const pubKey = fs.readFileSync("./ssl/rsa_" + bits + "_pub.pem");

export function verify(data, signature) {

    const verifier = crypto.createVerify('sha512');
    verifier.write(data);
    return verifier.verify(pubKey, signature, 'base64');
}

export function verifyRaw(data, signature) {

    const verifier = crypto.createVerify('sha512');
    verifier.write(data);
    return verifier.verify(pubKey, signature);
}
