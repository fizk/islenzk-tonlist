import { graphql } from 'graphql';
import schema from '../../schema';
import {Database, Snapshot} from '../../utils/database'

describe('ItemUpdate', () => {
    let database = undefined;

    beforeEach(() => {
        database = new Database({
            'item/1': new Snapshot('1', {
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
            mutation item_update {
              ItemUpdate(item: "1", values: {name: "new name"}) {
                name
              }
            }
        `;

        const expected = {
            data: {
                ItemUpdate: {
                    name: 'new name',
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database});
        expect(actual).toEqual(expected);
        expect(actual.errors).toBeUndefined();
    })
});


