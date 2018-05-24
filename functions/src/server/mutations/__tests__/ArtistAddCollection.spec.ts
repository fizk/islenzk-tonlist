import { graphql } from 'graphql';
import schema from '../../schema';
import {Snapshot, Database} from '../../utils/database';
import {DatabaseTypes, GraphQLTypes} from "../../../@types";

describe('ArtistAddCollection', () => {
    let database = undefined;

    beforeEach(() => {
        database = new Database({
            '/artists/1': new Snapshot<DatabaseTypes.Artist>({
                _id: '1',
                __contentType: 'artist/person',
                name: 'Artist Name',
                __ref: [],
            }),
            'collections/2': new Snapshot<DatabaseTypes.Collection>({
                _id: '2',
                __contentType: 'collection/album',
                name: 'Collection Name',
                __ref: []
            }),
        });
    });

    afterEach(() => {
        database = undefined;
    });

    test('connect collection', async () => {
        const query = `
            mutation artist_add_collection {
              ArtistAddCollection (artist: "1", collection: "2", collectionType: album) {
                __typename
                ... on Person {
                  _id
                  name
                  albums {
                    __typename
                    _id
                    name
                  }
                }
              }
            }
        `;

        const expected: {data: {ArtistAddCollection: GraphQLTypes.Artist}} = {
            data: {
                ArtistAddCollection: {
                    __typename: 'Person',
                    _id: '1',
                    name: 'Artist Name',
                    albums: [{
                        __typename: 'Collection',
                        _id: '2',
                        name: 'Collection Name',
                    }]
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database});
        expect(actual).toEqual(expected);
        expect(actual.errors).toBeUndefined();
    });

    test('artist not found', async () => {
        const query = `
            mutation artist_add_collection {
              ArtistAddCollection (artist: "invalid-id", collection: "2", collectionType: album) {
                __typename
                ... on Person {
                  _id
                  name
                  albums {
                    _id
                    name
                  }
                }
              }
            }
        `;

        const expected = {
            data: {
                ArtistAddCollection: null
            }
        };
        const actual = await graphql(schema, query, {}, {database});

        expect(actual.data).toEqual(expected.data);
        expect(actual.errors).toBeInstanceOf(Array)
    });

    test('collection not found', async () => {
        const query = `
            mutation artist_add_collection {
              ArtistAddCollection (artist: "1", collection: "invalid-id", collectionType: album) {
                __typename
                ... on Person {
                  _id
                  name
                  albums {
                    _id
                    name
                  }
                }
              }
            }
        `;

        const expected: {data: {ArtistAddCollection: GraphQLTypes.Artist}} = {
            data: {
                ArtistAddCollection: {
                    __typename: 'Person',
                    _id: '1',
                    name: 'Artist Name',
                    albums: []
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database});
        expect(actual.data).toEqual(expected.data);
        expect(actual.errors).toBeUndefined();
    });
});


