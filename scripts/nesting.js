// Poorly written function
function nestingMiddleware(req, res, next) {
    const obj = req.body;

    if (obj === undefined) next();

    const keys = Object.keys(obj);
    let objectsThatThisFunctionHasCreated = [];
    keys.forEach(key => {
        if (key.startsWith('n_')) {
            const splitArr = key.split('_');

            if (splitArr.length !== 4) throw new Error('Proper naming rule not followed');

            const hostKey = splitArr[1];
            const keyToBeInserted = splitArr[2];
            const valueToBeInserted = obj[key];
            const identifierValue = splitArr[3];
            let isWorkDone = false;

            if (obj[hostKey] === undefined) obj[hostKey] = [];
            obj[hostKey].forEach(nestedObject => {
                if (nestedObject.identifierKey === identifierValue) {
                    nestedObject[keyToBeInserted] = valueToBeInserted;
                    isWorkDone = true;
                }
            });
            if (isWorkDone === false) {
                const objToBeInserted = {};
                objectsThatThisFunctionHasCreated.push(objToBeInserted);
                objToBeInserted.identifierKey = identifierValue;
                objToBeInserted[keyToBeInserted] = valueToBeInserted;
                obj[hostKey].push(objToBeInserted);
            }
            delete obj[key];
        }
    });
    objectsThatThisFunctionHasCreated.forEach(object => delete object.identifierKey);
    next();
}

exports.nestingMiddleware = nestingMiddleware;