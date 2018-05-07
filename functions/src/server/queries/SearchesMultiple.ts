import {GraphQLString, GraphQLList} from "graphql";
import Artist from '../types/Artist';

export default {
    type: new GraphQLList(Artist),
    args: {
        term: {
            name: 'term',
            type: GraphQLString
        }
    },
    resolve (root, params, {search}) {
        return {}
        // return search.search({
        //     index: 'application',
        //     body: {
        //         query : {
        //             bool: {
        //                 must: [
        //                     {fuzzy:  {name: {value: params.term, fuzziness: "AUTO"}}}
        //                 ]
        //             }
        //         },
        //     }
        // }).then(result => {
        //     return result.hits.hits.map(hit => {
        //         return {
        //             _id: hit._id,
        //             ...hit._source
        //         };
        //     });
        // }).catch(console.error);
    }
};
