import { graphql } from 'graphql';
import schema from '../../schema';
import {Database, Snapshot} from '../../utils/database'

describe('ArtistSingle', () => {
    let database = undefined;

    beforeEach(() => {
        database = new Database({
            '/artists/1': new Snapshot('1', {
                name: 'artist #1',
                aka: ['artist', '#1'],
                description: 'artist\'s description',
                genres: ['pop/rock'],
                from: '2001-01-01',
                to: '2010-01-01',
                __contentType: 'artist/group',
                __ref: [{
                    __contentType: 'collection/album',
                    _id: new Snapshot('1', {name: 'album #1'})
                },{
                    __contentType: 'collection/album',
                    _id: new Snapshot('2', {}, false)
                },{
                    __contentType: 'collection/album+single',
                    _id: new Snapshot('3', {name: 'single #3'})
                },{
                    __contentType: 'collection/album+single',
                    _id: new Snapshot('4', {}, false)
                },{
                    __contentType: 'collection/album+ep',
                    _id: new Snapshot('5', {name: 'ep #5'})
                },{
                    __contentType: 'collection/album+ep',
                    _id: new Snapshot('6', {}, false)
                },{
                    __contentType: 'collection/album+compilation',
                    _id: new Snapshot('7', {name: 'compilation #7'})
                },{
                    __contentType: 'collection/album+compilation',
                    _id: new Snapshot('8', {}, false)
                },{
                    __contentType: 'artist/person+member',
                    periods: [],
                    _id: new Snapshot('9', {name: 'member #1'})
                },{
                    __contentType: 'artist/group+member',
                    periods: [],
                    _id: new Snapshot('10', {name: 'group member #10'})
                },{
                    __contentType: 'image/avatar',
                    _id: new Snapshot('11', {name: 'avatar #11'})
                },{
                    __contentType: 'image/avatar',
                    _id: new Snapshot('12', {name: 'avatar #12'})
                },{
                    __contentType: 'image/hero',
                    _id: new Snapshot('13', {name: 'avatar #13'})
                },{
                    __contentType: 'image/hero',
                    _id: new Snapshot('14', {name: 'avatar #14'})
                }]
            }),
        });
    });

    afterEach(() => {
        database = undefined;
    });

    test('artist found', async () => {
        const query = `
            query get_artist {
              Artist (id: "1") {
                __typename
                ... on Group {
                    name
                    aka
                    description
                    genres {type style}
                    periods {from to}
                    albums {name}
                    eps {name}
                    singles {name}
                    compilations {name}
                    members {
                        periods {from to}
                        artist {name}
                    }
                    avatar {name}
                    hero {name}
                }
              }
            }
        `;

        const expected = {
            data: {
                Artist: {
                    __typename: 'Group',
                    name: 'artist #1',
                    aka: ['artist', '#1'],
                    description: 'artist\'s description',
                    genres: [{type: 'pop', style: 'rock'}],
                    periods: [{from: '2001-01-01', to: '2010-01-01'}],
                    albums: [{
                        name: 'album #1'
                    }],
                    eps: [{
                        name: 'ep #5'
                    }],
                    singles: [{
                        name: 'single #3'
                    }],
                    compilations: [{
                        name: 'compilation #7'
                    }],
                    members: [{
                        periods: [],
                        artist: {name: 'member #1'}
                    }],
                    avatar: {name: 'avatar #12'},
                    hero: {name: 'avatar #14'},
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database});
        expect(actual).toEqual(expected);
        expect(actual.errors).toBeUndefined();
    });

    test('artist not found', async () => {
        const query = `
            query get_artist {
              Artist (id: "10000") {
                __typename
                ... on Group {
                    name
                    aka
                    description
                    genres {type style}
                    periods {from to}
                }
              }
            }
        `;

        const expected = {
            data: {
                Artist: null
            }
        };
        const actual = await graphql(schema, query, {}, {database});
        expect(actual).toEqual(expected);
        expect(actual.errors).toBeUndefined();
    });
});


