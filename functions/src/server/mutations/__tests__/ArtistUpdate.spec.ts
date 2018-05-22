import { graphql } from 'graphql';
import schema from '../../schema';
import {Database, Snapshot} from '../../utils/database'

describe('ArtistUpdate', () => {
    let database = undefined;

    beforeEach(() => {
        database = new Database({
            'artists/1': new Snapshot('1', {
                __contentType: 'artist/person',
                name: 'hundur',
                __ref: []
            }),
            'artists/2': new Snapshot('2', {
                __contentType: 'collection/album',
                name: 'some name',
                __ref: []
            }),
        });
    });

    afterEach(() => {
        database = undefined;
    });

    test('one', async () => {

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

        const expected = {
            data: {
                ArtistUpdate: {
                    __typename: 'Person',
                    name: 'new name',
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database});
        expect(actual).toEqual(expected);
        expect(actual.errors).toBeUndefined();
    })
});


