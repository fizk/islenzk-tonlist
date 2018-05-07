import * as React from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import ArtistSection from './ArtistSection';

// const setAvatarMutation = gql`
//     mutation setAvatar($unit: ID!, $avatar: ID!) {
//       setAvatar(unit: $unit avatar: $avatar) {
//         base64
//         url
//       }
//     }`;
// const setHeroMutation = gql`
//     mutation setHero ($unit: ID!, $hero: ID!) {
//       setHero(unit: $unit hero: $hero) {
//         base64
//         url
//       }
//     }`;
// const associationConnectMutation = gql`
//     mutation ($artist: ID!, $member: ID!) {
//         connectArtist(artist: $artist, member: $member) {
//             _id
//             name
//             avatar {base64 url}
//         }
//     }`;
// const associationRemoveMutation = gql`
//     mutation disconnectmember ($artist: ID!, $member: ID!) {
//         disConnectArtist (artist: $artist, member: $member) {
//             _id
//         }
//     }`;
// const associationCreateMutation = gql`
//     mutation ($artist: ArtistInput! $type: String!, $association: ID! ) {
//         addArtist(artist: $artist, association: $association, type: $type) {
//             _id
//             name
//             avatar {base64 url}
//         }
//     }`;
// const associationAddPeriodMutation = gql`
//     mutation addPeriod ($artist: ID!, $association: ID!,  $period: PeriodInput!) {
//         addPeriod(artist: $artist, association: $association, period: $period) {
//             from
//             to
//         }
//     }`;
// const artistUpdateMutate = gql`
//     mutation updateArtist ($artist: ArtistInput!, $id: ID!) {
//         updateArtist(artist: $artist id: $id) {
//             name
//             aka
//             period {from to}
//             genres
//             description
//         }
//     }`;
// const collectionCreateMutate = gql`
//     mutation addCollection ($collection: CollectionInput!, $artist: ID!, $contentType: ContentTypeInput!) {
//         addCollection (collection: $collection artist: $artist contentType: $contentType) {
//             _id
//             name
//             releaseDates
//             contentType {type subtype attribute}
//             avatar {base64 url}
//         }
//     }`;
// const collectionConnectMutate = gql`
//     mutation connectCollection($collection: ID! $artist: ID) {
//         connectCollection(collection: $collection, artist: $artist) {
//             _id
//             name
//             releaseDates
//             contentType {type subtype attribute}
//             avatar {base64 url}
//         }
//     }`;
// const collectionRemoveMutate = gql`
//     mutation disconnectcollection ($artist: ID!, $collection: ID!) {
//         disConnectCollection(artist: $artist, collection: $collection) {
//             _id
//             contentType {type subtype attribute}
//         }
//     }`;
const artistQuery = gql`
    query ($id: String!) {
        Artist(id: $id) {
            __typename
            ... on Group {
                _id
                name
                aka
                description
                genres {type style}
                periods {from to}
                contentType {type subtype attribute}
                avatar {base64 url}
                hero {base64 url}
                albums {
                    _id
                    name
                    releaseDates
                    contentType {type attribute attribute}
                    avatar {base64 url}
                }
                compilations {
                    _id
                    name
                    releaseDates
                    contentType {type attribute attribute}
                    avatar {base64 url}
                }
                eps {
                    _id
                    name
                    releaseDates
                    contentType {type attribute attribute}
                    avatar {base64 url}
                }
                singles {
                    _id
                    name
                    releaseDates
                    contentType {type attribute attribute}
                    avatar {base64 url}
                }
                members {
                    periods {from to}
                    artist{
                        _id
                        name
                        avatar {base64 url}
                    }
                    periods {
                        from
                        to
                    }
                }
            }
            ... on Person {
                _id
                name
                aka
                description
                genres {type style}
                periods {from to}
                contentType {type subtype attribute}
                avatar {base64 url}
                hero {base64 url}
                albums {
                    _id
                    name
                    releaseDates
                    contentType {type attribute attribute}
                    avatar {base64 url}
                }
                compilations {
                    _id
                    name
                    releaseDates
                    contentType {type attribute attribute}
                    avatar {base64 url}
                }
                eps {
                    _id
                    name
                    releaseDates
                    contentType {type attribute attribute}
                    avatar {base64 url}
                }
                singles {
                    _id
                    name
                    releaseDates
                    contentType {type attribute attribute}
                    avatar {base64 url}
                }
                association {
                    periods {from to}
                    group{
                        _id
                        name
                        avatar {base64 url}
                    }
                    periods {
                        from
                        to
                    }
                }
            }
        }
    }
`;

