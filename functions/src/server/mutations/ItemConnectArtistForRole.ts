import {GraphQLNonNull, GraphQLID} from 'graphql';
import Artist from '../types/Artist';

export default {
    type: Artist,
    args: {
        artist: {
            name: 'artist',
            type: new GraphQLNonNull(GraphQLID),
        },
        item: {
            name: 'item',
            type: new GraphQLNonNull(GraphQLID),
        },
    },
    resolve (root, {artist, item}, {database, search, }) {
        return {}
        // return database.findOneAndUpdate(
        //     {_id: new ObjectID(Item)},
        //     {$push : {__ref: {
        //         _id: new ObjectID(Artist),
        //         roles: []
        //     }}},
        //     {returnOriginal: false}
        // ).then(document => {
        //     console.log(document);
        // });

    }
};
