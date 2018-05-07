import {GraphQLID, GraphQLNonNull} from 'graphql';
import Collection from '../types/Collection'

export default {
    type: Collection,
    args: {
        item: {
            name: 'artist',
            type: new GraphQLNonNull(GraphQLID),
        },
        collection: {
            name: 'member',
            type: new GraphQLNonNull(GraphQLID),
        },
    },
    resolve (root, {item, collection}, {database}) {
        return {}
        // return database.findOneAndUpdate(
        //     {_id: new ObjectID(collection)},
        //     {'$push': {__ref: {_id: new ObjectID(Item), __contentType: 'Item/song',}}},
        //     {returnOriginal: false}
        // ).then(result => {
        //     if(result.ok) {
        //         return result.value
        //     }
        // });
    }
};
