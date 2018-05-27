import { graphql } from 'graphql';
import schema from '../../schema';
import MockFirebase from 'mock-cloud-firestore';

describe('CollectionUpdate', () => {
    let database = undefined;

    beforeEach(() => {
        database = database = new MockFirebase({
            __collection__: {
                collections: {
                    __doc__: {
                        1: {
                            __contentType: 'collection/album',
                            name: 'Collection Album #1',
                            __ref: []
                        },
                        2: {
                            __contentType: 'collection/album',
                            name: 'Collection Album #2',
                            __ref: []
                        }
                    }
                }
            }
        });
    });

    afterEach(() => {
        database = undefined;
    });

    test('update name', async () => {
        const query = `
            mutation collection_update {
              CollectionUpdate(collection: "1", values: {name: "New Name"}) {
                name
              }
            }
        `;

        const expected = {
            data: {
                CollectionUpdate: {
                    name: 'New Name',
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database: database.firestore()});
        expect(actual).toEqual(expected);
        expect(actual.errors).toBeUndefined();
    })
});


