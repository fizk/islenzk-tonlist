import { graphql } from 'graphql';
import schema from '../../schema';
import {Database} from '../../utils/database'
import {GraphQLTypes} from "../../../@types";

describe('ItemAdd', () => {
    let database = undefined;

    beforeEach(() => {
        database = new Database({});
    });

    afterEach(() => {
        database = undefined;
    });

    test('create new song', async () => {
        const query = `
            mutation create_item  {
              ItemAdd (type: song, values: {name: "Item Name"}) {
                _id
                name
              }
            }
        `;

        //Database size before insert
        expect(0).toEqual(database.tableSize);

        //
        const expected: {data: {ItemAdd: GraphQLTypes.ItemType}} = {
            data: {
                ItemAdd: {
                    _id: 'new id',
                    name: 'Item Name',
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database});
        expect(actual).toMatchShapeOf(expected);

        //Database size after insert
        expect(1).toEqual(database.tableSize);
    })
});


