import {GraphQLNonNull, GraphQLID} from "graphql";
import Collection from '../types/Collection';
import {transformSnapshot} from "../utils/transform";

export default {
    type: Collection,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve (root, {id}, {database}) {
        return database.doc(`/collections/${id}`).get().then(transformSnapshot);
    }
};

