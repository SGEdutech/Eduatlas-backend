class databaseAPI {
    constructor(model) {
        this.model = model;
    }

    getAllData() {
        return this.model.find();
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

    deleteOneRow(searchParameter) {
        return new Promise((resolve, reject) => {
            let deletedRow;
            this.model.findOne(searchParameter)
                .then(collectionToBeDeleted => {
                    deletedRow = collectionToBeDeleted;
                    return this.model.findOneAndRemove(searchParameter)
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

    deleteElementFromArray(modelSearchParameter, arrayName, elementIdentifier) {
        return new Promise((resolve, reject) => {
            this.model.findOne(modelSearchParameter)
                .then(data => {
                    let elementIdentifierKey = Object.keys(elementIdentifier)[0];
                    data[arrayName].forEach((item, index) => {
                        if (item[elementIdentifierKey] === elementIdentifier[elementIdentifierKey]) {
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