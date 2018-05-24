import { graphql } from 'graphql';
import schema from '../../schema';
import {Database} from '../../utils/database'
import {GraphQLTypes} from "../../../@types";

describe('CollectionAdd', () => {
    let database = undefined;

    beforeEach(() => {
        database = new Database({});
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

        //Database size before insert
        expect(0).toEqual(database.tableSize);

        //
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
        const actual = await graphql(schema, query, {}, {database});
        expect(actual).toEqual(expected);
        expect(actual.errors).toBeUndefined();

        //Database size after insert
        expect(1).toEqual(database.tableSize);
    })
});


