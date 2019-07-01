const expressJwt = require('express-jwt');

module.exports = jwt;

const json = {
    "secret": "JWT"
}

function jwt() {
    const { secret } = json;
    return expressJwt({ secret }).unless({
        path: [
            '/login/users',
            '/login/register',
            '/contact/users',
            '/contact/update',
            '/chart/users',
            '/upload/image',
            '/upload/addimg'
        ]
    });
}