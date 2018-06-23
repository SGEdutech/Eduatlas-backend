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
    objectsThatThisFunctionHasCreated.forEach(object => delete object.identifierKey);
    next();
}

let req = {};

req.body = {
    name: 'Obama',
    n_impDates_addmissionStartDate_1: '22',
    n_impDates_addmissionEndDate_1: '23',
};

nestingMiddleware(req, '', () => {})

console.log(req.body);


exports.nestingMiddleware = nestingMiddleware;