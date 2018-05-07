import {GraphQLID} from 'graphql';
import Collection from '../types/Collection'

export default {
    type: Collection,
    args: {
        collection: {
            name: 'collection',
            type: GraphQLID
        },
        item: {
            name: 'item',
            type: GraphQLID
        },
    },
    resolve (root, {collection, item}, {database}) {
        return {}
        // return database.findOneAndUpdate(
        //     {_id: new ObjectID(collection)},
        //     {$pull: {__ref: {_id: new ObjectID(Item)}}},
        //     {returnOriginal: false}
        // ).then(result => {
        //     if(result.ok) { //@todo add search index modification
        //         return result.value;
        //     }
        // });
    }
};
