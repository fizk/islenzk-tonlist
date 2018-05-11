import {GraphQLNonNull} from 'graphql';
import Collection, {CollectionInput} from '../types/Collection';
import CollectionType from "../types/CollectionType";

export default {
    type: Collection,
    args: {
        values: {
            type: new GraphQLNonNull(CollectionInput),
        },
        type: {
            name: 'type',
            type: new GraphQLNonNull(CollectionType)
        },
    },
    resolve (root, {values, type}, {database,}) {

        const data = Object.assign({
            __contentType: `collection/${type}`,
            __ref: [],
            aka: [],
            description: null,
            genres: [],
            releaseDates: null
        }, values);

        return database.collection('collections').add(data)
            .then(doc => doc.get())
            .then(snapshot => {
                return {
                    _id: snapshot.id,
                    ...snapshot.data()
                }
            });
    }
};
