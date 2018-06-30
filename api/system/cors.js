const config = require('../../config');
module.exports = require('cors')({
    methods: ['OPTIONS', 'GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
    origin: config.allowed_domains,
    credentials: true,
    allowHeaders: ['Authorization', 'Content-type']
});