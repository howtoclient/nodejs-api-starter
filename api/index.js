const
    bodyParser = require('body-parser'),
    helmet = require('helmet'),
    morgan = require('morgan'),
    cors = require('./system/cors'),
    errors = require('./system/errors'),
    login = require('./system/login'),
    authentication = require('./system/authentication'),
    routes = require('./routes'),
    api = require('express')();


api.set('json replacer', (key, value) => /^_/.test(key) ? undefined : value);
api.use(morgan('tiny', {skip: (req, res) => req.method === "OPTIONS"}));
api.use(cors);
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({extended: true}));
api.use(helmet());
api.use(login);
api.use(authentication);
api.use('/', routes);
api.use('/', errors);

module.exports = api;