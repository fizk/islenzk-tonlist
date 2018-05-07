import {GraphQLID, GraphQLNonNull} from 'graphql';
import Collection from '../types/Collection'

export default {
    type: Collection,
    args: {
        artist: {
            name: 'artist',
            type: new GraphQLNonNull(GraphQLID),
        },
        collection: {
            name: 'collection',
            type: new GraphQLNonNull(GraphQLID),
        },
    },
    resolve (root, {artist, collection}, {database}) {
        return {}
        // return database.findOneAndUpdate(
        //     {_id: new ObjectID(Artist)},
        //     {$pull: {
        //         __ref: {
        //             _id: new ObjectID(collection),
        //             __contentType: {$regex: /collection\/.*/}
        //         }
        //     }}
        // ).then(result => {
        //     if(result.ok) {
        //         return database.findOne({_id: new ObjectID(collection)}).then(document => document);
        //     }
        //     throw new Error('Collection was not connected');
        // });
    }
};
