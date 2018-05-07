import {
    GraphQLID,
    GraphQLNonNull,
    GraphQLString,
    GraphQLObjectType,
    GraphQLInputObjectType
} from "graphql";
import Content, {ContentTypeInput} from './Content';

const Unit = new GraphQLObjectType({
    name: 'Unit',
    description: 'A single Unit',
    fields: () => ({
        _id: {
            name: '_id',
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            name: 'name',
            type: new GraphQLNonNull(GraphQLString)
        },
        contentType: {
            name: 'contentType',
            type: Content,
            resolve(root) {
                // tslint:disable-next-line
                const [m0, type, subtype, m1, m2, attribute] = (root.__contentType || '').match(/([a-z]*)\/([a-z]*)?((\+)([a-z]*))?/) || [undefined, undefined, undefined, undefined, undefined, undefined];
                return {type, subtype, attribute};
            }
        },
    })
});

const UnitInput = new GraphQLInputObjectType({
    name: 'UnitInput',
    fields: {
        name: {
            name: 'name',
            type: new GraphQLNonNull(GraphQLString)
        },
        contentType: {
            name: 'contentType',
            type: new GraphQLNonNull(ContentTypeInput),
        },
    },
});

export default Unit;
export {UnitInput};
