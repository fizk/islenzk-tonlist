import { graphql } from 'graphql';
import schema from '../../schema';
import {Snapshot, Database} from '../../utils/database';

describe('ArtistAddCollection', () => {

    let database = undefined;

    beforeEach(() => {
        database = new Database({
            '/artists/1': new Snapshot('1', {
                __contentType: 'artist/person',
                name: 'hundur',
                __ref: []
            }),
            'collections/2': new Snapshot('2', {
                __contentType: 'collection/album',
                name: 'some name',
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
                    _id
                    name
                  }
                }
              }
            }
        `;

        const expected = {
            data: {
                ArtistAddCollection: {
                    __typename: 'Person',
                    _id: '1',
                    name: 'hundur',
                    albums: [{
                        _id: '2',
                        name: 'some name',
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

        const expected = {
            data: {
                ArtistAddCollection: {
                    __typename: 'Person',
                    _id: '1',
                    name: 'hundur',
                    albums: []
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database});
        expect(actual.data).toEqual(expected.data);
        expect(actual.errors).toBeUndefined();
    });
});


