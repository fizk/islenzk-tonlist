import {
    GraphQLID,
    GraphQLNonNull,
    GraphQLString,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLInputObjectType,
    GraphQLEnumType
} from "graphql";
import {CollectionConnection} from './Collection';
import ArtistRole from './ArtistRole';
import {DatabaseTypes as D} from "../../@types";
import Genre, {GenreInput} from "./Genre";
import {splitContentType, splitGenre} from "../utils/split";
import UnitInterface from "./Unit";
import Content from "./Content";
import GraphQLDateTime from "./GraphQLDateTime";

export default new GraphQLObjectType({
    name: 'Item',
    description: 'A part of a collection',
    interfaces: [UnitInterface],
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        createTime: {
            type: GraphQLDateTime,
        },
        updateTime: {
            type: GraphQLDateTime,
        },
        description: {
            type: GraphQLString
        },
        duration: {
            type: GraphQLInt
        },
        contentType: {
            name: 'contentType',
            type: Content,
            resolve: (root) => splitContentType(root.__contentType)
        },
        genres: {
            name: 'genres',
            type: new GraphQLList(Genre),
            resolve: (root) => root.genres.map(splitGenre)
        },
        instruments: {
            type: new GraphQLList(ArtistRole),
            resolve(root) {
                return {}
                // return root.__ref.filter(Item => Item.__contentType == 'participant/instrument');
            }
        },
        authors: {
            type: new GraphQLList(ArtistRole),
            resolve(root) {
                return {}
                // return root.__ref.filter(Item => Item.__contentType == 'participant/author');
            }
        },
        engineers: {
            type: new GraphQLList(ArtistRole),
            resolve(root) {
                return {}
                // return root.__ref.filter(Item => Item.__contentType == 'participant/recording');
            }
        },
        appearsOn: {
            type: new GraphQLList(CollectionConnection),
            resolve(root, params, {database}) {
                return database.doc(`/reference/${root._id}`).get()
                    .then(doc => doc.data())
                    .then((data: D.Unit) => data.__ref.filter(item => item.__contentType === 'item/song'))
            }
        }
    })
});

export const ItemInput = new GraphQLInputObjectType({
    name: 'ItemInput',
    fields: {
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        description: {
            type: GraphQLString,
        },
        duration: {
            type: GraphQLInt
        },
        genres: {
            type: new GraphQLList(GenreInput)
        }
    }
});

export const ItemType = new GraphQLEnumType({
    name: 'ItemType',
    values: {
        song: {value: 'song'},
    }
});
