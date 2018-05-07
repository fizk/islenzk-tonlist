import {GraphQLID, GraphQLNonNull} from "graphql";
import Item from '../types/Item';

export default {
    type: Item,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve (root, {id}, {database, queue }) {
        return database.doc(`/items/${id}`).get().then(doc => ({
                ...doc.data(),
                _id: doc.id
            }
        ));
    }
};

