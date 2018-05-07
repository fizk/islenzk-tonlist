import {GraphQLEnumType} from "graphql";

export default new GraphQLEnumType({
    name: 'CollectionType',
    values: {
        album: {value: 'album'},
        ep: {value: 'album+ep'},
        single: {value: 'album+single'},
        compilation: {value: 'album+compilation'},
    }
})
