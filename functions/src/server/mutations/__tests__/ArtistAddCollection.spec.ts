import { graphql } from 'graphql';
import schema from '../../schema';
import {GraphQLTypes} from "../../../@types";
import MockFirebase from 'mock-cloud-firestore';

describe('ArtistAddCollection', () => {
    let database = undefined;

    beforeEach(() => {
        database = database = new MockFirebase({
            __collection__: {
                artists: {
                    __doc__: {
                        '1': {
                            __contentType: 'artist/person',
                            name: 'Artist Name',
                            __ref: [],
                        }
                    }
                },
                collections: {
                    __doc__: {
                        '2': {
                            __contentType: 'collection/album',
                            name: 'Collection Name',
                            __ref: []
                        }
                    }
                }
            }
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
                    uuid
                    collection {
                        __typename
                        _id
                        name
                    }
                    
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
                    albums: [
                        {
                            uuid: '1234',
                            collection: {
                                __typename: 'Collection',
                                _id: '2',
                                name: 'Collection Name',
                            }
                        },
                    ]
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database: database.firestore()});
        expect(actual).toMatchShapeOf(expected);
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
                    uuid
                    collection {
                        _id
                        name
                    }
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
        const actual = await graphql(schema, query, {}, {database: database.firestore()});

        expect(actual.data).toEqual(expected.data);
        expect(actual.errors).toBeInstanceOf(Array)
    });
});


