import { graphql } from 'graphql';
import schema from '../../schema';
import MockFirebase from 'mock-cloud-firestore';
import {GraphQLTypes} from "../../../@types";

describe('ItemAdd', () => {
    let database = undefined;

    beforeEach(() => {
        database = new MockFirebase({});
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
        expect(database._data.__collection__).toBeUndefined();

        //
        const expected: {data: {ItemAdd: GraphQLTypes.ItemType}} = {
            data: {
                ItemAdd: {
                    _id: 'new id',
                    name: 'Item Name',
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database: database.firestore()});
        expect(actual).toMatchShapeOf(expected);

        //Database size after insert
        expect(database._data.__collection__.items.__doc__).toBeInstanceOf(Object);
    })
});


