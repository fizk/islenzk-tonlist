import {GraphQLID, GraphQLNonNull} from 'graphql';
import Image from '../types/Image'

export default {
    type: Image,
    args: {
        unit: {
            name: 'Unit',
            type: new GraphQLNonNull(GraphQLID)
        },
        hero: {
            name: 'hero',
            type: new GraphQLNonNull(GraphQLID)
        },
    },
    resolve (root, {unit, hero}, {database, search, }) {
        return {}
        // return database.findOneAndUpdate(
        //     {_id: new ObjectID(Unit)},
        //     {$addToSet: {'__ref': {_id: new ObjectID(hero), __contentType: 'image/hero'}}},
        //     {returnOriginal: false}
        // ).then(document => {
        //     return database.findOne({_id: new ObjectID(hero)}).then(image => ({image, document}));
        // }).then(result => {
        //     const {image, document} = result;
        //     //@todo update search index
        //     return image;
        // });
        // //@todo remove the old hero first
    }
};
