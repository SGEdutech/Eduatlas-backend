module.exports = (req, res, result) => {
    const queryObject = req.query;
    if (queryObject.page && queryObject.items) {
        const page = parseInt(queryObject.page);
        const items = parseInt(queryObject.items);
        const startingItemIndex = (page - 1) * items;
        const endingItemIndex = startingItemIndex + items;
        res.send(result.slice(startingItemIndex, endingItemIndex));
        return true;
    }
    return false;
};