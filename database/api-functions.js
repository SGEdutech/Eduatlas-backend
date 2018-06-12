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
}

module.exports = databaseAPI;