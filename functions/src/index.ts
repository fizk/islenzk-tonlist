import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import graphQLServer from './server';
import * as elasticsearch from 'elasticsearch';
import {Firestore} from '@google-cloud/firestore';
import {
    createReferenceRecord,
    createSearchRecord,
    deleteSearchRecord,
    updateReferenceRecord,
    updateSearchRecord,
    deleteReferenceRecord
} from "./utils";

const serviceAccount = require('/Users/einar.adalsteinsson/.gcloud/islensk-tonlist.json');

admin.initializeApp
(
    {
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://islenzktonlist.firebaseio.com'
    }
);

const firestore = new Firestore({
    projectId: 'islenzktonlist',
    keyFilename: '/Users/einar.adalsteinsson/.gcloud/islensk-tonlist.json',
});

const elasticSearchClient = new elasticsearch.Client({
    host: '107.170.87.126:9200',
    log: 'trace'
});


//GRAPH-QL
export const api = functions.https.onRequest(graphQLServer(firestore, elasticSearchClient));

//ARTIST
export const artistDocumentCreateSearchRecord = functions.firestore.document('artists/{id}').onCreate(createSearchRecord('it_artists', 'artist', elasticSearchClient));
export const artistDocumentUpdateSearchRecord = functions.firestore.document('artists/{id}').onUpdate(updateSearchRecord('it_artists', 'artist', elasticSearchClient));
export const artistDocumentDeleteSearchRecord = functions.firestore.document('artists/{id}').onDelete(deleteSearchRecord('it_artists', 'artist', elasticSearchClient));

export const artistDocumentCreateReferenceRecord = functions.firestore.document('artists/{id}').onCreate(createReferenceRecord(admin.firestore().collection('reference')));
export const artistDocumentUpdateReferenceRecord = functions.firestore.document('artists/{id}').onUpdate(updateReferenceRecord(admin.firestore().collection('reference')));
export const artistDocumentDeleteReferenceRecord = functions.firestore.document('artists/{id}').onDelete(deleteReferenceRecord(admin.firestore().collection('reference')));

//COLLECTION
export const collectionDocumentCreateSearchRecord = functions.firestore.document('collections/{id}').onCreate(createSearchRecord('it_collections', 'collection', elasticSearchClient));
export const collectionDocumentUpdateSearchRecord = functions.firestore.document('collections/{id}').onUpdate(updateSearchRecord('it_collections', 'collection', elasticSearchClient));
export const collectionDocumentDeleteSearchRecord = functions.firestore.document('collections/{id}').onDelete(deleteSearchRecord('it_collections', 'collection', elasticSearchClient));

export const collectionDocumentCreateReferenceRecord = functions.firestore.document('collections/{id}').onCreate(createReferenceRecord(admin.firestore().collection('reference')));
export const collectionDocumentUpdateReferenceRecord = functions.firestore.document('collections/{id}').onUpdate(updateReferenceRecord(admin.firestore().collection('reference')));
export const collectionDocumentDeleteReferenceRecord = functions.firestore.document('collections/{id}').onDelete(deleteReferenceRecord(admin.firestore().collection('reference')));

//ITEM
export const itemDocumentCreateSearchRecord = functions.firestore.document('items/{id}').onCreate(createSearchRecord('it_items', 'item', elasticSearchClient));
export const itemDocumentUpdateSearchRecord = functions.firestore.document('items/{id}').onUpdate(updateSearchRecord('it_items', 'item', elasticSearchClient));
export const itemDocumentDeleteSearchRecord = functions.firestore.document('items/{id}').onDelete(deleteSearchRecord('it_items', 'item', elasticSearchClient));

export const itemDocumentCreateReferenceRecord = functions.firestore.document('items/{id}').onCreate(createReferenceRecord(admin.firestore().collection('reference')));
export const itemDocumentUpdateReferenceRecord = functions.firestore.document('items/{id}').onUpdate(updateReferenceRecord(admin.firestore().collection('reference')));
export const itemDocumentDeleteReferenceRecord = functions.firestore.document('items/{id}').onDelete(deleteReferenceRecord(admin.firestore().collection('reference')));
