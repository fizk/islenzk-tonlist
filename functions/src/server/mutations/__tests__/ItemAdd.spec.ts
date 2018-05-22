import { graphql } from 'graphql';
import schema from '../../schema';
import {Database} from '../../utils/database'

describe('ItemAdd', () => {
    test('one', async () => {

        const database = new Database({});
        const query = `
            mutation create_item  {
              ItemAdd (type: song, values: {name: "item name"}) {
                name
              }
            }
        `;

        //Database size before insert
        expect(0).toEqual(database.tableSize);

        //
        const expected = {
            data: {
                ItemAdd: {
                    name: 'item name',
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database});
        expect(actual).toEqual(expected);

        //Database size after insert
        expect(1).toEqual(database.tableSize);
    })
});


