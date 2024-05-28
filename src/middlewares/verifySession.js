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
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Token not found' });
        }
        jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: 'Token inválido' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    }
    catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
}

module.exports = verifySession;