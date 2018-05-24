import * as admin from "firebase-admin";
import DocumentSnapshot = admin.firestore.DocumentSnapshot;
import DocumentReference = admin.firestore.DocumentReference;
import {Change, EventContext} from "firebase-functions/lib/cloud-functions";
import {CollectionReference, WriteResult} from "@google-cloud/firestore";
import {refDifference} from './reference';
import {DatabaseTypes} from "../@types";

/**
 * Takes a DocumentSnapshot. It will then, for each item in the __ref array, substitutes the _id value with a reference to this snapshot.
 * It will then for the _id values that were replaced, create a record in the `reference` collection where the key will be the ID
 * of the reference that was replaced and and the new _id will be pointing to this DocumentSnapshot.
 *
 * Complicated? Think of it this way: Makes a copy of each item in the __ref array under the `reference` collection where the _id values are reversed.
 *
 * This function returns a function that closes over the collection and snapshot objects. The returning function returns a Promise.
 *
 * @param {DocumentSnapshot} snapshot
 * @param {FirebaseFirestore.CollectionReference} collection
 * @return {(referenceItem: Reference) => Promise<WriteResult>}
 */
export const copyReferences = (snapshot: DocumentSnapshot, collection: CollectionReference): (referenceItem: DatabaseTypes.ReferenceUnit) => Promise<WriteResult> => (referenceItem: DatabaseTypes.ReferenceUnit):  Promise<WriteResult> => {
    const collectionDocument: DocumentReference = collection.doc(referenceItem._id.id);

    return collectionDocument.get().then((doc: DocumentSnapshot) => {
        return doc.exists
            ? doc
            : collectionDocument.create({__ref: []}).then(() => collectionDocument.get())
    }).then((doc: DocumentSnapshot) => {
        const refRecord = {...referenceItem, _id: snapshot.ref};
        return doc.ref.update({
            __ref: [...doc.data().__ref, refRecord]
        })
    })
};

/**
 * For one object from the `_ref` array, tries to swap it out for a corresponding item in the `reference` collection.
 *
 * This function returns a function that closes over the collection objects. The returning function returns a Promise.
 *
 * @param {FirebaseFirestore.CollectionReference} collection
 * @return {(referenceItem: Reference) => Promise<WriteResult>}
 * @see copyReferences for more details
 */
export const updateReference = (collection: CollectionReference): (referenceItem: DatabaseTypes.ReferenceUnit) => Promise<WriteResult> => (referenceItem: DatabaseTypes.ReferenceUnit):  Promise<WriteResult> => {
    const collectionDocument: DocumentReference = collection.doc(referenceItem._id.id);

    return collectionDocument.get().then((doc: DocumentSnapshot) => {
        return doc.exists
            ? doc
            : collectionDocument.create({__ref: []}).then(() => collectionDocument.get());
    }).then(doc => {
        const ref = doc.data().__ref.map(refItem => {
            return refItem.__uuid === referenceItem.__uuid
                ? {...referenceItem, _id: refItem._id}
                : refItem
            }
        );
        return doc.ref.update({__ref: ref});
    });
};

/**
 * For one object from the `_ref` array, tries to remove it out for a corresponding item in the `reference` collection.
 *
 * This function returns a function that closes over the collection objects. The returning function returns a Promise.
 *
 * @param {FirebaseFirestore.CollectionReference} collection
 * @return {(referenceItem: Reference) => Promise<WriteResult>}
 * @see copyReferences for more details
 */
export const deleteReferences = (collection: CollectionReference): (referenceItem: DatabaseTypes.ReferenceUnit) => Promise<WriteResult> => (referenceItem: DatabaseTypes.ReferenceUnit):  Promise<WriteResult> => {
    const collectionDocument: DocumentReference = collection.doc(referenceItem._id.id);

    return collectionDocument.get().then(doc => {
        if (doc.exists) {
            const ref = doc.data().__ref.filter(item => item.__uuid !== referenceItem.__uuid);
            return doc.ref.update({__ref: ref});
        } else {
            return Promise.resolve({writeTime: new Date().toISOString(), isEqual: () => false});
        }
    });
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

    return elasticSearchClient.update({
        index: index,
        type: type,
        id: change.after.id,
        body: {doc: filteredData}
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
 * @param collectionReference
 * @return {(snapshot: DocumentSnapshot, context: EventContext) => void}
 */
export const createReferenceRecord = (collectionReference: CollectionReference) => (snapshot: DocumentSnapshot, context: EventContext) => {
    const data = snapshot.data();
    const copyFunction = copyReferences(snapshot, collectionReference);

    return data.__ref.reduce((promise: Promise<WriteResult>, item: DatabaseTypes.ReferenceUnit) => (
        promise.then(() => copyFunction(item))
    ), Promise.resolve({writeTime: new Date().toISOString()}));
};

/**
 * Runs the `copyReferences`, `updateReference` or `deleteReferences` function on each item in the `__ref` array in a sequence
 * (event though they return a Promise<DocumentSnapshot>), depending on what needs to be done.
 *
 * @param {FirebaseFirestore.CollectionReference} collectionReference
 * @return {(change: Change<DocumentSnapshot>, context: EventContext) => void}
 */
export const updateReferenceRecord = (collectionReference: CollectionReference) => (change: Change<DocumentSnapshot>, context: EventContext) => {
    const diffObject = refDifference(change.before.data().__ref, change.after.data().__ref);

    const copyFunction = copyReferences(change.after, collectionReference);
    const addTasks = diffObject.added.map(added => ({data: added, fn: copyFunction}));

    const updateFunction = updateReference(collectionReference);
    const updateTask = diffObject.updated.map(updated => ({data: updated, fn: updateFunction}));

    const deleteFunction = deleteReferences(collectionReference);
    const deleteTask = diffObject.deleted.map(updated => ({data: updated, fn: deleteFunction}));

    return [...addTasks, ...updateTask, ...deleteTask].reduce((promise: Promise<WriteResult>, item: {fn: (item: DatabaseTypes.ReferenceUnit) => Promise<WriteResult>, data: DatabaseTypes.ReferenceUnit}) => (
        promise.then(() => item.fn(item.data))
    ), Promise.resolve({writeTime: new Date().toISOString()}));
};

/**
 * Runs the `deleteReferences` function on each item in the `__ref` array in a sequence (event though `copyReferences` returns a Promise<DocumentSnapshot>).
 *
 * @param {FirebaseFirestore.CollectionReference} collectionReference
 * @return {(snapshot: DocumentSnapshot, context: EventContext) => void}
 */
export const deleteReferenceRecord = (collectionReference: CollectionReference) => (snapshot: DocumentSnapshot , context: EventContext) => {
    const data = snapshot.data();
    const deleteFunction = deleteReferences(collectionReference);

    return data.__ref.reduce((promise: Promise<WriteResult>, item: DatabaseTypes.ReferenceUnit) => (
        promise.then(() => deleteFunction(item))
    ), Promise.resolve({writeTime: new Date().toISOString()}));
};
