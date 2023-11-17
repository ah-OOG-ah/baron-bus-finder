// This file is for testing only! The server shouldn't have to sign anything beyond regular HTTPS
import crypto from "crypto";
import fs from "fs";

const bits = "4096";
const privKey = fs.readFileSync("./ssl/rsa_" + bits + "_priv.pem");
const pubKey = fs.readFileSync("./ssl/rsa_" + bits + "_pub.pem");

export function signData(data) {

    const signer = crypto.createSign('sha512');
    signer.update(data);
    return signer.sign(privKey, "base64");
}

export function signDataRaw(data) {

    const signer = crypto.createSign('sha512');
    signer.update(data);
    fs.writeFileSync("./signature.bin", signer.sign(privKey));
}

export function verifyData(data) {

    const verifier = crypto.createVerify('sha512');
    verifier.update(data);
    return verifier.verify(pubKey, "base64");
}

export function verifyDataRaw(data) {

    const verifier = crypto.createVerify('sha512');
    //signer.update(data);
    //fs.writeFileSync("./signature.bin", signer.sign(privKey));
}