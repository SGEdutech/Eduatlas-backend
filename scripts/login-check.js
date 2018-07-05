function youShallNotPass(user, _id) {
    if (!user._id) {
        console.log("please login first");
        return false;
    } else {
        if (_id === user._id) {
            return true;
        } else {
            let tuitionArray = user.tuitionsOwned.split(',');
            let schoolsArray = user.schoolsOwned.split(',');
            let eventsArray = user.eventsOwned.split(',');
            let blogsArray = user.blogsOwned.split(',');
            tuitionArray.forEach(ID => {
                if (ID === _id) {
                    return true;
                }
            });
            schoolsArray.forEach(ID => {
                if (ID === _id) {
                    return true;
                }
            });
            eventsArray.forEach(ID => {
                if (ID === _id) {
                    return true;
                }
            });
            blogsArray.forEach(ID => {
                if (ID === _id) {
                    return true;
                }
            });
            return false;
        }
    }
}


module.exports = youShallNotPass;