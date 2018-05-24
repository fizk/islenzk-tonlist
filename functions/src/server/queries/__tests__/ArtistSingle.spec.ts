import { graphql } from 'graphql';
import schema from '../../schema';
import {Database, Snapshot} from '../../utils/database'
import {DatabaseTypes} from "../../../@types";

describe('ArtistSingle', () => {
    let database = undefined;
    //
    beforeEach(() => {
    //     database = new Database({
    //         '/artists/1': new Snapshot<DatabaseTypes.Artist>({
    //             _id: '1',
    //             __contentType: 'artist/group',
    //             name: 'artist #1',
    //             aka: ['artist', '#1'],
    //             description: 'artist\'s description',
    //             genres: ['pop/rock'],
    //             from: new Date('2001-01-01'),
    //             to: new Date('2010-01-01'),
    //             __ref: [
    //                 {
    //                     __uuid: '123e4567-e89b-12d3-a456-426655440000',
    //                     __contentType: 'collection/album',
    //                     _id: new Snapshot<DatabaseTypes.Collection>({
    //                         name: 'album #1', _id: '1', __contentType: "collection/album", __ref: []
    //                     })
    //                 },{
    //                     __uuid: '123e4567-e89b-12d3-a456-426655440000',
    //                     __contentType: 'collection/album',
    //                     _id: new Snapshot<DatabaseTypes.Collection>({
    //                         name: 'album #2', _id: '2', __contentType: "collection/album", __ref: []
    //                     }, false)
    //                 },{
    //                     __uuid: '123e4567-e89b-12d3-a456-426655440000',
    //                     __contentType: 'collection/album+single',
    //                     _id: new Snapshot<DatabaseTypes.Collection>({
    //                         name: 'single #3', _id: '3', __contentType: "collection/album+single", __ref: []
    //                     })
    //                 },{
    //                     __uuid: '123e4567-e89b-12d3-a456-426655440000',
    //                     __contentType: 'collection/album+single',
    //                     _id: new Snapshot<DatabaseTypes.Collection>({
    //                         name: 'single #4', _id: '4', __contentType: "collection/album+single", __ref: []
    //                     }, false)
    //                 },{
    //                     __uuid: '123e4567-e89b-12d3-a456-426655440000',
    //                     __contentType: 'collection/album+ep',
    //                     _id: new Snapshot<DatabaseTypes.Collection>({
    //                         name: 'ep #5', _id: '5', __contentType: "collection/album+ep", __ref: []
    //                     })
    //                 },{
    //                     __uuid: '123e4567-e89b-12d3-a456-426655440000',
    //                     __contentType: 'collection/album+ep',
    //                     _id: new Snapshot<DatabaseTypes.Collection>({
    //                         name: 'ep #6', _id: '6', __contentType: "collection/album+ep", __ref: []
    //                     }, false)
    //                 },{
    //                     __uuid: '123e4567-e89b-12d3-a456-426655440000',
    //                     __contentType: 'collection/album+compilation',
    //                     _id: new Snapshot<DatabaseTypes.Collection>({
    //                         name: 'compilation #7', _id: '7', __contentType: "collection/album+compilation", __ref: []
    //                     })
    //                 },{
    //                     __uuid: '123e4567-e89b-12d3-a456-426655440000',
    //                     __contentType: 'collection/album+compilation',
    //                     _id: new Snapshot<DatabaseTypes.Collection>({
    //                         name: 'compilation #8', _id: '8', __contentType: "collection/album+compilation", __ref: []
    //                     }, false)
    //                 },{
    //                     __uuid: '123e4567-e89b-12d3-a456-426655440000',
    //                     __contentType: 'artist/person+member',
    //                     periods: [],
    //                     _id: new Snapshot<DatabaseTypes.Artist>({
    //                         name: 'member #1', _id: '9', __contentType: 'artist/person+member', __ref: []
    //                     })
    //                 },{
    //                     __uuid: '123e4567-e89b-12d3-a456-426655440000',
    //                     __contentType: 'artist/group+member',
    //                     periods: [],
    //                     _id: new Snapshot<DatabaseTypes.Artist>({
    //                         name: 'member #2', _id: '10', __contentType: "artist/person+member", __ref: []
    //                     }, false)
    //                 },{
    //                     __uuid: '123e4567-e89b-12d3-a456-426655440000',
    //                     __contentType: 'image/avatar',
    //                     _id: new Snapshot<DatabaseTypes.Image>({
    //                         name: 'avatar #11', _id: '11', __contentType: "image/avatar", __ref: []
    //                     })
    //                 },{
    //                     __uuid: '123e4567-e89b-12d3-a456-426655440000',
    //                     __contentType: 'image/avatar',
    //                     _id: new Snapshot<DatabaseTypes.Image>({
    //                         name: 'avatar #12', _id: '12', __contentType: "image/avatar", __ref: []
    //                     })
    //                 },{
    //                     __uuid: '123e4567-e89b-12d3-a456-426655440000',
    //                     __contentType: 'image/hero',
    //                     _id: new Snapshot<DatabaseTypes.Image>({
    //                         name: 'hero #13', _id: '13', __contentType: "image/hero", __ref: []
    //                     })
    //                 },{
    //                     __uuid: '123e4567-e89b-12d3-a456-426655440000',
    //                     __contentType: 'image/hero',
    //                     _id: new Snapshot<DatabaseTypes.Image>({
    //                         name: 'hero #14', _id: '14', __contentType: "image/hero", __ref: []
    //                     })
    //                 }
    //             ]
    //         }),
    //     });
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
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database});
        expect(actual).toEqual(expected);
        expect(actual.errors).toBeUndefined();
    });

    test('artist albums/eps/singles/compilations', async () => {
        const query = `
            query get_artist {
              Artist (id: "1") {
                __typename
                ... on Group {
                    name
                    albums {name}
                    eps {name}
                    singles {name}
                    compilations {name}
                }
              }
            }
        `;

        const expected = {
            data: {
                Artist: {
                    __typename: 'Group',
                    name: 'artist #1',
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
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database});
        expect(actual).toEqual(expected);
        expect(actual.errors).toBeUndefined();
    });

    test('artist images', async () => {
        const query = `
            query get_artist {
              Artist (id: "1") {
                __typename
                ... on Group {
                    name
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
                    avatar: {name: 'avatar #12'},
                    hero: {name: 'hero #14'},
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


