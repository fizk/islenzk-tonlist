import {GraphQLString, GraphQLList, GraphQLInt} from "graphql";
import Artist from '../types/Artist';
import {transformSnapshot} from "../utils/transform";

export default {
    type: new GraphQLList(Artist),
    args: {
        type: {
            name: 'type',
            type: GraphQLString
        },
        start: {
            name: 'start',
            type: GraphQLInt
        },
        end: {
            name: 'start',
            type: GraphQLInt
        },
    },
    resolve (root, {type, start = 0, end = 10}, {database}) {
        return database.collection('artists')
            .orderBy('name')
            .startAt(start)
            .endAt(end)
            .get().then(doc => doc.docs.map(transformSnapshot));
    }
};
