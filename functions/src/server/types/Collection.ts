import {
    GraphQLID, GraphQLNonNull, GraphQLString, GraphQLObjectType, GraphQLList,
    GraphQLInputObjectType, GraphQLInt,
    GraphQLEnumType
} from 'graphql';
import GraphQLDate from './GraphQLDate';
import Item from './Item'
import Image from './Image';
import Publication from './Publication';
import Content from './Content'
import Artist from './Artist';
import {DatabaseTypes as D} from "../../@types";
import Genre, {GenreInput} from "./Genre";
import {splitContentType, splitGenre} from '../utils/split'
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import UnitInterface from "./Unit";
import GraphQLDateTime from "./GraphQLDateTime";
import {transformSnapshot} from "../utils/transform";
import GraphQLUUID from "./GraphQLUUID";

const Collection = new GraphQLObjectType({
    name: 'Collection',
    description: 'A single collection',
    interfaces: [UnitInterface],
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
            resolve(root: D.Collection) {
                return root.genres.map(splitGenre)
            }
        },
        releaseDates: {
            type: GraphQLDate,
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
            resolve: (root: D.Unit) => splitContentType(root.__contentType)
        },
        artists: {
            name: 'artists',
            type: new GraphQLList(Artist),
            resolve(root: D.Unit, params, {database}) {
                return database.doc(`/reference/${root._id}`).get()
                    .then(doc => doc.data())
                    .then((data: D.Unit) => (data ? (data.__ref || []).filter(item => item.__contentType === 'collection/album') : []))
                    .then((items: D.ReferenceUnit[]) => Promise.all(items.map(item => item._id.get())))
                    .then(items => items.map(transformSnapshot));
            }
        },
        avatar: {
            name: 'avatar',
            type: Image,
            resolve (root: D.Unit) {
                const imagesReference: D.ReferenceUnit = root.__ref
                    .filter((item: D.ReferenceUnit) => item.__contentType === 'image/avatar')
                    .reduce((a, b) => b, undefined);

                return imagesReference
                    ? imagesReference._id.get().then(transformSnapshot)
                    : null;
            }
        },
        hero: {
            name: 'hero',
            type: Image,
            resolve (root: D.Unit) {
                const imagesReference: D.ReferenceUnit = root.__ref
                    .filter((item: D.ReferenceUnit) => item.__contentType === 'image/hero')
                    .reduce((a, b) => b, undefined);

                return imagesReference
                    ? imagesReference._id.get().then(transformSnapshot)
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
                        resolve: (root: D.ReferenceUnit) => root._id.get().then(transformSnapshot)
                    }
                }
            })),
            resolve (root: D.Unit) {
                return root.__ref.filter(item => item.__contentType === 'item/song');
            }
        },
        publications: {
            name: 'publication',
            type: new GraphQLList(Publication),
            resolve(root: D.Unit) {
                const referenceUnits: Promise<DocumentSnapshot>[] = root.__ref
                    .filter((item: D.ReferenceUnit) => item.__contentType === 'publisher/publication')
                    .map(item => item._id.get());

                return Promise.all(referenceUnits).then((items: DocumentSnapshot[]) => items.map(transformSnapshot));
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

export default Collection;

export const CollectionInput = new GraphQLInputObjectType({
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
            type: new GraphQLList(GenreInput),
        },
    },
});

export const CollectionType = new GraphQLEnumType({
    name: 'CollectionType',
    values: {
        album: {value: 'album'},
        ep: {value: 'album+ep'},
        single: {value: 'album+single'},
        compilation: {value: 'album+compilation'},
    }
});

export const CollectionConnection = new GraphQLObjectType({
    name: 'CollectionConnection',
    fields: () => ({
        collection: {
            type: Collection,
            resolve: (root: D.ReferenceUnit) => root._id.get().then(transformSnapshot)
        },
        uuid: {
            type: new GraphQLNonNull(GraphQLUUID),
            resolve: (root: D.ReferenceUnit) => root.__uuid
        }
    })
});

