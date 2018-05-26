import { graphql } from 'graphql';
import schema from '../../schema';
import MockFirebase from 'mock-cloud-firestore';

describe('CollectionRemoveReference', () => {
    let database = undefined;

    beforeEach(() => {
        database = database = new MockFirebase({
            __collection__: {
                collections: {
                    __doc__: {
                        1: {
                            __contentType: 'collection/album',
                            name: 'Collection Name',
                            __ref: [{
                                __uuid: '123e4567-e89b-12d3-a456-426655440000',
                                __contentType: 'collection/album',
                                _id: '__ref__:items/1'
                            }, {
                                __uuid: '123e4567-e89b-12d3-a456-426655440001',
                                __contentType: 'collection/album',
                                _id: '__ref__:items/2'
                            }]
                        }
                    }
                },
                items: {
                    1: {
                        __contentType: 'collection/album',
                        __ref: []
                    },
                    2: {
                        __contentType: 'collection/album',
                        __ref: []
                    },
                }
            }
        });
    });

    afterEach(() => {
        database = undefined;
    });


    test('remove one reference', async () => {
        const query = `
            mutation collection_remove_reference {
              CollectionRemoveReference(collection: "1", reference: "123e4567-e89b-12d3-a456-426655440000") {
                ... on Person {
                  _id
                  name
                }
              }
            }
        `;

        //Before
        expect(2).toEqual(database._data.__collection__.collections.__doc__[1].__ref.length);

        //
        const actual = await graphql(schema, query, {}, {database: database.firestore()});
        expect(actual.errors).toBeUndefined();

        //After
        expect(1).toEqual(database._data.__collection__.collections.__doc__[1].__ref.length);
    });

    test('no reference found', async () => {
        const query = `
            mutation collection_remove_reference {
              CollectionRemoveReference(collection: "1", reference: "123e4567-e89b-12d3-a456-426655440003") {
                ... on Person {
                  _id
                  name
                }
              }
            }
        `;

        //Before
        expect(2).toEqual(database._data.__collection__.collections.__doc__[1].__ref.length);

        //
        const actual = await graphql(schema, query, {}, {database: database.firestore()});
        expect(actual.errors).toBeUndefined();

        //After
        expect(2).toEqual(database._data.__collection__.collections.__doc__[1].__ref.length);
    });
});


