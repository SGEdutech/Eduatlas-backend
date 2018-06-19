function nesting(obj) {
    let keys = Object.keys(obj);
    keys.forEach(data => {
        if (data.startsWith('day_')) {
            let someVariable = data.split('_');
            let day = someVariable[1];
            let type = someVariable[2];
            let value = obj[data];
            if (obj.dayAndTimeOfOperation) {
                let done = false;
                obj.dayAndTimeOfOperation.forEach(item => {
                    if (item.day === day) {
                        item[type] = value;
                        done = true;
                    }
                });
                if (!done) {
                    let objectToBePushed = {};
                    objectToBePushed.day = day;
                    objectToBePushed[type] = value;
                    obj.dayAndTimeOfOperation.push(objectToBePushed);
                }
            } else {
                obj.dayAndTimeOfOperation = [];
                let objectToBePushed = {};
                objectToBePushed.day = day;
                objectToBePushed[type] = value;
                obj.dayAndTimeOfOperation.push(objectToBePushed);
            }
            delete obj[data];
        }
    })
}

exports.nestDay = nesting;