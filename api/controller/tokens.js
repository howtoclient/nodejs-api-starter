const
    ValidationError = require('../system/APIResponse/errors/ValidationError'),
    jsondb = require('../../jsondb');

const getUserTokens = async (req) => {
    const {
        user
    } = req;

    return jsondb.get('tokens')
        .filter({_userId: user._id})
        .value() || [];
};

const setUserTokens = async (req) => {
    const {
        user,
        body: {tokenIds}
    } = req;
    if (!tokenIds || !Array.isArray(tokenIds) || !tokenIds.every(tokenId=> isNaN(parseInt(tokenId)))) {
        throw new ValidationError("Invalid Token Ids");
    }

    const tokens = jsondb.get('tokens');
    tokens.remove({_userId: user._id}).write();
    tokenIds.forEach(
        tokenId => tokens.push({
            tokenId,
            _userId: user._id,
        }).write()
    );
    tokens.write();
    return jsondb.get('tokens')
        .filter({_userId: user._id})
        .value() || [];
};

module.exports = {
    getUserTokens,
    setUserTokens
};

