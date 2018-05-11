import {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull} from "graphql";
import Image from './Image';
import {ReferenceUnit} from "../../@types";
import UnitInterface from "./Unit";
import Content from "./Content";
import {splitContentType} from "../utils/split";
import GraphQLDateTime from "./GraphQLDateTime";
import {transformSnapshot} from "../utils/transform";

export default new GraphQLObjectType({
    name: 'Publisher',
    description: 'publisher of a collection',
    interfaces: [UnitInterface],
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            name: 'name',
            type: GraphQLString,
        },
        description: {
            name: 'description',
            type: GraphQLString,
        },
        createTime: {
            type: GraphQLDateTime,
        },
        updateTime: {
            type: GraphQLDateTime,
        },
        contentType: {
            name: 'contentType',
            type: Content,
            resolve: (root) => splitContentType(root.__contentType)
        },
        avatar: {
            name: 'avatar',
            type: Image,
            resolve (root: ReferenceUnit) {
                const imagesReference: ReferenceUnit = root.__ref
                    .filter((item: ReferenceUnit) => item.__contentType === 'image/avatar')
                    .reduce((a, b) => b, undefined);

                return imagesReference
                    ? imagesReference._id.get().then(transformSnapshot)
                    : null;
            }
        },
        hero: {
            name: 'hero',
            type: Image,
            resolve (root: ReferenceUnit) {
                const imagesReference: ReferenceUnit = root.__ref
                    .filter((item: ReferenceUnit) => item.__contentType === 'image/hero')
                    .reduce((a, b) => b, undefined);

                return imagesReference
                    ? imagesReference._id.get().then(transformSnapshot)
                    : null;
            }
        },
    }
});
