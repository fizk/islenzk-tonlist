import {GraphQLObjectType, GraphQLString} from "graphql";

export default new GraphQLObjectType({
    name: 'Genre',
    fields: {
        type: {type: GraphQLString},
        style: {type: GraphQLString},
    }
})
