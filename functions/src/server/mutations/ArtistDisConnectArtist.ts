import {GraphQLID, GraphQLNonNull} from 'graphql';
import Artist from '../types/Artist'

export default {
    type: Artist,
    args: {
        artist: {
            name: 'artist',
            type: new GraphQLNonNull(GraphQLID)
        },
        member: {
            name: 'member',
            type: new GraphQLNonNull(GraphQLID)
        },
    },
    resolve (root, {artist, member}, {database}) {
        return {}
        // return database.findOne({_id: new ObjectID(member)}).then(document => {
        //     return database.update(
        //         {_id: new ObjectID(Artist)},
        //         {$pull: {__ref: {_id: new ObjectID(member), __contentType: 'MEMBER',}}}
        //     ).then(result => {
        //         if(result.result.nModified === 1) {
        //             return document;
        //         }
        //
        //         throw new Error('Artist was not connected');
        //     });
        // });
    }
};
