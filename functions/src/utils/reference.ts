import assert from 'assert';
import {ReferenceUnit} from "../@types";

const equal = (one, two) => {
    try {
        const restOne = {
            ...one,
            _id: undefined
        };
        const restTwo = {
            ...two,
            _id: undefined
        };
        assert.deepEqual(restOne, restTwo);
        return one._id.isEqual(two._id)
    } catch (e) {
        return false;
    }
};


export const refDifference = (one, two): {added: any[], updated: any[], deleted: any[]} => {
    const beforeObject = one.reduce((collection, item: ReferenceUnit) => {
        collection[item.__uuid] = {before: item, after: null};
        return collection;
    }, {});

    const allObject = two.reduce((collection, item: ReferenceUnit) => {
        if (collection.hasOwnProperty(item.__uuid)) {
            collection[item.__uuid].after = item
        } else {
            collection[item.__uuid] = {before: null, after: item}
        }
        return collection
    }, beforeObject);

    return Object.keys(allObject).reduce((collection, key) => {
        if (allObject[key].after === null) {
            collection.deleted.push(allObject[key].before);
        } else if (allObject[key].before === null) {
            collection.added.push(allObject[key].after)
        } else if(equal(allObject[key].before, allObject[key].after) === false) {
            collection.updated.push(allObject[key].after)
        }

        return collection;
    }, {added: [], updated: [], deleted: []});
};
