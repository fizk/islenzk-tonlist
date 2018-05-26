import { graphql } from 'graphql';
import schema from '../../schema';
import {Snapshot, Database} from '../../utils/database';
import {DatabaseTypes, GraphQLTypes} from "../../../@types";
import MockFirebase from 'mock-cloud-firestore';

describe('CollectionAddItem', () => {
    let database = undefined;

    beforeEach(() => {
        database = database = new MockFirebase({
            __collection__: {
                items: {
                    __doc__: {
                        2: {
                            __contentType: 'item/song',
                            name: 'Item Name',
                            __ref: []
                        }
                    }
                },
                collections: {
                    __doc__: {
                        2: {
                            __contentType: 'collection/album',
                            name: 'Collection Name',
                            __ref: []
                        }
                    }
                }
            }
        });
        // database = new Database({
        //     'items/2': new Snapshot<DatabaseTypes.Item>({
        //         _id: '2',
        //         __contentType: 'item/song',
        //         name: 'Item Name',
        //         __ref: []
        //     }),
        //     'collections/2': new Snapshot<DatabaseTypes.Collection>({
        //         _id: '2',
        //         __contentType: 'collection/album',
        //         name: 'Collection Name',
        //         __ref: []
        //     }),
        // });
    });

    afterEach(() => {
        database = undefined;
    });

    test('connect collection', async () => {
        const query = `
            mutation collection_add_item {
              CollectionAddItem(collection: "2", item: "2", type: song, position: 1, orderLabel: "some") {
                __typename
                name
                songs {position song{name _id}}
              }
            }
        `;

        const expected: {data: {CollectionAddItem: GraphQLTypes.Collection}} = {
            data: {
                CollectionAddItem: {
                    __typename: 'Collection',
                    name: 'Collection Name',
                    songs: [{
                        position: 1,
                        song: {
                            _id: '2',
                            name: 'Item Name',
                        },
                    }]
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database: database.firestore()});
        expect(actual).toEqual(expected);
        expect(actual.errors).toBeUndefined();
    });

    test('collection not found', async () => {
        const query = `
            mutation collection_add_item {
              CollectionAddItem(collection: "invalid-id", item: "2", type: song, position: 1, orderLabel: "some") {
                __typename
                name
                songs {position song{name}}
              }
            }
        `;

        const expected = {
            data: {
                CollectionAddItem: null
            }
        };
        const actual = await graphql(schema, query, {}, {database: database.firestore()});

        expect(actual.data).toEqual(expected.data);
        expect(actual.errors).toBeInstanceOf(Array)
    });
});


