import {GraphQLString, GraphQLNonNull, GraphQLInputObjectType, GraphQLInt, GraphQLID} from 'graphql';
import Item from '../types/Item';

export default {
    type: Item,
    args: {
        collection: {
            name: 'collection',
            type: GraphQLID,
        },
        item: {
            name: 'item',
            type: new GraphQLInputObjectType({
                name: 'ItemInput',
                fields: {
                    name: {
                        name: 'name',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    description: {
                        name: 'description',
                        type: GraphQLString,
                    },
                    type: {
                        name: 'type',
                        type: new GraphQLNonNull(GraphQLString),
                    },
                    duration: {
                        name: 'duration',
                        type: GraphQLInt
                    }
                }
            })
        },
    },
    resolve (root, {item, collection}, {database, search, }) {
        return {}
        // return database.insert({
        //     name: Item.name,
        //     description: Item.description,
        //     duration: Item.duration || 0,
        //     __contentType: `Item/${Item.type}`,
        //     __ref: [],
        //     __created: new Date(),
        // }).then(result => {
        //     if (!result.result.ok) throw new Error(result.result);
        //
        //     const {_id, ...rest, } = result.ops[0];
        //
        //     if (collection) {
        //         database.update({_id: new ObjectID(collection)}, {
        //             $push: {
        //                 __ref: {
        //                     _id: result.ops[0]._id,
        //                     __contentType: `Item/${Item.type}`
        //                 }
        //             }
        //         })
        //     }
        //
        //     search.index({
        //         index: 'application',
        //         type: 'Item',
        //         id: _id.toString(),
        //         body: rest,
        //     }).then(console.log)
        //         .catch(console.error);
        //
        //     return result.ops[0];
        //
        // });
    }
};
