import {GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull} from "graphql";
import Artist from '../types/Artist';

export default {
    type: new GraphQLList(Artist),
    args: {
        term: {
            name: 'term',
            type: new GraphQLNonNull(GraphQLString),
        },
        limit: {
            name: 'limit',
            type: GraphQLInt
        },
    },
    resolve (root, {term, limit = 10}, {database, search}) {
        return search.search({
            index: 'it_artists',
            body: {
                query: {
                    bool: {
                        should: [
                            {
                                fuzzy: {
                                    "name.raw": {value: term, boost: 1}
                                }
                            },{
                                fuzzy: {
                                    "aka.raw": {value: term, boost: 1}
                                }
                            },{
                                fuzzy: {
                                    "description.raw": {value: term}
                                }
                            }
                        ]
                    }
                }
            },
        }).then(data => {
            return data.hits.hits.map(item => {
                return {
                    ...item._source,
                    _id: item._id,
                    __ref: item._source.__ref.map(reference => ({
                        ...reference,
                        _id: database.doc(reference._id)
                    }))
                }
            });
        });
    }
};
