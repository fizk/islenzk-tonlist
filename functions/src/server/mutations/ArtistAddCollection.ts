import {GraphQLID, GraphQLNonNull} from 'graphql';
import Collection from '../types/Collection'
import {QueryDocumentSnapshot} from "@google-cloud/firestore";
import {ReferenceUnit} from "../../@types";
import * as uuid from 'uuid/v4';
import {transformSnapshot} from "../utils/transform";
import {CollectionType} from "../types/Collection";

export default {
    type: Collection,
    args: {
        artist: {
            name: 'artist',
            type: new GraphQLNonNull(GraphQLID)
        },
        collection: {
            name: 'collection',
            type: new GraphQLNonNull(GraphQLID)
        },
        collectionType: {
            name: 'collectionType',
            type: new GraphQLNonNull(CollectionType)
        }
    },
    resolve (root, {artist, collection, collectionType = 'album'}, {database}) {
        return database.doc(`/artists/${artist}`).get()
            .then((snapshot: QueryDocumentSnapshot) => {
                const data = snapshot.data();
                const reference: ReferenceUnit = {
                    __contentType: `collection/${collectionType}`,
                    _id: database.doc(`collections/${collection}`),
                    __created: new Date(),
                    __uuid: uuid()
                };
                return snapshot.ref.update('__ref', [...data.__ref, reference])
            })
            .then(() => database.doc(`/collections/${collection}`).get())
            .then((snapshot: QueryDocumentSnapshot) => snapshot.exists ? transformSnapshot(snapshot) : null);
    }
};
