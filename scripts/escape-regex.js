module.exports = text => {
    if (text === undefined) {
        console.info('No text provided');
        return;
    }
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};