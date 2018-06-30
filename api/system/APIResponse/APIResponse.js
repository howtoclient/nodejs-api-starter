const
    forceArray = (mixed) => Array.isArray(mixed) ? mixed : [mixed],
    handleFunctionCall = (target, key, assignValue) => {
        if (Array.isArray(assignValue)) {
            return assignValue.forEach(
                applyValues => target[key].apply(target, forceArray(applyValues))
            );
        }
        if (typeof assignValue === "object") {
            return Object.keys(assignValue).forEach(
                valueKey =>
                    target[key].apply(target,
                        Array.isArray(assignValue[valueKey])
                            ? assignValue[valueKey]
                            : [valueKey, assignValue[valueKey]]
                    )
            );
        }
        target[key](assignValue);
    },
    assignSettings = (target, settings) => {
        if (typeof target !== 'object' || typeof settings !== 'object') {
            return
        }
        Object.keys(settings).forEach(key => {
            const
                targetValue = target[key],
                assignValue = settings[key];

            if (typeof targetValue === 'function') {
                return handleFunctionCall(target, key, assignValue);
            }

            if (Array.isArray(targetValue) && Array.isArray(assignValue)) {
                return target[key].push.apply(target[key], assignValue);
            }

            if (typeof targetValue === 'object' && typeof assignValue === 'object') {
                return assignSettings(targetValue, assignValue)
            }

            target[key] = assignValue;
        })
    },
    applySets = (res, sets) => {
        Object.keys(sets).forEach(
            key => {
                res.set(key, sets[key])
            }
        )
    };

const
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
        this.applySettings(response, 200).send();
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