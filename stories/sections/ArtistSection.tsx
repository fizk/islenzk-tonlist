import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {BrowserRouter as Router} from 'react-router-dom';
import ArtistSection from '../../src/client/sections/ArtistSection/ArtistSection';
import {ArtistType} from "../../@types";
import '../../src/client/components/App/_index.scss';

const emptyArtist: ArtistType & {__typename: string} = {
    __typename: 'Group',
    _id: '',
    name: '',
    aka: [],
    description: '',
    periods: [],
    genres: [],
    contentType: {
        type: '',
        subtype: '',
        attribute: ''
    },
    albums: [],
    compilations: [],
    eps: [],
    singles: [],
    association: [],
    members: [],
    avatar: null,
    hero: null,
};

const standardArtist: ArtistType & {__typename: string} = {
    __typename: 'Group',
    _id: '',
    name: 'The Beatles',
    aka: ['The Silver Beatles', 'Jonnie and the Moondogs'],
    description: 'Marshmallow croissant chocolate bar icing carrot cake candy tootsie roll icing cake. Cookie carrot cake apple pie I love. Candy canes pudding wafer ice cream chupa chups I love jelly-o.\n' +
    '\n' +
    '_Sweet roll caramels ice_ **cream brownie carrot** cake. Tiramisu I love bear claw powder muffin croissant danish. Sesame snaps jelly beans biscuit bonbon. Topping marshmallow lollipop bonbon croissant apple pie marshmallow.\n' +
    '\n' +
    '* List item 1\n' +
    '* List item 2\n' +
    '\n' +
    '\n' +
    'Pie bear claw chocolate cake apple pie. Jelly-o chocolate bar jelly-o cheesecake. Powder cookie carrot cake marshmallow. Powder icing icing icing tart.\n',
    periods: [
        {from: '1964-01-01', to: '1970-01-01'},
        {from: '1980-01-01', to: '2002-01-01'},
    ],
    genres: [
        {style: 'rock', type: 'pop'},
        {style: 'folk', type: 'country'},
    ],
    contentType: {
        type: 'artist',
        subtype: 'group',
        attribute: ''
    },
    albums: [
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
    ],
    compilations: [{
        _id: '',
        name: 'A Collection of Beatles Oldies',
        aka: [],
        description: '',
        releaseDates: '1966-12-10',
        contentType: {type: '', subtype: '', attribute: ''},
        hero: null,
        avatar: null,
        genres: [],
        publications: [],
        songs: [],
        artists: []
    }],
    eps: [],
    singles: [{
        _id: '',
        name: 'Sgt. peppers lonely heart\'s club band',
        aka: [],
        description: '',
        releaseDates: '1967-01-01',
        contentType: {type: '', subtype: '', attribute: ''},
        hero: null,
        avatar: null,
        genres: [],
        publications: [],
        songs: [],
        artists: []
    },{
        _id: '',
        name: 'The beatles',
        aka: ['The White album'],
        description: '',
        releaseDates: '1968-01-01',
        contentType: {type: '', subtype: '', attribute: ''},
        hero: null,
        avatar: null,
        genres: [],
        publications: [],
        songs: [],
        artists: []
    }],
    association: [],
    members: [
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
    ],
    avatar: null,
    hero: null,
};

storiesOf('Sections/ArtistSection', module)
    .add('Empty', () => (
        <ArtistSection id={''} loading={false} artist={emptyArtist} />
    ))
    .add('Standard', () => (
        <Router location={''}>
            <ArtistSection id={''} loading={false} artist={standardArtist} />
        </Router>
    ))
;
