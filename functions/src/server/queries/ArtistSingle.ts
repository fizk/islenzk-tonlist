import {GraphQLNonNull, GraphQLString} from "graphql";
import Artist from '../types/Artist';
import {transformSnapshot} from "../utils/transform";
import {QueryDocumentSnapshot} from "@google-cloud/firestore";

export default {
    type: Artist,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve (root, {id}, {database}) {
        return database.doc(`/artists/${id}`).get()
            .then((snapshot: QueryDocumentSnapshot) => snapshot.exists ? transformSnapshot(snapshot) : null);
    }
};

