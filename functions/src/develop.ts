// import * as admin from 'firebase-admin';
// import {Firestore} from '@google-cloud/firestore';
// import graphQLServer from './server';
// import * as elasticsearch from 'elasticsearch';
//
// const serviceAccount = require('/Users/einar.adalsteinsson/.gcloud/islensk-tonlist.json');
// const firestore = new Firestore({
//     projectId: 'islenzktonlist',
//     keyFilename: '/Users/einar.adalsteinsson/.gcloud/islensk-tonlist.json',
// });
// const elasticSearchClient = new elasticsearch.Client({
//     host: '107.170.87.126:9200',
//     log: 'trace'
// });
//
// admin.initializeApp(
//     {
//         credential: admin.credential.cert(serviceAccount),
//         databaseURL: 'https://islenzktonlist.firebaseio.com'
//     }
// );
//
// graphQLServer(firestore, elasticSearchClient).listen(3000, '0.0.0.0', console.log);
//
