import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLList,GraphQLID
} from "graphql";
import Collection from "./Collection";
import Period from "./Period";
import Image from "./Image";
import Genre from "./Genre";
import Content from "./Content";
import Person from "./Person";
import {orderAlbumType} from '../utils/order';
import {splitContentType, splitGenre} from '../utils/split';
import {DatabaseTypes as D} from "../../@types";
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import UnitInterface from "./Unit";
import GraphQLDateTime from "./GraphQLDateTime";
import GraphQLUUID from './GraphQLUUID';
import {transformSnapshot} from "../utils/transform";

export const GroupMember = new GraphQLObjectType({
    name: 'GroupMember',
    fields: () => ({
        periods: {
            type: new GraphQLList(Period),
            resolve(root) {
                return root.period || []
            },
        },
        artist: {
            name: 'Person',
            type: Person,
            resolve: (root: D.ReferenceUnit) => root._id.get().then(transformSnapshot)
        },
        uuid: {
            type: new GraphQLNonNull(GraphQLUUID),
            resolve: (root: D.ReferenceUnit) => root.__uuid
        }
    })
});

const Group = new GraphQLObjectType({
    name: 'Group',
    description: 'A single Group (or artists)',
    interfaces: [UnitInterface],
    fields: () => ({
        _id: {
            name: '_id',
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            name: 'name',
            type: new GraphQLNonNull(GraphQLString)
        },
        createTime: {
            type: GraphQLDateTime,
        },
        updateTime: {
            type: GraphQLDateTime,
        },
        description: {
            name: 'description',
            type: GraphQLString,
        },
        aka: {
            name: 'Also known as',
            type: new GraphQLList(GraphQLString),
        },
        genres: {
            name: 'genres',
            type: new GraphQLList(Genre),
            resolve: (root: D.Artist) => root.genres.map(splitGenre)
        },
        periods: {
            name: 'periods',
            type: new GraphQLList(Period),
            resolve: (root: D.Artist) => ([{
                from: root.from,
                to: root.to,
            }])
        },
        contentType: {
            name: 'contentType',
            type: Content,
            resolve: (root: D.ReferenceUnit) => splitContentType(root.__contentType)
        },
        albums: {
            name: 'albums',
            type: new GraphQLList(Collection),
            resolve (root: D.Unit) {
                const referenceUnits: Promise<DocumentSnapshot>[] = root.__ref
                    .filter((item: D.ReferenceUnit) => item.__contentType === 'collection/album')
                    .map(item => item._id.get());

                return Promise.all(referenceUnits).then((snapshots: DocumentSnapshot[]) => (
                    snapshots.filter(items => items.exists)
                        .map(transformSnapshot)
                        .slice()
                        .sort(orderAlbumType)
                ));
            }
        },
        compilations: {
            name: 'compilations',
            type: new GraphQLList(Collection),
            resolve (root: D.Unit) {
                const referenceUnits: Promise<DocumentSnapshot>[] = root.__ref
                    .filter((item: D.ReferenceUnit) => item.__contentType === 'collection/album+compilation')
                    .map(item => item._id.get());

                return Promise.all(referenceUnits).then((snapshots: DocumentSnapshot[]) => (
                    snapshots.filter(items => items.exists)
                        .map(transformSnapshot)
                        .slice()
                        .sort(orderAlbumType)
                ));
            }
        },
        eps: {
            name: 'eps',
            type: new GraphQLList(Collection),
            resolve (root: D.Unit) {
                const referenceUnits: Promise<DocumentSnapshot>[] = root.__ref
                    .filter((item: D.ReferenceUnit) => item.__contentType === 'collection/album+ep')
                    .map(item => item._id.get());

                return Promise.all(referenceUnits).then((snapshots: DocumentSnapshot[]) => (
                    snapshots.filter(items => items.exists)
                        .map(transformSnapshot)
                        .slice()
                        .sort(orderAlbumType)
                ));
            }
        },
        singles: {
            name: 'singles',
            type: new GraphQLList(Collection),
            resolve (root: D.Unit) {
                const referenceUnits: Promise<DocumentSnapshot>[] = root.__ref
                    .filter((item: D.ReferenceUnit) => item.__contentType === 'collection/album+single')
                    .map(item => item._id.get());

                return Promise.all(referenceUnits).then((snapshots: DocumentSnapshot[]) => (
                    snapshots.filter(items => items.exists)
                        .map(transformSnapshot)
                        .slice()
                        .sort(orderAlbumType)
                ));
            }
        },
        members: {
            name: 'members',
            type: new GraphQLList(GroupMember),
            resolve: (root: D.Unit) => {
                return root.__ref.filter(item => item.__contentType === 'artist/person+member');
            },
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
    })
});

export default Group;
