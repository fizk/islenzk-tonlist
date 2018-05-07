import {GraphQLID} from 'graphql';
import Collection from '../types/Collection'

export default {
    type: Collection,
    args: {
        artist: {
            name: 'artist',
            type: GraphQLID
        },
        collection: {
            name: 'collection',
            type: GraphQLID
        },
    },
    resolve (root, params, {database}) {
        return {}
        // return database.findOne({_id: new ObjectID(params.collection)}).then(collection => {
        //     return database.update(
        //         {_id: new ObjectID(params.Artist)},
        //         {$addToSet: {__ref: {_id: new ObjectID(params.collection), __contentType: collection.__contentType,}}}
        //     ).then(result => {
        //         if(result.result.nModified === 1) {
        //             return collection;
        //         }
        //
        //         throw new Error('Collection is already connected');
        //     });
        // });
    }
};
