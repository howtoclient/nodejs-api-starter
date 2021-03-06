const
    {assignSettings, applySets} = require('./helpers'),
    APISuccess = require('./responses/APISuccess'),
    APIError = require('./responses/APIError'),
    APIValidationError = require('./responses/APIValidationError'),
    APINotFoundError = require('./responses/APINotFoundError'),
    APIAccessError = require('./responses/APIAccessError'),
    APIAuthenticationError = require('./responses/APIAuthenticationError');

class APIResponse {
    constructor(res) {
        this.res = res;
    }

    applySettings(apiResponse, status) {
        const res = this.res;
        res.status(apiResponse.response.overrideStatus || status);
        assignSettings(res, apiResponse.response.settings);
        applySets(res, apiResponse.response.sets);
        apiResponse.setStatus(res.statusCode);
        return {
            send: () => res.send(apiResponse)
        };
    }

    success(data) { //200-204
        const response = new APISuccess(data);
        this.applySettings(response, data ? 200 : 204).send();
    }

    invalid(error) { //400
        const response = new APIValidationError(error);
        this.applySettings(response, 400).send();
    }

    notFound(error) { //404
        const response = new APINotFoundError(error);
        this.applySettings(response, 404).send();
    }

    forbidden() { //403
        const response = new APIAccessError(error);
        this.applySettings(response, 403).send();
    }

    unauthorized() { //401
        const response = new APIAuthenticationError(error);
        this.applySettings(response, 401).send();
    }

    serverError(error) { //500
        const response = new APIError(error);
        this.applySettings(response, 500).send();
    }

    redirect(url, permanent) { //301-302

    }
}


module.exports = APIResponse;