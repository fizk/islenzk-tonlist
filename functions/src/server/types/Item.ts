import {GraphQLID, GraphQLNonNull, GraphQLString, GraphQLObjectType, GraphQLInt, GraphQLList} from "graphql";
import Collection from './Collection';
import ArtistRole from './ArtistRole';
import {Reference, ReferenceUnit} from "../../@types";
import Genre from "./Genre";
import {splitContentType} from "../utils/split";

const Item = new GraphQLObjectType({
    name: 'Item',
    description: 'A part of a collection',
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        description: {
            type: GraphQLString
        },
        duration: {
            type: GraphQLInt
        },
        genres: {
            name: 'genres',
            type: new GraphQLList(Genre),
            resolve: (root) => splitContentType(root.__contentType)
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
            type: new GraphQLList(Collection),
            resolve(root, params, {database}) {
                return database.doc(`/reference/${root._id}`).get()
                    .then(doc => doc.data())
                    .then((data: Reference) => data.__ref.filter(item => item.__contentType === 'item/song'))
                    .then((items: ReferenceUnit[]) => Promise.all(items.map(item => item._id.get())))
                    .then(items => items.map(doc => ({...doc.data(), _id: doc.id})));

            }
        }
    })
});


export default Item;
