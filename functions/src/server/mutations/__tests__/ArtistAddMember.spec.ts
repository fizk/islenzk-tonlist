import { graphql } from 'graphql';
import schema from '../../schema';
import {Snapshot, Database} from '../../utils/database';
import {DatabaseTypes, GraphQLTypes} from "../../../@types";

describe('ArtistAddMember', () => {
    let database = undefined;

    beforeEach(() => {
        database = new Database({
            '/artists/1': new Snapshot<DatabaseTypes.Artist>({
                _id: '1',
                __contentType: 'artist/group',
                name: 'Artist Name',
                __ref: []
            }),
            'artists/2': new Snapshot<DatabaseTypes.Artist>({
                _id: '2',
                __contentType: 'artist/person',
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
        const actual = await graphql(schema, query, {}, {database});
        expect(actual).toMatchShapeOf(expected);
        expect(actual.errors).toBeUndefined();
    });
});


