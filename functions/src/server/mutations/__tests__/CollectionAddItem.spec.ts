import { graphql } from 'graphql';
import schema from '../../schema';
import {Snapshot, Database} from '../../utils/database';

describe('CollectionAddItem', () => {

    let database = undefined;

    beforeEach(() => {
        database = new Database({
            'items/2': new Snapshot('1', {
                __contentType: 'artist/person',
                name: 'hundur',
                __ref: []
            }),
            'collections/2': new Snapshot('2', {
                __contentType: 'collection/album',
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
            mutation collection_add_item {
              CollectionAddItem(collection: "2", item: "2", type: song, position: 1, orderLabel: "some") {
                __typename
                name
                songs {position song{name}}
              }
            }
        `;

        const expected = {
            data: {
                CollectionAddItem: {
                    __typename: 'Collection',
                    name: 'some name',
                    songs: [{
                        position: 1,
                        song: {
                            name: 'hundur',
                        },
                    }]
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database});

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
        const actual = await graphql(schema, query, {}, {database});

        expect(actual.data).toEqual(expected.data);
        expect(actual.errors).toBeInstanceOf(Array)
    });

    // test('item not found', async () => {
    //     const query = `
    //         mutation collection_add_item {
    //           CollectionAddItem(collection: "2", item: "invalid-id", type: song, position: 1, orderLabel: "some") {
    //             __typename
    //             name
    //             songs {position song{name}}
    //           }
    //         }
    //     `;
    //
    //     const expected = {
    //         data: {
    //             CollectionAddItem: {
    //                 __typename: 'Collection',
    //                 name: 'some name',
    //                 songs: []
    //             }
    //         }
    //     };
    //     const actual = await graphql(schema, query, {}, {database});
    //     expect(actual.data).toEqual(expected.data);
    //     expect(actual.errors).toBeUndefined();
    // });
});


