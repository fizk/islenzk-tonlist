import { graphql } from 'graphql';
import schema from '../../schema';
import {GraphQLTypes} from "../../../@types";
import MockFirebase from 'mock-cloud-firestore';

describe('ArtistUpdate', () => {
    let database = undefined;

    beforeEach(() => {
        database = database = new MockFirebase({
            __collection__: {
                artists: {
                    __doc__: {
                        1: {
                            __contentType: 'artist/person',
                            name: 'hundur',
                            __ref: []
                        },
                        2: {
                            __contentType: 'artist/person',
                            name: 'some name',
                            __ref: []
                        }
                    }
                },
            }
        });
    });

    afterEach(() => {
        database = undefined;
    });

    test('update name', async () => {

        const query = `
            mutation artist_update {
              ArtistUpdate(artist: "1", values: {name: "new name"}) {
                __typename
                ... on Person {
                  name
                }
              }
            }
        `;

        const expected: {data: {ArtistUpdate: GraphQLTypes.Artist}} = {
            data: {
                ArtistUpdate: {
                    __typename: 'Person',
                    name: 'new name',
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database: database.firestore()});
        expect(actual).toEqual(expected);
        expect(actual.errors).toBeUndefined();
    })
});


