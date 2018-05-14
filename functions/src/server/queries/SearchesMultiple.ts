import {GraphQLString, GraphQLList} from "graphql";
import SearchResult from "../types/SearchResult";

export default {
    type: new GraphQLList(SearchResult),
    args: {
        term: {
            name: 'term',
            type: GraphQLString
        }
    },
    resolve (root, {term, limit = 10}, {database, search}) {
        return search.search({
            index: 'it_items, it_collections, it_artists',
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
                                    "aka.raw": {value: term}
                                }
                            }, {
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
