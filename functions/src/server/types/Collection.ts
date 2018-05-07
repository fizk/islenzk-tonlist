import {
    GraphQLID, GraphQLNonNull, GraphQLString, GraphQLObjectType, GraphQLList,
    GraphQLInputObjectType, GraphQLInt
} from 'graphql';
import GraphQLDate from './GraphQLDate';
import Item from './Item'
import Image from './Image';
import Publication from './Publication';
import Content from './Content'
import Artist from './Artist';
import {Reference, ReferenceUnit} from "../../@types";
import Genre from "./Genre";
import {splitContentType, splitGenre} from '../utils/split'
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";

export default new GraphQLObjectType({
    name: 'Collection',
    description: 'A single collection',
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
        aka: {
            type: new GraphQLList(GraphQLString),
        },
        genres: {
            name: 'genres',
            type: new GraphQLList(Genre),
            resolve(root) {
                return root.genres.map(splitGenre)
            }
        },
        releaseDates: {
            type: GraphQLDate,
        },
        contentType: {
            name: 'contentType',
            type: Content,
            resolve: (root) => splitContentType(root.__contentType)
        },
        artists: {
            name: 'artists',
            type: new GraphQLList(Artist),
            resolve(root, params, {database}) {
                return database.doc(`/reference/${root._id}`).get()
                    .then(doc => doc.data())
                    .then((data: Reference) => (data ? (data.__ref || []).filter(item => item.__contentType === 'collection/album') : []))
                    .then((items: ReferenceUnit[]) => Promise.all(items.map(item => item._id.get())))
                    .then(items => items.map(doc => ({...doc.data(), _id: doc.id})));
            }
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
        songs: {
            name: 'songs',
            type: new GraphQLList(new GraphQLObjectType({
                name: 'song',
                fields: {
                    position: {
                        name: 'position',
                        type: GraphQLInt,
                    },
                    song: {
                        name: 'song',
                        type: Item,
                        resolve(root) {
                            return root._id.get().then(doc => ({
                                ...doc.data(),
                                _id: doc.id
                            }))
                        }
                    }
                }
            })),
            resolve (root: Reference) {
                return root.__ref.filter(item => item.__contentType === 'item/song');
            }
        },
        publications: {
            name: 'publication',
            type: new GraphQLList(Publication),
            resolve(root: Reference) {
                const referenceUnits: Promise<DocumentSnapshot>[] = root.__ref
                    .filter((item:ReferenceUnit) => item.__contentType === 'publisher/publication')
                    .map(item => item._id.get());

                return Promise.all(referenceUnits).then((items: DocumentSnapshot[]) => {
                    return items.map((doc: DocumentSnapshot) => ({...doc.data(), _id: doc.id}))
                });
            }
        },
        performers: {
            type: new GraphQLList(Artist),
            resolve(root, params, {database, }) {
                return {}
                // return new Promise((pass, fail) => {
                //     database.find({'__ref._id': new ObjectID(root._id)}).toArray((error, items) => {
                //         if (error) {
                //             fail(error)
                //         } else {
                //             pass(items);
                //         }
                //     });
                // });

            }
        },
    })
});

const CollectionInput = new GraphQLInputObjectType({
    name: 'CollectionInput',
    fields: {
        name: {
            name: 'name',
            type: new GraphQLNonNull(GraphQLString)
        },
        aka: {
            name: 'aka',
            type: new GraphQLList(GraphQLString),
        },
        description: {
            name: 'description',
            type: GraphQLString,
        },
        releaseDates: {
            name: 'releaseDates',
            type: GraphQLDate,
        },
        genres: {
            name: 'genre',
            type: new GraphQLList(GraphQLString),
        },
    },
});

export {CollectionInput}
