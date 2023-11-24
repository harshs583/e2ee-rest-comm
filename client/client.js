const axios = require('axios');
const {decryptText} = require("../server/utils");
const encryptText = require('../server/utils').encryptText;

console.log("#### User shards ####");
const shard1 = "dummyshard1";
const shard2 = "dummyshard2";
let serverPublicKey = "";
console.log(shard1);
console.log("####");

console.log("#### getting pub key ####");
axios.get('http://localhost:3000/key-exchange')
    .then(response => {
        // console.log(response.data.publicKey);
        // serverPublicKey = response.data.publicKey;
        // Encrypt text using the server's public key
        const encryptedShard1 = encryptText(shard1);
        const encryptedShard2 = encryptText(shard2);
        console.log("#### encrypted shards ####");
        console.log(encryptedShard1);
        console.log("####");
        console.log(decryptText(encryptedShard1).toString())
        // Send encrypted shards to the server
        console.log("#### sending shards ####");
        return axios.post('http://localhost:3000/save-shards', {
            "shard1": encryptedShard1,
            "shard2": encryptedShard2,
        });
    })
    .then(response => {
        // console.log(response.data.message);
        console.log("#### done ####");
    })
    .catch(error => {
        console.error("error");
    });
