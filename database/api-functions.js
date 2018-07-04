const deleteThisShit = require('../scripts/fsunlink');
const path = require('path');

class databaseAPI {
    constructor(model) {
        this.model = model;
    }

    getAllData(demands, skip, limit) {
        return this.model.find({}, demands).skip(skip).limit(limit);
    }

    getMultipleData(searchParameters) {
        // if (typeof searchParameters != 'object') throw new Error();
        return this.model.find(searchParameters);
    }

    getSpecificData(searchParameters) {
        return this.model.findOne(searchParameters);
    }

    addCollection(newRowInformation) {
        let newInstance = new this.model(newRowInformation);
        return newInstance.save();
    }

    updateOneRow(searchParameters, newInformation) {
        return new Promise((resolve, reject) => {
            this.model.findOneAndUpdate(searchParameters, newInformation)
                .then(() => this.model.findOne(newInformation))
                .then(data => resolve(data))
                .catch(err => reject(err));
        })
    }

    static _deleteIfImage(keyName, possibleImgName) {
        if (keyName.startsWith('img_')) {
            const directoryOfImage = keyName.split('_')[1];
            deleteThisShit(path.join('.', 'public', 'images', directoryOfImage, possibleImgName));
            return true;
        }
        return false;
    }

    static _deleteIfAnyNestedObjectsHasImage(arrayOfObjects) {
        if (Array.isArray(arrayOfNestedObjects) && typeof arrayOfNestedObjects[0] === 'object') {
            arrayOfNestedObjects.forEach(nestedObject => {
                const nestedKeys = Object.keys(nestedObject);
                nestedKeys.forEach(nestedKey => {
                    this._deleteIfImage(nestedKey, nestedObject[nestedKey]);
                })
            })
        }
    }

    deleteOneRow(searchParameter) {
        return new Promise((resolve, reject) => {
            let deletedRow;
            this.model.findOne(searchParameter)
                .then(collectionToBeDeleted => {
                    if (collectionToBeDeleted === null) reject('No collection found');
                    deletedRow = collectionToBeDeleted;
                    collectionToBeDeleted = collectionToBeDeleted.toObject();
                    const keys = Object.keys(collectionToBeDeleted);
                    keys.forEach(key => {
                        if (this.constructor._deleteIfImage(key, collectionToBeDeleted[key])) return;
                        const arrayOfNestedObjects = collectionToBeDeleted[key];
                        this.constructor._deleteIfAnyNestedObjectsHasImage(arrayOfNestedObjects);
                    });
                    return this.model.findOneAndRemove(searchParameter);
                })
                .then(() => resolve(deletedRow))
                .catch(err => reject(err));
        })
    }

    addElementToArray(modelSearchParameter, arrayName, elementObject) {   //Needs optimisation
        return new Promise((resolve, reject) => {
            this.model.findOne(modelSearchParameter)
                .then(data => {
                    data[arrayName].push(elementObject);
                    return data.save();
                })
                .then(data => resolve(data))
                .catch(err => reject(err));
        })
    }

    updateElementInArray(modelSearchParameter, arrayName, nestedObjectId, updatedInformation) {
        return new Promise((resolve, reject) => {
            this.model.findOne(modelSearchParameter)
                .then(data => {
                    const nestedObject = data[arrayName].id(nestedObjectId);
                    const keys = Object.keys(updatedInformation);
                    keys.forEach(key => nestedObject[key] = updatedInformation[key]);
                    return data.save();
                }).then(data => resolve(data))
                .catch(err => reject(err));
        })
    }

    deleteElementFromArray(modelSearchParameter, arrayName, nestedObjectIdentifier) {
        return new Promise((resolve, reject) => {
            if (modelSearchParameter === 'undefined') throw new Error('Model search parameter not provided');
            if (arrayName === 'undefined') throw new Error('Array name not provided');
            if (nestedObjectIdentifier === 'undefined') throw new Error('Nested object identifier not provided');
            let nestedObjectIdentifierKey = Object.keys(nestedObjectIdentifier)[0];
            this.model.findOne(modelSearchParameter)
                .then(data => {
                    data[arrayName].forEach((item, index) => {
                        if (item[nestedObjectIdentifierKey] === nestedObjectIdentifier[nestedObjectIdentifierKey]) {
                            const nestedObjectKeys = Object.keys(item);
                            nestedObjectKeys.forEach(nestedKey => {
                               this.constructor._deleteIfImage(nestedKey, item[nestedKey]);
                            });
                            data[arrayName].splice(index, 1);
                        }
                    });
                    return data.save();
                })
                .then(data => resolve(data))
                .catch(err => reject(err));
        })
    }

}


module.exports = databaseAPI;