import { graphql } from 'graphql';
import schema from '../../schema';
import {Snapshot, Database} from '../../utils/database';

describe('ArtistAddMember', () => {

    let database = undefined;

    beforeEach(() => {
        database = new Database({
            '/artists/1': new Snapshot('1', {
                __contentType: 'artist/group',
                name: 'hundur',
                __ref: []
            }),
            'artists/2': new Snapshot('2', {
                __contentType: 'artist/person',
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
            mutation {
              ArtistAddMember(artist: "1", member: "2") {
                periods {from to}
                artist {
                  _id 
                  name
                  avatar {base64 url}
                }
                uuid
              }
            }
        `;

        const expected = {
            data: {
                ArtistAddMember: {
                    periods: [{from: null, to: null}],
                    artist: {
                        _id: 'id',
                        name: 'name',
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


