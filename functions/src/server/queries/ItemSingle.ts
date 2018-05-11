import {GraphQLID, GraphQLNonNull} from "graphql";
import Item from '../types/Item';
import {transformSnapshot} from "../utils/transform";

export default {
    type: Item,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve (root, {id}, {database}) {
        return database.doc(`/items/${id}`).get().then(transformSnapshot);
    }
};

