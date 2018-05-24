import { graphql } from 'graphql';
import schema from '../../schema';
import {Database, Snapshot} from '../../utils/database'
import {DatabaseTypes, GraphQLTypes} from "../../../@types";

describe('ItemUpdate', () => {
    let database = undefined;

    beforeEach(() => {
        database = new Database({
            'item/1': new Snapshot<DatabaseTypes.Item>({
                _id: '1',
                __contentType: 'item/song',
                name: 'Item Name',
                __ref: []
            }),
            'artists/2': new Snapshot<DatabaseTypes.Artist>({
                _id: '2',
                __contentType: 'artist/group',
                name: 'Artist Name',
                __ref: []
            }),
        });
    });

    afterEach(() => {
        database = undefined;
    });

    test('update song name', async () => {

        const query = `
            mutation item_update {
              ItemUpdate(item: "1", values: {name: "New Name"}) {
                _id
                name
              }
            }
        `;

        const expected: {data: {ItemUpdate: GraphQLTypes.ItemType}} = {
            data: {
                ItemUpdate: {
                    _id: '1',
                    name: 'New Name',
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database});
        expect(actual).toEqual(expected);
        expect(actual.errors).toBeUndefined();
    })
});


