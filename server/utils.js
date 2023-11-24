const crypto = require('crypto')
const {privateKey, publicKey} = require('./key');
const arr = []
const encryptText = (plainText) => {
    return crypto.publicEncrypt({
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_PADDING,
    }, Buffer.from(plainText)).toString('base64')
}

const decryptText = (encryptedText) => {
    return crypto.privateDecrypt({
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING,
    }, Buffer.from(encryptedText, 'base64'))
}


module.exports = {encryptText, decryptText}