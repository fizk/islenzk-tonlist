import {GraphQLID, GraphQLNonNull} from 'graphql';
import {QueryDocumentSnapshot} from "@google-cloud/firestore";
import {transformSnapshot} from "../utils/transform";
import Artist from "../types/Artist";
import GraphQLUUID from 'graphql-tools-type-uuid';
import {DatabaseTypes as D} from "../../@types";

export default {
    type: Artist,
    args: {
        collection: {
            type: new GraphQLNonNull(GraphQLID)
        },
        reference: {
            type: new GraphQLNonNull(GraphQLUUID)
        },
    },
    resolve (root, {collection, reference}, {database}) {
        return database.doc(`/collections/${collection}`).get()
            .then((snapshot: QueryDocumentSnapshot) => {
                const refArray: D.ReferenceUnit[] = snapshot.data().__ref.filter((item: D.ReferenceUnit) =>  item.__uuid !== reference);
                return snapshot.ref.update({__ref: refArray}).then(() => snapshot.ref.get());
            })
            .then((snapshot: QueryDocumentSnapshot) => snapshot.exists ? transformSnapshot(snapshot) : null);
    }
};
