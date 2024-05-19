const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const client = jwksClient({
    jwksUri: 'https://login.microsoftonline.com/common/discovery/keys'
});

function getKey(header, callback) {
    console.log(header);
    client.getSigningKey(header.kid, function (err, key) {
        const signingKey = key.getPublicKey();
        console.log(err, key, key.alg, "Signed: " + signingKey);
        callback(null, signingKey);
    });
}

const verifySession = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    console.log("Token",token);
    jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {


        console.log(err, decoded);
        if (err) {
            res.status(401).send('Token inválido');
        } else {
            req.decoded = decoded;
            next();
        }
    });
}

module.exports = verifySession;