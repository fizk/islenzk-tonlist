import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import graphQLServer from './server';
import * as elasticsearch from 'elasticsearch';
// import {Firestore} from '@google-cloud/firestore';
import {
    createReferenceRecord,
    createSearchRecord,
    deleteSearchRecord,
    updateReferenceRecord,
    updateSearchRecord,
    deleteReferenceRecord
} from "./utils";

// const serviceAccount = require('/Users/einar.adalsteinsson/.gcloud/islensk-tonlist.json');

admin.initializeApp
(
    // {
    //     credential: admin.credential.cert(serviceAccount),
    //     databaseURL: 'https://islenzktonlist.firebaseio.com'
    // }
);

// const firestore = new Firestore({
//     projectId: 'islenzktonlist',
//     keyFilename: '/Users/einar.adalsteinsson/.gcloud/islensk-tonlist.json',
// });

const elasticSearchClient = new elasticsearch.Client({
    host: '107.170.87.126:9200',
    log: 'trace'
});


//GRAPH-QL
export const api = functions.https.onRequest(graphQLServer(functions.firestore, elasticSearchClient));

//ARTIST
export const artistDocumentCreateSearchRecord = functions.firestore.document('artists1/{id}').onCreate(createSearchRecord('it_artists', 'artist', elasticSearchClient));
export const artistDocumentUpdateSearchRecord = functions.firestore.document('artists1/{id}').onUpdate(updateSearchRecord('it_artists', 'artist', elasticSearchClient));
export const artistDocumentDeleteSearchRecord = functions.firestore.document('artists1/{id}').onDelete(deleteSearchRecord('it_artists', 'artist', elasticSearchClient));

export const artistDocumentCreateReferenceRecord = functions.firestore.document('artists1/{id}').onCreate(createReferenceRecord(admin.firestore().collection('reference1')));
export const artistDocumentUpdateReferenceRecord = functions.firestore.document('artists1/{id}').onUpdate(updateReferenceRecord(admin.firestore().collection('reference1')));
export const artistDocumentDeleteReferenceRecord = functions.firestore.document('artists1/{id}').onDelete(deleteReferenceRecord(admin.firestore().collection('reference1')));

//COLLECTION
export const collectionDocumentCreateSearchRecord = functions.firestore.document('collections1/{id}').onCreate(createSearchRecord('it_collections', 'collection', elasticSearchClient));
export const collectionDocumentUpdateSearchRecord = functions.firestore.document('collections1/{id}').onUpdate(updateSearchRecord('it_collections', 'collection', elasticSearchClient));
export const collectionDocumentDeleteSearchRecord = functions.firestore.document('collections1/{id}').onDelete(deleteSearchRecord('it_collections', 'collection', elasticSearchClient));

export const collectionDocumentCreateReferenceRecord = functions.firestore.document('collections1/{id}').onCreate(createReferenceRecord(admin.firestore().collection('reference1')));
export const collectionDocumentUpdateReferenceRecord = functions.firestore.document('collections1/{id}').onUpdate(updateReferenceRecord(admin.firestore().collection('reference1')));
export const collectionDocumentDeleteReferenceRecord = functions.firestore.document('collections1/{id}').onDelete(deleteReferenceRecord(admin.firestore().collection('reference1')));

//ITEM
export const itemDocumentCreateSearchRecord = functions.firestore.document('items1/{id}').onCreate(createSearchRecord('it_items', 'item', elasticSearchClient));
export const itemDocumentUpdateSearchRecord = functions.firestore.document('items1/{id}').onUpdate(updateSearchRecord('it_items', 'item', elasticSearchClient));
export const itemDocumentDeleteSearchRecord = functions.firestore.document('items1/{id}').onDelete(deleteSearchRecord('it_items', 'item', elasticSearchClient));

export const itemDocumentCreateReferenceRecord = functions.firestore.document('items1/{id}').onCreate(createReferenceRecord(admin.firestore().collection('reference1')));
export const itemDocumentUpdateReferenceRecord = functions.firestore.document('items1/{id}').onUpdate(updateReferenceRecord(admin.firestore().collection('reference1')));
export const itemDocumentDeleteReferenceRecord = functions.firestore.document('items1/{id}').onDelete(deleteReferenceRecord(admin.firestore().collection('reference1')));
