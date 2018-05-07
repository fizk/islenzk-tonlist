import {GraphQLObjectType, GraphQLString, GraphQLList} from "graphql";
import Artist from './Artist';

export default new GraphQLObjectType({
    name: 'ArtistRole',
    fields: () => ({
        artist: {
            name: 'artist',
            type: Artist,
            resolve(root, params, {database}) {
                return {}
                // return database.findOne({_id: new ObjectID(root._id)}).then(document => document);
            }
        },
        roles: {
            name: 'roles',
            type: new GraphQLList(GraphQLString),
            resolve(root, params, {database}) {
                return {}
                // return root.role;
            }
        },
    }),
});
