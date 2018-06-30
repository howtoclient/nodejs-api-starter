const
    APIResponse = require('./APIResponse'),
    AuthenticationError = require('./APIResponse/errors/AuthenticationError'),
    ValidationError = require('./APIResponse/errors/ValidationError'),
    NotFoundError = require('./APIResponse/errors/NotFoundError'),
    AccessError = require('./APIResponse/errors/AccessError');

process.on('unhandledRejection', error => console.error("unhandledRejection", error));
/*
  The correct use of 'uncaughtException' is to perform synchronous cleanup of allocated resources (e.g. file descriptors, handles, etc)
  before shutting down the process. It is not safe to resume normal operation after 'uncaughtException'.
  */
process.on('uncaughtException', error => {
    console.error("uncaughtException");
    console.error(error);
    console.log(error.stack);
});

module.exports = (err, req, res, next) => {

    if (err instanceof AccessError) {
        return new APIResponse(res).forbidden(err);
    }

    if (err instanceof AuthenticationError) {
        return new APIResponse(res).unauthorized(err);
    }

    if (err instanceof SyntaxError) {
        return new APIResponse(res).invalid(err);
    }

    if (err instanceof ValidationError) {
        return new APIResponse(res).invalid(err);
    }

    if (err instanceof NotFoundError) {
        return new APIResponse(res).notFound(err);
    }

    new APIResponse(res).serverError(err);
};