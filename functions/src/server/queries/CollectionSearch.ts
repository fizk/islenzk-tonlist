import {GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull} from "graphql";
import Collection, {CollectionType} from '../types/Collection';

export default {
    type: new GraphQLList(Collection),
    args: {
        term: {
            name: 'term',
            type: new GraphQLNonNull(GraphQLString),
        },
        limit: {
            name: 'limit',
            type: GraphQLInt
        },
        type: {
            name: 'type',
            type: CollectionType
        }
    },
    resolve (root, {term, type, limit = 10}, {database, search}) {
        const condition = {must: []};

        condition.must.push({
            fuzzy: {'name.raw': {value: term}}
        });

        if (type) {
            condition.must.push({
                match: {'__contentType': `collection/${type}`}
            });
        }

        return search.search({
            index: 'it_collections',
            body: {
                query: {
                    bool: condition
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

