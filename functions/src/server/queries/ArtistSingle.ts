import {GraphQLNonNull, GraphQLString} from "graphql";
import Artist from '../types/Artist';

export default {
    type: Artist,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve (root, {id}, {database}) {
        return database.doc(`/artists/${id}`).get().then(doc => ({
                ...doc.data(),
                _id: doc.id
            }
        ));
    }
};

