import {GraphQLNonNull, GraphQLID} from "graphql";
import Collection from '../types/Collection';
import {transformSnapshot} from "../utils/transform";
import {QueryDocumentSnapshot} from "@google-cloud/firestore";

export default {
    type: Collection,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve (root, {id}, {database}) {
        return database.doc(`/collections/${id}`).get()
            .then((snapshot: QueryDocumentSnapshot) => snapshot.exists ? transformSnapshot(snapshot) : null);
    }
};

