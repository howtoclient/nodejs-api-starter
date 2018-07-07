const
    ValidationError=require('../system/APIResponse/errors/ValidationError'),
    request=require('request-promise');

const API_URL="https://api.coinmarketcap.com/v2/ticker/?limit=1000";
const getTokens=async ()=>{
    const
        tokensList = JSON.parse(await request.get(API_URL)).data;

    return Object.keys(tokensList).map(
        tokenId=> {
            const {
                    name,
                    symbol,
                    rank,
                    website_slug,
                    quotes
                } = tokensList[tokenId],
                {
                    USD: {
                        price,
                        percent_change_1h,
                        percent_change_24h,
                        percent_change_7d
                    }
                }=quotes || { USD:{}};

            return {
                tokenId: +tokenId,
                name,
                symbol,
                rank,
                price,
                percentChange1h : percent_change_1h,
                percentChange24h: percent_change_24h,
                percentChange7d: percent_change_7d,
                icon: `https://resources.blox.io/icons/${website_slug}.png`
            }
        }
    );
};

const getAllTokens = async (req)=>{
    return await getTokens();
};

const getSpecificTokens = async (req)=>{
    const {
        tokenIds
    } = req.body;
    if (!tokenIds || !Array.isArray(tokenIds) || !tokenIds.every(tokenId=> !isNaN(+tokenId))) {
        throw new ValidationError("Invalid Token Ids");
    }
    const
        tokensMap=tokenIds.reduce(
            (agr,tokenId)=>{
                agr[tokenId]=true;
                return agr;
            }, {}
        );
    return (await getTokens()).filter(({tokenId})=>tokensMap[tokenId])
};

module.exports={
    getAllTokens,
    getSpecificTokens
};