const forge = require('node-forge');
const util = require('util');
const crypto = require('crypto');
const {readFileSync} = require("fs");

// const keyPair = forge.pki.rsa.generateKeyPair({bits: 2048});
const privateKeyPem = readFileSync('../keys/private_key.pem', 'utf8');
const publicKeyPem = readFileSync('../keys/public_key.pem', 'utf8');

const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);

const encryptText = (plainText) => {
    const bytes = forge.util.encodeUtf8(plainText); // converting to bytes
    const encrypted = publicKey.encrypt(bytes); // encrypts using Public Key
    return forge.util.encode64(encrypted) // converts data to base64
}

const decryptText = (encryptedText) => {
    // console.log(keyPair.privateKey.decrypt(forge.util.decode64("JHF72kwUBsYwRt58Nsx10Ss/9OmKt2UtMupKsp1f8UAiWJixW1rerSMLsrlr18V+nbDPL6JUMp5de/SFWSRgrkKXezydJ7w7eOrYV3d+2BY7VxcfvvBiuBVfBcCO+FXpUbkOwUNDhKG2B4sqNCqAaYV14GMlXlTkASf3BjxxlKr0UqmLsEfqdm02YyBXVyXKp4t4o4odnO4idimBCBSeLRJ8fDhL/W1X6zjwOj9KV7fRyU1HTKeLTB+vr7392UuwWZRBxkAzo20q3ss+acFEwkOBgeXdF52o4CABMwSFBVRp0SVXnMt8V9yKRqKu6CeEYYJ2Pp5lj+WTrh0zt1s1wQ==")))
    const encrypted = forge.util.decode64(encryptedText); // decodes base64
    const decrypted = privateKey.decrypt(encrypted); // decrypts using Private Key
    return forge.util.decodeUtf8(decrypted);
}

module.exports = {encryptText, decryptText, privateKeyPem, publicKeyPem}