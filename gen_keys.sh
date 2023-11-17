#!/bin/sh
BITS="4096"
openssl genrsa -out ./ssl/rsa_${BITS}_priv.pem $BITS
openssl rsa -in ./ssl/rsa_${BITS}_priv.pem -out ./ssl/rsa_${BITS}_pub.pem -outform PEM -pubout