const jwt = require('jsonwebtoken');
const { config } = require('./api/config/config');

const secret = config.jwtSecret;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY5MjQ1NjU3M30.eFP6dQSuz2eI1JL6dvjVkYhlP2v71MFI_BlUH7vhVUc'

function verifyToken (token, secret) {
  return jwt.verify(token, secret);
}

const verify = verifyToken(token, secret);

console.log(verify);
