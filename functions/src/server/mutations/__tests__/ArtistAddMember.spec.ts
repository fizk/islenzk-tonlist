import { graphql } from 'graphql';
import schema from '../../schema';
import {GraphQLTypes} from "../../../@types";
import MockFirebase from 'mock-cloud-firestore';

describe('ArtistAddMember', () => {
    let database = undefined;

    beforeEach(() => {
        database = database = new MockFirebase({
            __collection__: {
                artists: {
                    __doc__: {
                        '1': {
                            __contentType: 'artist/group',
                            name: 'Artist Name',
                            __ref: []
                        },
                        '2': {
                            __contentType: 'artist/person',
                            name: 'Collection Name',
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

    test('connect collection', async () => {
        const query = `
            mutation {
              ArtistAddMember(artist: "1", member: "2") {
                periods {from to}
                artist {
                  __typename
                  _id 
                  name
                  avatar {base64 url}
                }
                uuid
              }
            }
        `;

        const expected: {data: {ArtistAddMember: GraphQLTypes.GroupMember}} = {
            data: {
                ArtistAddMember: {
                    periods: [{from: null, to: null}],
                    artist: {
                        __typename: 'Person',
                        _id: 'id',
                        name: 'Artist Name',
                        avatar: null
                    },
                    uuid: 'string'
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database: database.firestore()});
        expect(actual).toMatchShapeOf(expected);
        expect(actual.errors).toBeUndefined();
    });
});


