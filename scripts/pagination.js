module.exports = (req, res, result) => {
    const queryObject = req.query;
    if (queryObject.page && queryObject.items) {
        const startingItemIndex = (queryObject.page - 1) * queryObject.items;
        const endingItemIndex = startingItemIndex + queryObject.items;
        res.send(result.slice(startingItemIndex, endingItemIndex));
        return true;
    }
    return false;
};