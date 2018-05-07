import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MemberTimeLine from '../../src/client/elements/MemberTimeLine';
import '../../src/client/components/App/_index.scss';

const albums =  [
    {
        _id: '',
        name: 'Please Please Me',
        aka: [],
        description: '',
        releaseDates: '1963-03-22',
        contentType: {type: '', subtype: '', attribute: ''},
        hero: null,
        avatar: null,
        genres: [],
        publications: [],
        songs: [],
        artists: []
    },
    {
        _id: '',
        name: 'With the beatles',
        aka: [],
        description: '',
        releaseDates: '1963-11-22',
        contentType: {type: '', subtype: '', attribute: ''},
        hero: null,
        avatar: null,
        genres: [],
        publications: [],
        songs: [],
        artists: []
    },
    {
        _id: '',
        name: 'A Hard Day\'s Night',
        aka: [],
        description: '',
        releaseDates: '1964-07-10',
        contentType: {type: '', subtype: '', attribute: ''},
        hero: null,
        avatar: null,
        genres: [],
        publications: [],
        songs: [],
        artists: []
    },
    {
        _id: '',
        name: 'Beatles for sale',
        aka: [],
        description: '',
        releaseDates: '1964-12-04',
        contentType: {type: '', subtype: '', attribute: ''},
        hero: null,
        avatar: null,
        genres: [],
        publications: [],
        songs: [],
        artists: []
    },
    {
        _id: '',
        name: 'Help!',
        aka: [],
        description: '',
        releaseDates: '1965-08-06',
        contentType: {type: '', subtype: '', attribute: ''},
        hero: null,
        avatar: null,
        genres: [],
        publications: [],
        songs: [],
        artists: []
    },
    {
        _id: '',
        name: 'Rubber Soul',
        aka: [],
        description: '',
        releaseDates: '1965-12-03',
        contentType: {type: '', subtype: '', attribute: ''},
        hero: null,
        avatar: null,
        genres: [],
        publications: [],
        songs: [],
        artists: []
    },
    {
        _id: '',
        name: 'Revolver',
        aka: [],
        description: '',
        releaseDates: '1966-10-05',
        contentType: {type: '', subtype: '', attribute: ''},
        hero: null,
        avatar: null,
        genres: [],
        publications: [],
        songs: [],
        artists: []
    },
    {
        _id: '',
        name: 'Sgt. Pepper\'s Lonely Hearts Club Band',
        aka: [],
        description: '',
        releaseDates: '1967-05-26',
        contentType: {type: '', subtype: '', attribute: ''},
        hero: null,
        avatar: null,
        genres: [],
        publications: [],
        songs: [],
        artists: []
    },
    {
        _id: '',
        name: 'The Beatles',
        aka: ['The White Album'],
        description: '',
        releaseDates: '1968-11-22',
        contentType: {type: '', subtype: '', attribute: ''},
        hero: null,
        avatar: null,
        genres: [],
        publications: [],
        songs: [],
        artists: []
    },
    {
        _id: '',
        name: 'Yellow Submarine',
        aka: [],
        description: '',
        releaseDates: '1969-01-13',
        contentType: {type: '', subtype: '', attribute: ''},
        hero: null,
        avatar: null,
        genres: [],
        publications: [],
        songs: [],
        artists: []
    },
    {
        _id: '',
        name: 'Abbey Road',
        aka: [],
        description: '',
        releaseDates: '1969-11-26',
        contentType: {type: '', subtype: '', attribute: ''},
        hero: null,
        avatar: null,
        genres: [],
        publications: [],
        songs: [],
        artists: []
    },
    {
        _id: '',
        name: 'Let It Be',
        aka: [],
        description: '',
        releaseDates: '1970-05-08',
        contentType: {type: '', subtype: '', attribute: ''},
        hero: null,
        avatar: null,
        genres: [],
        publications: [],
        songs: [],
        artists: []
    }
];

const members = [
    {
        periods: [
            {from: '1960-01-01', to: '1970-01-01'}
        ],
        artist : {
            _id: '1',
            name: 'John Lennon',
            aka: [],
            description: '',
            periods: [],
            genres: [],
            contentType: {type: '', subtype: '', attribute: ''},
            albums: [],
            compilations: [],
            eps: [],
            singles: [],
            association: [],
            hero: null,
            avatar: null,
            members: []
        }
    },
    {
        periods: [
            {from: '1960-01-01', to: '1970-01-01'},
        ],
        artist : {
            _id: '2',
            name: 'Paul McCartney',
            aka: [],
            description: '',
            periods: [],
            genres: [],
            contentType: {type: '', subtype: '', attribute: ''},
            albums: [],
            compilations: [],
            eps: [],
            singles: [],
            association: [],
            hero: null,
            avatar: null,
            members: []
        }
    },
    {
        periods: [
            {from: '1960-01-01', to: '1970-01-01'},
        ],
        artist : {
            _id: '3',
            name: 'George Harrison',
            aka: [],
            description: '',
            periods: [],
            genres: [],
            contentType: {type: '', subtype: '', attribute: ''},
            albums: [],
            compilations: [],
            eps: [],
            singles: [],
            association: [],
            hero: null,
            avatar: null,
            members: []
        }
    },
    {
        periods: [
            {from: '1962-01-01', to: '1970-01-01'},
        ],
        artist : {
            _id: '4',
            name: 'Ringo Starr',
            aka: [],
            description: '',
            periods: [],
            genres: [],
            contentType: {type: '', subtype: '', attribute: ''},
            albums: [],
            compilations: [],
            eps: [],
            singles: [],
            association: [],
            hero: null,
            avatar: null,
            members: []
        }
    },
    {
        periods: [
            {from: '1960-01-01', to: '1961-12-31'},
        ],
        artist : {
            _id: '5',
            name: 'Pete Best',
            aka: [],
            description: '',
            periods: [],
            genres: [],
            contentType: {type: '', subtype: '', attribute: ''},
            albums: [],
            compilations: [],
            eps: [],
            singles: [],
            association: [],
            hero: null,
            avatar: null,
            members: []
        }
    },
    {
        periods: [
            {from: '1960-01-01', to: '1961-01-31'},
        ],
        artist : {
            _id: '6',
            name: 'Stuart Sutcliffe',
            aka: [],
            description: '',
            periods: [],
            genres: [],
            contentType: {type: '', subtype: '', attribute: ''},
            albums: [],
            compilations: [],
            eps: [],
            singles: [],
            association: [],
            hero: null,
            avatar: null,
            members: []
        }
    }
];

storiesOf('Elements/MemberTimeLine', module)
    .add('Empty', () => (
        <MemberTimeLine artists={members} albums={albums} />
    ))
;
