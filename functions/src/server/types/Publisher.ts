import {GraphQLObjectType, GraphQLString, GraphQLID} from "graphql";
import Image from './Image';
import {ReferenceUnit} from "../../@types";

export default new GraphQLObjectType({
    name: 'Publisher',
    description: 'publisher of a collection',
    fields: {
        _id: {
            name: '_id',
            type: GraphQLID
        },
        name: {
            name: 'name',
            type: GraphQLString,
        },
        description: {
            name: 'description',
            type: GraphQLString,
        },
        avatar: {
            name: 'avatar',
            type: Image,
            resolve (root: ReferenceUnit) {
                const imagesReference: ReferenceUnit = root.__ref
                    .filter((item: ReferenceUnit) => item.__contentType === 'image/avatar')
                    .reduce((a, b) => b, undefined);

                return imagesReference
                    ? imagesReference._id.get().then(doc => ({...doc.data(), _id: doc.id}))
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
                    ? imagesReference._id.get().then(doc => ({...doc.data(), _id: doc.id}))
                    : null;
            }
        },
    }
});
