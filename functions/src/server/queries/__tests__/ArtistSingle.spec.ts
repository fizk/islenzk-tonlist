import { graphql } from 'graphql';
import schema from '../../schema';
import MockFirebase from 'mock-cloud-firestore';

describe('ArtistSingle', () => {
    let database = undefined;

    beforeEach(() => {
        database = new MockFirebase({
            __collection__: {
                collections: {
                    __doc__: {
                        1: {
                            name: 'album #1',
                            __contentType: "collection/album",
                            __ref: []
                        },
                        2: {
                            __isDirty__: true,
                            __isDeleted__: true
                        },
                        3:{
                            name: 'single #3',
                            __contentType: "collection/album+single",
                            __ref: []
                        },
                        4: {
                            __isDirty__: true,
                            __isDeleted__: true
                        },
                        5: {
                            name: 'ep #5',
                            __contentType: "collection/album+ep",
                            __ref: []
                        },
                        6: {
                            __isDirty__: true,
                            __isDeleted__: true
                        },
                        7: {
                            name: 'compilation #7',
                            __contentType: "collection/album+compilation",
                            __ref: []
                        },
                        8: {
                            __isDirty__: true,
                            __isDeleted__: true
                        },
                        10: {
                            __isDirty__: true,
                            __isDeleted__: true
                        },
                    },
                },
                images: {
                    __doc__: {
                        11: {
                            name: 'avatar #11',
                            __contentType: "image/avatar",
                            __ref: []
                        },
                        12: {
                            name: 'avatar #12',
                            __contentType: "image/avatar",
                            __ref: []
                        },
                        13: {
                            name: 'hero #13',
                            __contentType: "image/hero",
                            __ref: []
                        },
                        14: {
                            name: 'hero #14',
                            __contentType: "image/hero",
                            __ref: []
                        }
                    },
                },
                artists: {
                    __doc__: {
                        1: {
                            __contentType: 'artist/group',
                            name: 'artist #1',
                            aka: ['artist', '#1'],
                            description: 'artist\'s description',
                            genres: ['pop/rock'],
                            from: new Date('2001-01-01'),
                            to: new Date('2010-01-01'),
                            __ref: [
                                {
                                    __uuid: '123e4567-e89b-12d3-a456-426655440000',
                                    __contentType: 'collection/album',
                                    _id: '__ref__:collections/1'
                                },{
                                    __uuid: '123e4567-e89b-12d3-a456-426655440000',
                                    __contentType: 'collection/album',
                                    _id: '__ref__:collections/2'
                                },{
                                    __uuid: '123e4567-e89b-12d3-a456-426655440000',
                                    __contentType: 'collection/album+single',
                                    _id: '__ref__:collections/3'
                                },{
                                    __uuid: '123e4567-e89b-12d3-a456-426655440000',
                                    __contentType: 'collection/album+single',
                                    _id: '__ref__:collections/4'
                                },{
                                    __uuid: '123e4567-e89b-12d3-a456-426655440000',
                                    __contentType: 'collection/album+ep',
                                    _id: '__ref__:collections/5'
                                },{
                                    __uuid: '123e4567-e89b-12d3-a456-426655440000',
                                    __contentType: 'collection/album+ep',
                                    _id: '__ref__:collections/6'
                                },{
                                    __uuid: '123e4567-e89b-12d3-a456-426655440000',
                                    __contentType: 'collection/album+compilation',
                                    _id: '__ref__:collections/7'
                                },{
                                    __uuid: '123e4567-e89b-12d3-a456-426655440000',
                                    __contentType: 'collection/album+compilation',
                                    _id: '__ref__:collections/8'
                                },{
                                    __uuid: '123e4567-e89b-12d3-a456-426655440000',
                                    __contentType: 'artist/person+member',
                                    periods: [],
                                    _id: '__ref__:artists/9'
                                },{
                                    __uuid: '123e4567-e89b-12d3-a456-426655440000',
                                    __contentType: 'artist/group+member',
                                    periods: [],
                                    _id: '__ref__:artists/10'
                                },{
                                    __uuid: '123e4567-e89b-12d3-a456-426655440000',
                                    __contentType: 'image/avatar',
                                    _id: '__ref__:images/11'
                                },{
                                    __uuid: '123e4567-e89b-12d3-a456-426655440000',
                                    __contentType: 'image/avatar',
                                    _id: '__ref__:images/12'
                                },{
                                    __uuid: '123e4567-e89b-12d3-a456-426655440000',
                                    __contentType: 'image/hero',
                                    _id: '__ref__:images/13'
                                },{
                                    __uuid: '123e4567-e89b-12d3-a456-426655440000',
                                    __contentType: 'image/hero',
                                    _id: '__ref__:images/14'
                                }
                            ]
                        },
                        9: {
                            name: 'member #1',
                            __contentType: 'artist/person+member',
                            __ref: []
                        },
                    },
                }
            }
        });

    });

    afterEach(() => {
        database = undefined;
    });

    test('artist found', async () => {
        // const query = `
        //     query get_artist {
        //       Artist (id: "1") {
        //         __typename
        //         ... on Group {
        //             name
        //             aka
        //             description
        //             genres {type style}
        //             # periods {from to}
        //         }
        //       }
        //     }
        // `;
        //
        // const expected = {
        //     data: {
        //         Artist: {
        //             __typename: 'Group',
        //             name: 'artist #1',
        //             aka: ['artist', '#1'],
        //             description: 'artist\'s description',
        //             genres: [{type: 'pop', style: 'rock'}],
        //             // periods: [{from: '2001-01-01', to: '2010-01-01'}],
        //         }
        //     }
        // };
        // const actual = await graphql(schema, query, {}, {database: database.firestore()});
        // expect(actual).toEqual(expected);
        // expect(actual.errors).toBeUndefined();
    });

    test('artist albums/eps/singles/compilations', async () => {
        // const query = `
        //     query get_artist {
        //       Artist (id: "1") {
        //         __typename
        //         ... on Group {
        //             name
        //             albums {uuid collection{name}}
        //             eps {uuid collection{name}}
        //             singles {uuid collection{name}}
        //             compilations {uuid collection{name}}
        //         }
        //       }
        //     }
        // `;
        //
        // const expected = {
        //     data: {
        //         Artist: {
        //             __typename: 'Group',
        //             name: 'artist #1',
        //             albums: [{
        //                 uuid: '',
        //                 collection: {name: 'album #1'}
        //             }],
        //             eps: [{
        //                 uuid: '',
        //                 collection: {name: 'ep #5'}
        //             }],
        //             singles: [{
        //                 uuid: '',
        //                 collection: {name: 'single #3'}
        //             }],
        //             compilations: [{
        //                 uuid: '',
        //                 collection: {name: 'compilation #7'}
        //             }],
        //         }
        //     }
        // };
        // const actual = await graphql(schema, query, {}, {database: database.firestore()});
        // console.log(actual);
        // // expect(actual).toMatchShapeOf(expected);
        // // expect(actual.errors).toBeUndefined();
    });

    test('artist images', async () => {
        // const query = `
        //     query get_artist {
        //       Artist (id: "1") {
        //         __typename
        //         ... on Group {
        //             name
        //             avatar {name}
        //             hero {name}
        //         }
        //       }
        //     }
        // `;
        //
        // const expected = {
        //     data: {
        //         Artist: {
        //             __typename: 'Group',
        //             name: 'artist #1',
        //             avatar: {name: 'avatar #12'},
        //             hero: {name: 'hero #14'},
        //         }
        //     }
        // };
        // const actual = await graphql(schema, query, {}, {database: database.firestore()});
        // expect(actual).toEqual(expected);
        // expect(actual.errors).toBeUndefined();
    });

    test('artist not found', async () => {
        // const query = `
        //     query get_artist {
        //       Artist (id: "10000") {
        //         __typename
        //         ... on Group {
        //             name
        //             aka
        //             description
        //             genres {type style}
        //             periods {from to}
        //         }
        //       }
        //     }
        // `;
        //
        // const expected = {
        //     data: {
        //         Artist: null
        //     }
        // };
        // const actual = await graphql(schema, query, {}, {database: database.firestore()});
        // expect(actual).toEqual(expected);
        // expect(actual.errors).toBeUndefined();
    });
});


