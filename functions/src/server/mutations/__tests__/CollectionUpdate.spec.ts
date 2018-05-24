import { graphql } from 'graphql';
import schema from '../../schema';
import {Database, Snapshot} from '../../utils/database'
import {DatabaseTypes} from "../../../@types";

describe('CollectionUpdate', () => {
    let database = undefined;

    beforeEach(() => {
        database = new Database({
            'collection/1': new Snapshot<DatabaseTypes.Collection>({
                _id: '1',
                __contentType: 'collection/album',
                name: 'Collection Album #1',
                __ref: []
            }),
            'collection/2': new Snapshot<DatabaseTypes.Collection>({
                _id: '2',
                __contentType: 'collection/album',
                name: 'Collection Album #2',
                __ref: []
            }),
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
        const actual = await graphql(schema, query, {}, {database});
        expect(actual).toEqual(expected);
        expect(actual.errors).toBeUndefined();
    })
});


