# Steps

1) cd into `keys/` and run `openssl rsa -pubout -in private_key.pem -out public_key.pem`
2) cd into `server/` and run `nodemon app.js`
3) cd into `client/` and run `node client.js`
