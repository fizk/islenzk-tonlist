import { graphql } from 'graphql';
import schema from '../../schema';
import MockFirebase from 'mock-cloud-firestore';
import {GraphQLTypes} from "../../../@types";

describe('ItemUpdate', () => {
    let database = undefined;

    beforeEach(() => {
        database = database = new MockFirebase({
            __collection__: {
                artists: {
                    __doc__: {
                        2: {
                            __contentType: 'artist/group',
                            name: 'Artist Name',
                            __ref: []
                        }
                    }
                },
                item: {
                    __doc__: {
                        1: {
                            __contentType: 'item/song',
                            name: 'Item Name',
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
        const actual = await graphql(schema, query, {}, {database: database.firestore()});
        expect(actual).toEqual(expected);
        expect(actual.errors).toBeUndefined();
    })
});


