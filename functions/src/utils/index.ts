import * as admin from "firebase-admin";
import DocumentSnapshot = admin.firestore.DocumentSnapshot;
import DocumentReference = admin.firestore.DocumentReference;
import {Change, EventContext} from "firebase-functions/lib/cloud-functions";
import {CollectionReference} from "@google-cloud/firestore";

/**
 * Takes a DocumentSnapshot. It will then, for each item in the __ref array, substitutes the _id value with a reference to this snapshot.
 * It will then for the _id values that were replaced, create a record in the `reference` collection where the key will be the ID
 * of the reference that was replaced and and the new _id will be pointing to this DocumentSnapshot.
 *
 * Complicated? Think of it this way: Makes a copy of each item in the __ref array under the `reference` collection where the _id values are reversed.
 *
 * @param {DocumentSnapshot} snapshot
 * @param {FirebaseFirestore.CollectionReference} collection
 * @return {(itemInReferenceArray) => PromiseLike<DocumentSnapshot>}
 */
export const copyReferences = (snapshot: DocumentSnapshot, collection: CollectionReference) => itemInReferenceArray => {
    const collectionDocument: DocumentReference = collection.doc(itemInReferenceArray._id.id);

    return collectionDocument.get().then((doc: DocumentSnapshot) => {
        return doc.exists
            ? doc
            : collectionDocument.create({__ref: []}).then(() => collectionDocument.get())
    }).then((doc: DocumentSnapshot) => {
        const refRecord = {...itemInReferenceArray, _id: snapshot.ref};
        return doc.ref.update({
            __ref: [...doc.data().__ref, refRecord]
        })
    })
};

/**
 * Takes a DocumentSnapshot, converts DocumentReference object (in the __ref array) into string values and then
 * calls an external ElasticSearch service and asks it to store this Snapshot.
 *
 * @param {string} index
 * @param {string} type
 * @param elasticSearchClient
 * @return {(snapshot: DocumentSnapshot, context: EventContext) => any}
 */
export const createSearchRecord = (index: string, type: string, elasticSearchClient) => (snapshot: DocumentSnapshot , context: EventContext) => {
    const data = snapshot.data();

    const flattenRef = data.__ref.map(ref => ({
        ...ref,
        _id: ref._id.path
    }));

    const filteredData = {
        ...data,
        __ref: flattenRef
    };

    return elasticSearchClient.create({
        index: index,
        type: type,
        id: snapshot.id,
        body: filteredData
    });
};

/**
 * Takes a DocumentSnapshot, converts DocumentReference object (in the __ref array) into string values and then
 * calls an external ElasticSearch service and asks it to update its record.
 *
 * @param {string} index
 * @param {string} type
 * @param elasticSearchClient
 * @return {(change: Change<DocumentSnapshot>, context: EventContext) => any}
 */
export const updateSearchRecord = (index: string, type: string, elasticSearchClient) => (change: Change<DocumentSnapshot>, context: EventContext) => {
    const data = change.after.data();

    const flattenRef = data.__ref.map(ref => ({
        ...ref,
        _id: ref._id.path
    }));

    const filteredData = {
        ...data,
        __ref: flattenRef
    };

    return elasticSearchClient.create({
        index: index,
        type: type,
        id: change.after.id,
        body: filteredData
    });
};

/**
 * Takes a DocumentSnapshot, then calls an external ElasticSearch service and asks it to delete
 * a record with the same ID.
 *
 * @param {string} index
 * @param {string} type
 * @param elasticSearchClient
 * @return {(snapshot: DocumentSnapshot, context: EventContext) => any}
 */
export const deleteSearchRecord = (index: string, type: string, elasticSearchClient) => (snapshot: DocumentSnapshot, context: EventContext) => {
    return elasticSearchClient.delete({
        index: index,
        type: type,
        id: snapshot.id,
    });
};

/**
 * Runs the `copyReferences` function on each item in the `__ref` array in a sequence (event though `copyReferences` returns a Promise<DocumentSnapshot>).
 *
 * The reason for this is that if two items in the __ref array point to the same resource and that `reference` does not exist, if run in parallel,
 * both promises will go down the road of creating that reference, one will finish before the other and the slower process will complain that the
 * resource already exists (which it didn't when it started off).
 *
 * @param {DocumentSnapshot} snapshot
 * @param {EventContext} context
 */
export const createReferenceRecord = (snapshot: DocumentSnapshot, context: EventContext) => {
    const data = snapshot.data();
    const copyFunction = copyReferences(snapshot, admin.firestore().collection('reference'));

    data.__ref.reduce((promise, item) => {
        return promise.then(() => copyFunction(item)).catch(console.error)
    }, Promise.resolve());
};
