import {GraphQLString, GraphQLNonNull} from 'graphql';
import Unit from '../types/Unit'
import {ContentTypeInput} from '../types/Content'

export default {
    type: Unit,
    args: {
        name: {
            name: 'name',
            type: new GraphQLNonNull(GraphQLString),
        },
        contentType: {
            name: 'contentType',
            type: new GraphQLNonNull(ContentTypeInput),
        },
    },
    resolve (root, {name, contentType, }, {database, search, }) {
        return {}
        // return database.insert({
        //     name: name,
        //     __contentType: (contentType.attribute)
        //         ? `${contentType.type}/${contentType.subtype}+${contentType.attribute}`
        //         : `${contentType.type}/${contentType.subtype}`,
        //     __ref: [],
        //     __created: new Date(),
        // }).then(result => {
        //     if (!result.result.ok) throw new Error(result.result);
        //
        //     const {_id, ...rest, } = result.ops[0];
        //
        //     search.index({
        //         index: 'application',
        //         type: contentType.type,
        //         id: _id.toString(),
        //         body: rest,
        //     });
        //
        //     return result.ops[0];
        //
        // });
    }
};
