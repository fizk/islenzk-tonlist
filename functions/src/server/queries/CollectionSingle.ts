import {GraphQLNonNull, GraphQLID} from "graphql";
import Collection from '../types/Collection';

export default {
    type: Collection,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve (root, {id}, {database}) {
        return database.doc(`/collections/${id}`).get().then(doc => ({
                ...doc.data(),
                _id: doc.id
            }
        ));
    }
};

