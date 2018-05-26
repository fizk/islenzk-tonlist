import { graphql } from 'graphql';
import schema from '../../schema';
import MockFirebase from 'mock-cloud-firestore';
import {GraphQLTypes} from "../../../@types";

describe('CollectionAdd', () => {
    let database = undefined;

    beforeEach(() => {
        database = new MockFirebase({});
    });

    afterEach(() => {
        database = undefined;
    });

    test('add new album', async () => {
        const query = `
            mutation create_collection {
              CollectionAdd(type: album, values: {name:"new album" }) {
                __typename
                name
                description
                aka
                genres {type style}
                releaseDates
                contentType {type subtype attribute}
              }
            }
        `;

        const expected: {data: {CollectionAdd: GraphQLTypes.Collection}} = {
            data: {
                CollectionAdd: {
                    __typename: 'Collection',
                    name: 'new album',
                    description: null,
                    aka: [],
                    genres: [],
                    releaseDates: null,
                    contentType: {type: 'collection', subtype: 'album', attribute: null}
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database: database.firestore()});
        expect(actual).toEqual(expected);
        expect(actual.errors).toBeUndefined();

        //Database size after insert
        expect(database._data.__collection__.collections).toBeInstanceOf(Object)
    })
});


