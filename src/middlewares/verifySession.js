const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const AllowedUser = require('../models/AllowedUser');

const client = jwksClient({
    jwksUri: 'https://login.microsoftonline.com/common/discovery/keys'
});

function getKey(header, callback) {
    client.getSigningKey(header.kid, function (err, key) {
        const signingKey = key.getPublicKey();
        callback(null, signingKey);
    });
}

const verifySession = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Token not found' });
        }
        jwt.verify(token, getKey, { algorithms: ['RS256'] }, async (err, decoded) => {
            if (err) {
                res.status(401).json({ message: 'Token inválido' });
            } else {
                if (!decoded.upn) return res.status(401).json({ message: 'Token inválido' });
                const user = await AllowedUser.findOne({ email: decoded.upn.toLowerCase() });
                if (!user) return res.status(401).json({ message: 'Usuario no autorizado' });
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