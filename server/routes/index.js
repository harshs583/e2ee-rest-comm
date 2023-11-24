const express = require('express');
const router = express.Router();
const {decryptText, publicKeyPem} = require('../utils');

router.get('/key-exchange', (req, res) => {
    return res.status(200).json({
        "publicKey": publicKeyPem
    })
})

router.post('/save-shards', (req, res) => {
    try {
        const shard1 = decryptText(req.body.shard1);
        const shard2 = decryptText(req.body.shard2);
        console.log(shard1, shard2);
        res.json({
            "message": "shard saved successfully to the db",
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            "message": "something went wrong",
        })
    }
})

module.exports = router