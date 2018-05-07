import * as React from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import CollectionSection from './CollectionSection';

// const itemCreateMutate = gql`
//     mutation createItem ($item: ItemInput!, $collection: ID!) {
//         addItem(item: $item collection: $collection) {
//             _id
//             name
//             duration
//         }
//     }`;
// const itemConnectMutate = gql`
//     mutation connectItem ($item: ID!, $collection: ID!) {
//         connectItem(item: $item collection: $collection) {
//             _id
//             name
//         }
//     }`;
// const itemDisconnectMutate = gql`
//     mutation disconnectionitem ($item: ID!, $collection: ID!) {
//         disconnectItem(item: $item, collection: $collection) {
//             _id
//             name
//         }
//     }`;
// const setAvatar = gql`
//     mutation setAvatar($unit: ID!, $avatar: ID!) {
//         setAvatar(unit: $unit, avatar: $avatar ) {
//             base64
//             url
//         }
//     }`;
// const setHero = gql`
//     mutation setHero ($unit: ID!, $hero: ID!) {
//         setHero(unit: $unit, hero: $hero) {
//             base64
//             url
//         }
//     }`;
const collectionQuery = gql`
    query ($id: ID!) {
        Collection (id: $id) {
            _id
            name
            description
            aka
            genres {type style}
            releaseDates
            contentType {type subtype attribute}
            publications {
                catalogNumber
                date
                formats
                publishers {
                    _id
                    name
                }
            }
            artists {
                __typename
                ... on Person {
                    _id
                    name
                    avatar {base64 url}
                }
                ... on Group {
                    _id
                    name
                    avatar {base64 url}
                }
            }
            avatar {base64 url}
            hero {base64 url}
            songs {
                position
                song {
                    _id
                    name
                    duration
                }
            }
        }
    }
`;
// const collectionUpdateMutate = gql`
//     mutation updateCollection ($collection: CollectionInput!, $id: ID!) {
//         updateCollection(collection: $collection id: $id) {
//             name
//             aka
//             releaseDates
//             description
//             aka
//             genres
//         }
//     }`;
//
export default compose(
    // graphql(setAvatar, {
    //     props: ({mutate}) => ({
    //         setAvatar: (vars) => (
    //             mutate({
    //                 variables: vars,
    //                 update: (store, {data: {setAvatar, }}) => {
    //                     const data = store.readQuery({ query: collectionQuery, variables: {id: vars.unit, }, });
    //                     data.Collection.avatar = setAvatar;
    //                     store.writeQuery({ query: collectionQuery, data, });
    //                 },
    //             })
    //         ),
    //     }),
    // }),
    // graphql(setHero, {
    //     props: ({mutate}) => ({
    //         setHero: (vars) => (
    //             mutate({
    //                 variables: vars,
    //                 update: (store, {data: {setHero, }}) => {
    //                     const data = store.readQuery({ query: collectionQuery, variables: {id: vars.unit, }, });
    //                     data.Collection.hero = setHero;
    //                     store.writeQuery({ query: collectionQuery, data, });
    //                 },
    //             })
    //         ),
    //     }),
    // }),
    // graphql(itemCreateMutate, {
    //     props: ({mutate, }) => ({
    //         createItem: (vars) => (
    //             mutate({
    //                 variables: vars,
    //                 update: (store, {data: {addItem, }}) => {
    //                     const data = store.readQuery({ query: collectionQuery, variables: {id: vars.collection, }, });
    //                     data.Collection.songs.push(addItem);
    //                     store.writeQuery({ query: collectionQuery, data, });
    //                 },
    //             })
    //         ),
    //     }),
    // }),
    // graphql(itemConnectMutate, {
    //     props: ({mutate, }) => ({
    //         connectItem: (vars) => (
    //             mutate({
    //                 variables: vars,
    //                 update: (store, {data: {connectItem, }}) => {
    //                     const data = store.readQuery({ query: collectionQuery, variables: {id: vars.collection, }, });
    //                     data.Collection.songs.push(connectItem);
    //                     store.writeQuery({ query: collectionQuery, data, });
    //                 },
    //             })
    //         ),
    //     }),
    // }),
    // graphql(itemDisconnectMutate, {
    //     props: ({mutate, }) => ({
    //         removeItem: (vars) => (
    //             mutate({
    //                 variables: vars,
    //                 update: (store) => {
    //                     const data = store.readQuery({ query: collectionQuery, variables: {id: vars.collection, }, });
    //                     data.Collection.songs = data.Collection.songs.filter(song => {
    //                         return song._id !== vars.item;
    //                     });
    //                     store.writeQuery({ query: collectionQuery, data, });
    //                 },
    //             })
    //         ),
    //     }),
    // }),
    graphql(collectionQuery, {
        props: (all: any) => ({album: all.data.loading === false ? all.data.Collection : undefined, }),
        options: ({id, }: {[key: string]: any}) => ({variables: {id: id, }, }),
    }),
    // graphql(collectionUpdateMutate, {
    //     props: ({mutate, }) => ({
    //         updateCollection: (vars) => (
    //             mutate({
    //                 variables: vars,
    //                 update: (store, {data: {updateCollection, }}) => {
    //                     const data = store.readQuery({ query: collectionQuery, variables: {id: vars.id, }, });
    //
    //                     data.Collection.name = updateCollection.name;
    //                     data.Collection.description = updateCollection.description;
    //                     data.Collection.releaseDates = updateCollection.releaseDates;
    //                     data.Collection.genres = updateCollection.genres;
    //                     data.Collection.aka = updateCollection.aka;
    //
    //                     store.writeQuery({ query: collectionQuery, data, });
    //                 },
    //             })
    //         ),
    //     }),
    // })
)(CollectionSection);
