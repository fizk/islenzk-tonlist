import {
    GraphQLNonNull,
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLID
} from "graphql";
import Period from "./Period";
import Image from "./Image";
import Genre from "./Genre";
import Content from "./Content";
import Group from "./Group";
import {DatabaseTypes as D} from "../../@types";
import {splitContentType, splitGenre} from "../utils/split";
import UnitInterface from "./Unit";
import GraphQLDateTime from "./GraphQLDateTime";
import GraphQLUUID from './GraphQLUUID';
import {transformSnapshot} from "../utils/transform";
import {CollectionConnection} from "./Collection";

export const PersonAssociation = new GraphQLObjectType({
    name: 'PersonAssociation',
    fields: () => ({
        periods: {
            type: new GraphQLList(Period),
            resolve(root /*@todo MemberType*/) {
                return root.period || []
            },
        },
        group: {
            name: 'group',
            type: Group,
            resolve: (root: D.ReferenceUnit) => root._id.get().then(transformSnapshot)
        },
        uuid: {
            type: new GraphQLNonNull(GraphQLUUID),
            resolve: (root: D.ReferenceUnit) => root.__uuid
        }
    })
});

const Person = new GraphQLObjectType({
    name: 'Person',
    description: 'A single Artist (a human)',
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
            resolve: (root: D.ReferenceUnit) => splitContentType(root.__contentType)
        },
        albums: {
            name: 'albums',
            type: new GraphQLList(CollectionConnection),
            resolve (root: D.Unit) {
                return  root.__ref.filter((item: D.ReferenceUnit) => item.__contentType === 'collection/album');
            }
        },
        compilations: {
            name: 'compilations',
            type: new GraphQLList(CollectionConnection),
            resolve (root: D.Unit) {
                return root.__ref.filter((item: D.ReferenceUnit) => item.__contentType === 'collection/album+compilation')
            }
        },
        eps: {
            name: 'eps',
            type: new GraphQLList(CollectionConnection),
            resolve (root: D.Unit) {
                return root.__ref.filter((item: D.ReferenceUnit) => item.__contentType === 'collection/album+ep')
            }
        },
        singles: {
            name: 'singles',
            type: new GraphQLList(CollectionConnection),
            resolve (root: D.Unit) {
                return root.__ref.filter((item: D.ReferenceUnit) => item.__contentType === 'collection/album+single')
            }
        },
        association: {
            name: 'association',
                type: new GraphQLList(PersonAssociation),
                resolve(root, params, {database}) {
                    return database.doc(`/reference/${root._id}`).get()
                        .then(doc => doc.data())
                        .then((data: D.Unit) => {
                            return data
                                ? (data.__ref || []).filter(item => item.__contentType === 'artist/person+member')
                                : [];
                    });
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

export default Person;

