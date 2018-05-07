import {GraphQLID, GraphQLNonNull} from 'graphql';
import Artist from '../types/Artist'

export default {
    type: Artist,
    args: {
        artist: {
            name: 'Artist',
            type: new GraphQLNonNull(GraphQLID)
        },
        member: {
            name: 'member',
            type: new GraphQLNonNull(GraphQLID)
        },
    },
    resolve (root, params, {database}) {
        return {}
        // return database.update(
        //     {_id: new ObjectID(params.Artist)},
        //     {$addToSet: {__ref: {_id: new ObjectID(params.member), __contentType: 'MEMBER',}}}
        // ).then(result => {
        //     if(result.result.nModified === 1) {
        //         return database.findOne({_id: new ObjectID(params.member)}).then(document => document);
        //     }
        //     throw new Error('Member is already connected');
        // });
    }
};
