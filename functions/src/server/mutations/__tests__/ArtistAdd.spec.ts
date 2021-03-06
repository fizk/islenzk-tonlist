import { graphql } from 'graphql';
import schema from '../../schema';
import {GraphQLTypes} from "../../../@types";
import MockFirebase from 'mock-cloud-firestore';

describe('ArtistAdd', () => {
    let database = undefined;

    beforeEach(() => {
        database = new MockFirebase({});
    });

    afterEach(() => {
        database = undefined;
    });

    test('add with default values', async () => {
        const query = `
            mutation {
              ArtistAdd(values: {name: "New Artist"}, type: person) {
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

        //Database is empty
        expect(database._data.__collection__).toBeUndefined();

        //
        const expected: {data: {ArtistAdd: GraphQLTypes.Artist}} = {
            data: {
                ArtistAdd: {
                    __typename: 'Person',
                    name: 'New Artist',
                    aka: [],
                    description: null,
                    genres: [],
                    periods: [{from: null, to: null}],
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database: database.firestore()});
        expect(actual).toEqual(expected);


        //Database has an object in it
        expect(database._data.__collection__.artists.__doc__).toBeInstanceOf(Object);
    });

    test('add with full values', async () => {
        //@todo get that whole from/to - period thing sorted

        const query = `
            mutation {
              ArtistAdd(values: {
                    name: "New Artist", 
                    aka: ["new", "artist"],
                    description: "New Description",
                    periods: [{from: "2001-01-01", to: "2001-01-01"}],
                    genres: ["pop/rock", "rock"]
                }, type: person) {
                __typename
                ... on Person {
                  name
                  aka
                  description
                  genres {type style}
                  # periods {from to}
                }
              }
            }
        `;

        //Database is empty
        expect(database._data.__collection__).toBeUndefined();

        //
        const expected: {data: {ArtistAdd: GraphQLTypes.Artist}} = {
            data: {
                ArtistAdd: {
                    __typename: 'Person',
                    name: 'New Artist',
                    aka: ['new', 'artist'],
                    description: 'New Description',
                    genres: [{type: 'pop', style: 'rock'}, {type: 'rock', style: null}],
                    // periods: [{from: '2001-01-01', to: '2001-01-01'}],
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database: database.firestore()});
        expect(actual).toEqual(expected);

        //Database has an object in it
        expect(database._data.__collection__.artists.__doc__).toBeInstanceOf(Object);
    })
});