export default compose(
    // graphql(collectionCreateMutate, {
    //     props: ({mutate, }) => ({
    //         createCollection: (vars) => (
    //             mutate({
    //                 variables: vars,
    //                 update: (store, {data: {addCollection, }}) => {
    //                     const data = store.readQuery({ query: artistQuery, variables: {id: vars.artist, }, });
    //                     switch (addCollection.contentType.attribute) {
    //                     case 'compilation':
    //                         data.Artist.compilations.push(addCollection);
    //                         break;
    //                     case 'ep':
    //                         data.Artist.eps.push(addCollection);
    //                         break;
    //                     case 'single':
    //                         data.Artist.singles.push(addCollection);
    //                         break;
    //                     default:
    //                         data.Artist.albums.push(addCollection);
    //                         break;
    //                     }
    //
    //                     store.writeQuery({ query: artistQuery, data, });
    //                 },
    //             })
    //         ),
    //     }),
    // }),
    // graphql(collectionRemoveMutate, {
    //     props: ({mutate, }) => ({
    //         removeCollection: (vars) => (
    //             mutate({
    //                 variables: vars,
    //                 update: (store, {data: {disConnectCollection}}) => {
    //                     const data = store.readQuery({ query: artistQuery, variables: {id: vars.artist, }, });
    //                     switch (disConnectCollection.contentType.attribute) {
    //                     case 'compilation':
    //                         data.Artist.compilations = data.Artist.compilations.filter(album => {
    //                             return album._id !== disConnectCollection._id;
    //                         });
    //                         break;
    //                     case 'ep':
    //                         data.Artist.eps = data.Artist.eps.filter(album => {
    //                             return album._id !== disConnectCollection._id;
    //                         });
    //                         break;
    //                     case 'single':
    //                         data.Artist.singles = data.Artist.singles.filter(album => {
    //                             return album._id !== disConnectCollection._id;
    //                         });
    //                         break;
    //                     default:
    //                         data.Artist.albums = data.Artist.albums.filter(album => {
    //                             return album._id !== disConnectCollection._id;
    //                         });
    //                         break;
    //                     }
    //
    //                     store.writeQuery({ query: artistQuery, data, });
    //                 },
    //             })
    //         ),
    //     }),
    // }),
    // graphql(collectionConnectMutate, {
    //     props: ({mutate, }) => ({
    //         connectCollection: (vars) => (
    //             mutate({
    //                 variables: vars,
    //                 update: (store, {data: {connectCollection, }}) => {
    //                     const data = store.readQuery({ query: artistQuery, variables: {id: vars.artist, }, });
    //                     switch (connectCollection.contentType.attribute) {
    //                     case 'compilation':
    //                         data.Artist.compilations.push(connectCollection);
    //                         break;
    //                     case 'ep':
    //                         data.Artist.eps.push(connectCollection);
    //                         break;
    //                     case 'single':
    //                         data.Artist.singles.push(connectCollection);
    //                         break;
    //                     default:
    //                         data.Artist.albums.push(connectCollection);
    //                         break;
    //                     }
    //                     store.writeQuery({ query: artistQuery, data, });
    //                 },
    //             })
    //         ),
    //     }),
    // }),
    // graphql(associationConnectMutation, {
    //     props: ({mutate, }) => ({
    //         connectArtist: (vars) => (
    //             mutate({
    //                 variables: vars,
    //                 update: (store, {data: {connectArtist, }}) => {
    //                     const data = store.readQuery({ query: artistQuery, variables: {id: vars.artist, }, });
    //                     data.Artist.associated.push({
    //                         periods: [],
    //                         artist: connectArtist,
    //                     });
    //                     store.writeQuery({ query: artistQuery, data, });
    //                 },
    //             })
    //         ),
    //     }),
    // }),
    // graphql(associationRemoveMutation, {
    //     props: ({mutate, }) => ({
    //         removeMember: (vars) => (
    //             mutate({
    //                 variables: vars,
    //                 update: (store) => {
    //                     const data = store.readQuery({ query: artistQuery, variables: {id: vars.artist, }, });
    //                     data.Artist.associated = data.Artist.associated.filter(association => {
    //                         return association.artist._id !== vars.member;
    //                     });
    //                     store.writeQuery({ query: artistQuery, data, });
    //                 },
    //             })
    //         ),
    //     }),
    // }),
    // graphql(associationCreateMutation, {
    //     props: ({mutate, }) => ({
    //         createArtist: (vars) => (
    //             mutate({
    //                 variables: vars,
    //                 update: (store, {data: {addArtist, }}) => {
    //                     const data = store.readQuery({ query: artistQuery, variables: {id: vars.association, }, });
    //                     data.Artist.associated.push({
    //                         periods: [],
    //                         artist: addArtist,
    //                     });
    //                     store.writeQuery({ query: artistQuery, data, });
    //                 },
    //             })
    //         ),
    //     }),
    // }),
    // graphql(artistUpdateMutate, {
    //     props: ({mutate, }) => ({
    //         updateArtist: (vars) => (
    //             mutate({
    //                 variables: vars,
    //                 update: (store, {data: {updateArtist, }}) => {
    //                     const data = store.readQuery({ query: artistQuery, variables: {id: vars.id, }, });
    //                     data.Artist.name = updateArtist.name;
    //                     data.Artist.description = updateArtist.description;
    //                     data.Artist.period = updateArtist.period;
    //                     data.Artist.genres = updateArtist.genres;
    //                     data.Artist.aka = updateArtist.aka;
    //
    //                     store.writeQuery({ query: artistQuery, data, });
    //                 },
    //             })
    //         ),
    //     }),
    // }),
    // graphql(setAvatarMutation, {
    //     props: ({mutate}) => ({
    //         setAvatar: (vars) => (
    //             mutate({
    //                 variables: vars,
    //                 update: (store, {data: {setAvatar, }}) => {
    //                     const data = store.readQuery({ query: artistQuery, variables: {id: vars.unit, }, });
    //                     data.Artist.avatar = setAvatar;
    //                     store.writeQuery({ query: artistQuery, data, });
    //                 },
    //             })
    //         ),
    //     }),
    // }),
    // graphql(setHeroMutation, {
    //     props: ({mutate}) => ({
    //         setHero: (vars) => (
    //             mutate({
    //                 variables: vars,
    //                 update: (store, {data: {setHero, }}) => {
    //                     const data = store.readQuery({ query: artistQuery, variables: {id: vars.unit, }, });
    //                     data.Artist.hero = setHero;
    //                     store.writeQuery({ query: artistQuery, data, });
    //                 },
    //             })
    //         ),
    //     }),
    // }),
    // graphql(associationAddPeriodMutation, {
    //     props: ({mutate}) => ({
    //         addPeriod: (vars) => (
    //             mutate({
    //                 variables: vars,
    //                 update: (store, {data: {addPeriod, }}) => {
    //                     const data = store.readQuery({ query: artistQuery, variables: {id: vars.artist, }, });
    //                     data.Artist.associated = data.Artist.associated.map(entry => {
    //                         if (entry.artist._id === vars.association) {
    //                             entry.periods.push(addPeriod);
    //                         }
    //                         return entry;
    //                     });
    //                     store.writeQuery({ query: artistQuery, data, });
    //                 },
    //             })
    //         ),
    //     }),
    // }),

    graphql(artistQuery, {
        props: (all: any) => ({
            artist: all.data.loading === false ? all.data.Artist : undefined,
            loading: all.data.loading,
        }),
        options: ({id, }: {[key: string]: any}) => ({
            variables: {
                id: id,
            },
        }),
    })
)(ArtistSection);
