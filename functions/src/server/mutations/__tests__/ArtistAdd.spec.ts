import { graphql } from 'graphql';
import schema from '../../schema';
import {Database} from '../../utils/database'

describe('ArtistAdd', () => {
    test('one', async () => {

        const database = new Database({});
        const query = `
            mutation {
              ArtistAdd(values: {name: "hundur"}, type: person) {
                __typename
                ... on Person {
                  name
                  aka
                  description
                  genres {type}
                  periods {from to}
                }
              }
            }
        `;

        //Database size before insert
        expect(0).toEqual(database.tableSize);

        //
        const expected = {
            data: {
                ArtistAdd: {
                    __typename: 'Person',
                    name: 'hundur',
                    aka: [],
                    description: null,
                    genres: [],
                    periods: [{from: null, to: null}],
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database});
        expect(actual).toEqual(expected);

        //Database size after insert
        expect(1).toEqual(database.tableSize);
    })
});


