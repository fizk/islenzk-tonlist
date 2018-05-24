import { graphql } from 'graphql';
import schema from '../../schema';
import {Snapshot, Database} from '../../utils/database';
import {DatabaseTypes} from "../../../@types";

describe('ArtistRemoveReference', () => {
    let database = undefined;

    beforeEach(() => {
        database = new Database({
            '/artists/1': new Snapshot<DatabaseTypes.Artist>({
                _id: '1',
                __contentType: 'artist/person',
                name: 'hundur',
                __ref: [{
                    _id: '2',
                    __uuid: '123e4567-e89b-12d3-a456-426655440000',
                    __contentType: 'collection/album'
                }, {
                    _id: '3',
                    __uuid: '123e4567-e89b-12d3-a456-426655440001',
                    __contentType: 'collection/album'
                }]
            }),
        });
    });

    afterEach(() => {
        database = undefined;
    });

    test('remove one reference', async () => {
        const query = `
            mutation artist_remove_reference {
              ArtistRemoveReference(artist: "1", reference: "123e4567-e89b-12d3-a456-426655440000") {
                ... on Person {
                  _id
                  name
                }
              }
            }
        `;

        //Before
        expect(2).toEqual(database.table['/artists/1'].data().__ref.length);

        //
        const actual = await graphql(schema, query, {}, {database});
        expect(actual.errors).toBeUndefined();

        //After
        expect(1).toEqual(database.table['/artists/1'].data().__ref.length);
    });

    test('no reference found', async () => {
        const query = `
            mutation artist_remove_reference {
              ArtistRemoveReference(artist: "1", reference: "123e4567-e89b-12d3-a456-426655440003") {
                ... on Person {
                  _id
                  name
                }
              }
            }
        `;

        //Before
        expect(2).toEqual(database.table['/artists/1'].data().__ref.length);

        //
        const actual = await graphql(schema, query, {}, {database});
        expect(actual.errors).toBeUndefined();

        //After
        expect(2).toEqual(database.table['/artists/1'].data().__ref.length);
    });
});


