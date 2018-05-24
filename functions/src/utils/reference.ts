import assert from 'assert';
import {DatabaseTypes} from "../@types";

/**
 * Compare two ReferenceUnit items.
 *
 * @param {DatabaseTypes.ReferenceUnit} one
 * @param {DatabaseTypes.ReferenceUnit} two
 * @return {boolean}
 */
const equal = (
    one: {_id: {isEqual: (any) => boolean}},
    two: {_id: {isEqual: (any) => boolean}}
) => {
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

/**
 * Create a `diff` object out of two arrays of ReferenceUnits.
 *
 * @param one
 * @param two
 * @return {added: ReferenceUnits[]; updated: ReferenceUnits[]; deleted: ReferenceUnits[]}
 */
export const refDifference = (one, two): {added: any[], updated: any[], deleted: any[]} => {
    const beforeObject = one.reduce((collection, item: DatabaseTypes.ReferenceUnit) => {
        collection[item.__uuid] = {before: item, after: null};
        return collection;
    }, {});

    const allObject = two.reduce((collection, item: DatabaseTypes.ReferenceUnit) => {
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
