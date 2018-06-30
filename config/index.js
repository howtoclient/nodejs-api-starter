module.exports = {
    allowed_domains: (process.env.ALLOWED_DOMAINS || '').split(','),
    port: process.env.PORT || 8888,
    mysql:{},
    mongo:{}
};