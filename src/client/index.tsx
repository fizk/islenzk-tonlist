import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import App from './components/App';
// import firebase from "firebase/app";
// require("firebase/storage");
// import UploadTaskSnapshot = firebase.storage.UploadTaskSnapshot;
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
const introspectionQueryResultData = {"__schema":{"types":[{"kind":"UNION","name":"Artist","possibleTypes":[{"name":"Person"},{"name":"Group"}]}]}};

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
});

const client = new ApolloClient({
    cache: new InMemoryCache({ fragmentMatcher }),
    link: new HttpLink({
        uri: 'http://localhost:5000/islenzktonlist/us-central1/api/graphql'
    })
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>,
    document.querySelector('[data-react-application]')
);
//
//
//
// firebase.initializeApp({
//     apiKey: 'AIzaSyDnRrVZy3Ll6oZW0FGnByg7S8GBgz3CfNs',
//     // authDomain: '<your-auth-domain>',
//     // databaseURL: '<your-database-url>',
//     storageBucket: 'gs://islenzktonlist.appspot.com'
// });
//
// // const storage = firebase.storage();
//
//
// const storageRef = firebase.storage().ref();
//
// // Create a reference to 'mountains.jpg'
// const mountainsRef = storageRef.child('mountains.jpg');
//
// // Create a reference to 'images/mountains.jpg'
// const mountainImagesRef = storageRef.child('images/mountains.jpg');
//
// const input = document.createElement('input');
// input.type = 'file';
// input.addEventListener('change', (event) => {
//     const file = (event.target as HTMLInputElement).files[0];
//
//
//     mountainImagesRef.put(file).then(function(snapshot: UploadTaskSnapshot) {
//         console.log('Uploaded a blob or file!', snapshot, snapshot.constructor);
//         snapshot.ref.getDownloadURL().then(console.log);
//         console.log(snapshot.ref.fullPath);
//     });
// });
//
// document.body.appendChild(input);

