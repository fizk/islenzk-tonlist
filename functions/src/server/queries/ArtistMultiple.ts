import {GraphQLString, GraphQLList, GraphQLInt} from "graphql";
import Artist from '../types/Artist';
import {QueryDocumentSnapshot} from "@firebase/firestore-types";

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
            .get().then(doc => {
                return doc.docs.map((item: QueryDocumentSnapshot) => {
                    return {
                        ...item.data(),
                        _id: item.id
                    }
                })
            });
    }
};
