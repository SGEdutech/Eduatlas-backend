let deleteFile = require('../scripts/fsunlink').deleteFile;

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
                    //checking if we got any hit in database or not
                    if (collectionToBeDeleted) {
                        collectionToBeDeleted = collectionToBeDeleted.toObject();

                        //
                        //for deleting images from server file system
                        //if image path is not nested. Example- img_coverPic
                        for (const key in collectionToBeDeleted) {
                            if (collectionToBeDeleted.hasOwnProperty(key)) {
                                // console.log(key + " -> " + collectionToBeDeleted[key]);

                                if (key.startsWith('img_')) {
                                    let path = `public/images/`;
                                    if (collectionToBeDeleted[key].startsWith('event')) {
                                        path = path + 'eventCoverPics/' + collectionToBeDeleted[key];
                                        deleteFile(path)
                                            .then((data) => {
                                                console.log(data)
                                            })
                                            .catch((err) => {
                                                console.log(err)
                                            })
                                    } else if (collectionToBeDeleted[key].startsWith('school')) {
                                        path = path + 'schoolCoverPics/' + collectionToBeDeleted[key];
                                        deleteFile(path)
                                            .then((data) => {
                                                console.log(data)
                                            })
                                            .catch((err) => {
                                                console.log(err)
                                            })
                                    } else if (collectionToBeDeleted[key].startsWith('tuition')) {
                                        path = path + 'tuitionCoverPics/' + collectionToBeDeleted[key];
                                        // console.log(path);
                                        deleteFile(path)
                                            .then((data) => {
                                                console.log(data)
                                            })
                                            .catch((err) => {
                                                console.log(err)
                                            })
                                    }
                                }
                            }
                        }

                        //finding nested images. Example - gallery
                        /*collectionToBeDeleted.forEach((item) => {
                            if (typeof item === "object") {
                                Object.keys(item).forEach((nestedKey) => {
                                    if (nestedKey.startsWith('img_path')) {
                                        deleteFile(collectionToBeDeleted[item][nestedKey])
                                    }
                                })
                            }
                        });*/


                        //
                        //

                        deletedRow = collectionToBeDeleted;
                        return this.model.findOneAndRemove(searchParameter)
                    }
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

                            //
                            //for deleting image from server file system


                            Object.keys(item).forEach((nestedKey) => {
                                if (nestedKey.startsWith('img_')) {
                                    deleteFile(data[arrayName][nestedKey])
                                }
                            });


                            //
                            //

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