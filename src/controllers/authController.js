require('dotenv').config();
const qs = require('querystring');
const AllowedUser = require('../models/AllowedUser');
const jwt = require('jsonwebtoken');

const getToken = async (req, res) => {
    const { code, redirectUri } = req.query;

    const tokenEndpoint = 'https://login.microsoftonline.com/4bc0e4bd-b054-4eb1-a4d3-ef13dc805095/oauth2/v2.0/token';
    const clientId = process.env.MS_CLIENT_ID;
    const clientSecret = process.env.MS_CLIENT_SECRET;

    const params = {
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
    };

    const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: qs.stringify(params)
    });

    const data = await response.json();
    console.log(data);

    const { access_token, refresh_token } = data;

    const decodedToken = jwt.decode(access_token);
    const allowedUser = await AllowedUser.findOne({ email: decodedToken.upn.toLowerCase() });
    console.log(decodedToken, allowedUser);

    if (!allowedUser) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    res.json(data);
};

const refresh = async (req, res) => {
    console.log(req.headers);
    const refreshToken = req.headers.authorization.split(' ')[1];

    const tokenEndpoint = 'https://login.microsoftonline.com/4bc0e4bd-b054-4eb1-a4d3-ef13dc805095/oauth2/v2.0/token';
    const clientId = process.env.MS_CLIENT_ID;
    const clientSecret = process.env.MS_CLIENT_SECRET;

    const params = {
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
        scope: 'a3a4079a-bf27-42d2-99c0-7a30e2739694/.default'
    };

    const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: qs.stringify(params)
    });

    const data = await response.json();

    const { access_token, refresh_token } = data;
    const decodedToken = jwt.decode(access_token);

    console.log("Refresh", data);
    const allowedUser = await AllowedUser.findOne({ email: decodedToken.upn.toLowerCase() });

    if (!allowedUser) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    res.json(data);
}

const verify = (req, res) => {
    res.json({ message: 'Token is valid' });
}

const addAllowedUser = async (req, res) => {
    const { email } = req.body;

    try {
        const existingUser = await AllowedUser.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const allowedUser = new AllowedUser({ email });
        await allowedUser.save();
        res.status(201).json({ message: 'User added' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getToken,
    refresh,
    verify,
    addAllowedUser,
};