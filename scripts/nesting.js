function nestingMiddleware(req, res, next) {
    const obj = req.body;

    if (obj === undefined) next();

    let keys = Object.keys(obj);

    keys.forEach(key => {
        if (obj[key] === '') delete obj[key]
    });

    keys = Object.keys(obj);

    let objectsThatThisFunctionHasCreated = [];
    keys.forEach(key => {
        if (key.startsWith('n_')) {
            const splitArr = key.split('_');

            if (splitArr.length !== 4) throw new Error(`Proper naming rule not followed on ${key}`);

            const hostKey = splitArr[1];
            const keyToBeInserted = splitArr[2];
            const valueToBeInserted = obj[key];
            const identifier = splitArr[3];
            let isWorkDone = false;

            if (obj[hostKey] === undefined) obj[hostKey] = [];
            obj[hostKey].forEach(nestedObject => {
                if (nestedObject.identifierKey === identifier) {
                    nestedObject[keyToBeInserted] = valueToBeInserted;
                    isWorkDone = true;
                }
            });
            if (isWorkDone === false) {
                const objToBeInserted = {};
                objectsThatThisFunctionHasCreated.push(objToBeInserted);
                objToBeInserted.identifierKey = identifier;
                objToBeInserted[keyToBeInserted] = valueToBeInserted;
                obj[hostKey].push(objToBeInserted);
            }
            delete obj[key];
        }
    });
    if (req.files) {
        req.files.forEach(file => {
            const infoArr = file.fieldname.split('_');
            const hostKeyName = infoArr[1];
            const directoryName = infoArr[2];
            const identifierKey = infoArr[3];
            const arrayToBeInserted = obj[hostKeyName];
            if (arrayToBeInserted) {
                if (Array.isArray(arrayToBeInserted) === false) throw new Error('Image: Key to be inserted is not an array');
                arrayToBeInserted.forEach(nestedObj => {
                    if (nestedObj.identifierKey === identifierKey) {
                        nestedObj[`img_${directoryName}_path`] = file.filename
                    }
                })
            } else {
                obj[identifierKey] = [{
                    [`img_${directoryName}_path`]: file.filename
                }]
            }
        })
    }
    objectsThatThisFunctionHasCreated.forEach(object => delete object.identifierKey);
    console.log(obj);
    next();
}

exports.nestingMiddleware = nestingMiddleware;