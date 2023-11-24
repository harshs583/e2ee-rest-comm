const express = require('express');
const router = express.Router();
const {privateKey, publicKey} = require('../server')
const decryptText = require('../utils').decryptText

router.get('/key-exchange', (req, res) => {
    return res.status(200).json({
        "publicKey": publicKey
    })
})

router.post('/save-shards', (req, res) => {
    console.log(req.body.shard1)
    try {
        const shard1 = decryptText(req.body.shard1);
        const shard2 = decryptText(req.body.shard2);
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