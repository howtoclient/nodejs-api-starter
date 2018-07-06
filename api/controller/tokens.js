const
    ValidationError = require('../system/APIResponse/errors/ValidationError'),
    jsondb = require('../../jsondb');

const getUserTokens = async (req) => {
    const {
        user
    } = req;

    return jsondb.get('tokens').find({_userId: user._id}).value() || [];
};

const setUserTokens = async (req) => {
    const {
        user,
        body: {tokenIds}
    } = req;
    if (!tokenIds || !Array.isArray(tokenIds)) {
        throw new ValidationError("No Token Ids provided");
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
    return tokens.value();
};

module.exports = {
    getUserTokens,
    setUserTokens
};

