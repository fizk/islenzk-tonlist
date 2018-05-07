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
import {Reference, ReferenceUnit, Unit} from "../../@types";
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";

const Group = new GraphQLObjectType({
    name: 'Group',
    description: 'A single Group (or artists)',
    fields: () => ({
        _id: {
            name: '_id',
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            name: 'name',
            type: new GraphQLNonNull(GraphQLString)
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
            resolve: (root) => root.genres.map(splitGenre)
        },
        periods: {
            name: 'periods',
            type: new GraphQLList(Period),
            resolve: (root) => ([{
                from: root.from,
                to: root.to,
            }])
        },
        contentType: {
            name: 'contentType',
            type: Content,
            resolve: (root: Unit) => splitContentType(root.__contentType)
        },
        albums: {
            name: 'albums',
            type: new GraphQLList(Collection),
            resolve (root: Reference) {
                const referenceUnits: Promise<DocumentSnapshot>[] = root.__ref
                    .filter((item:ReferenceUnit) => item.__contentType === 'collection/album')
                    .map(item => item._id.get());

                return Promise.all(referenceUnits).then((items: DocumentSnapshot[]) => (
                    items.map((doc: DocumentSnapshot) => ({...doc.data(), _id: doc.id}))
                        .slice()
                        .sort(orderAlbumType)
                ));
            }
        },
        compilations: {
            name: 'compilations',
            type: new GraphQLList(Collection),
            resolve (root: Reference) {
                const referenceUnits: Promise<DocumentSnapshot>[] = root.__ref
                    .filter((item:ReferenceUnit) => item.__contentType === 'collection/album+compilation')
                    .map(item => item._id.get());

                return Promise.all(referenceUnits).then((items: DocumentSnapshot[]) => (
                    items.map((doc: DocumentSnapshot) => ({...doc.data(), _id: doc.id}))
                        .slice()
                        .sort(orderAlbumType)
                ));
            }
        },
        eps: {
            name: 'eps',
            type: new GraphQLList(Collection),
            resolve (root: Reference) {
                const referenceUnits: Promise<DocumentSnapshot>[] = root.__ref
                    .filter((item:ReferenceUnit) => item.__contentType === 'collection/album+ep')
                    .map(item => item._id.get());

                return Promise.all(referenceUnits).then((items: DocumentSnapshot[]) => (
                    items.map((doc: DocumentSnapshot) => ({...doc.data(), _id: doc.id}))
                        .slice()
                        .sort(orderAlbumType)
                ));
            }
        },
        singles: {
            name: 'singles',
            type: new GraphQLList(Collection),
            resolve (root: Reference) {
                const referenceUnits: Promise<DocumentSnapshot>[] = root.__ref
                    .filter((item:ReferenceUnit) => item.__contentType === 'collection/album+single')
                    .map(item => item._id.get());

                return Promise.all(referenceUnits).then((items: DocumentSnapshot[]) => (
                    items.map((doc: DocumentSnapshot) => ({...doc.data(), _id: doc.id}))
                        .slice()
                        .sort(orderAlbumType)
                ));
            }
        },
        members: {
            name: 'members',
            type: new GraphQLList(new GraphQLObjectType({
                name: 'members',
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
                        resolve(root: ReferenceUnit) {
                            return root._id.get()
                                .then(doc => ({
                                    ...doc.data(),
                                    _id: doc.id
                                }))
                        }
                    }
                })
            })),
            resolve(root: Reference) {
                return root.__ref.filter(item => item.__contentType === 'artist/member');
            },
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
    })
});

export default Group;

