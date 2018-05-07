import {GraphQLID, GraphQLNonNull} from 'graphql';
import Collection, {CollectionInput} from '../types/Collection'

export default {
    type: Collection,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID),
        },
        collection: {
            name: 'collection',
            type: CollectionInput
        },
    },
    resolve (root, {collection, id}, {database, search, }) {
        return {}
        // return database.findOneAndUpdate(
        //     {_id: new ObjectID(id)},
        //     {$set: collection},
        //     {returnOriginal: false}
        // ).then(result => {
        //
        //     if (result.ok) {
        //         const {_id, ...rest, } = result.value;
        //         const searchData = {
        //             ...rest,
        //             releaseDates: rest.releaseDates ? rest.releaseDates.getTime() : null,
        //         };
        //
        //         search.index({
        //             index: 'application',
        //             type: 'collection',
        //             id: _id.toString(),
        //             body: searchData,
        //         });
        //
        //         return result.value;
        //     }
        // });
    }
};
