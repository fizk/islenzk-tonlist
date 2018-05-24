import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {BrowserRouter as Router} from 'react-router-dom';
import ArtistSection from '../../src/client/sections/ArtistSection/ArtistSection';
import {ArtistType} from "../../@types";
import '../../src/client/components/App/_index.scss';

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
    avatar: {
        url: '/images/avatar1.jpg',
        base64: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABLAAD/4QMbaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk3RERGNkZFNERGNjExRTg5RkQ4ODVEMzQxNDUwNUVDIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk3RERGNkZENERGNjExRTg5RkQ4ODVEMzQxNDUwNUVDIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9IjgwMzM4MTcwMjAwQ0Q2QTlENUREMDQ3MzM0OEU5QzI4IiBzdFJlZjpkb2N1bWVudElEPSI4MDMzODE3MDIwMENENkE5RDVERDA0NzMzNDhFOUMyOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAMCAgICAgMCAgMFAwMDBQUEAwMEBQYFBQUFBQYIBgcHBwcGCAgJCgoKCQgMDAwMDAwODg4ODhAQEBAQEBAQEBABAwQEBgYGDAgIDBIODA4SFBAQEBAUERAQEBAQEREQEBAQEBAREBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/AABEIABYAFgMBEQACEQEDEQH/xAB2AAEBAQAAAAAAAAAAAAAAAAAHBAgBAQADAQAAAAAAAAAAAAAAAAUCBAYDEAABAwMDAwIEBwAAAAAAAAACAQMEEQUGABIHITETFAhBUXEVIjJCUjQWGBEAAQMEAgMBAAAAAAAAAAAAAQAREiFhAgNBIjETBKH/2gAMAwEAAhEDEQA/AM48+Xm4YDilttVoccbuuTyTjNG2ao+MZqnk8a1qhOEYhu+FV1zJYKeIcpUwP2K+vwBm93fMH7flTbJSbdDgo2kOJO2ooAbxFvcWtBJap1XpobL68ncCn6mR8Y8E1R65kNxTjdnPUjqtyJgmCibl2pckfWFt+VPPTTMxGSHgZRUHumnNR/cpjVtdaCVAxCLbUkQz6Ab04zkmCqnZaGKar7z0IHKsfMO4N1ojDLVxY9InwW7C+mJMlBnFAcefR4blEA3TdMvyrt3V3KdFROugScvPK0sBGyJfWWdOAkzP04/a1vJXLwb/AMPp/wCwi9s3/t2p307E+huWWbkPe90DcmS+WXuYMnuGfwWGMjO7tP3q1q42TLZqoE3HRxFUFbRnaIki7ada6lsGDFzwoajnSIStzJAurXFhyuIbld3sOemAeXQxGckdhtQ3C2quMjVpHOhqJKPb9Oi9DS7M7US++cQzs9Ve83H/AMKxxF1P4JKZKi08/wByrREp23UT6aZpGyErO6//2Q=='
    },
    hero: {
        url: '/images/avatar1.jpg',
        base64: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABLAAD/4QMbaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk3RERGNkZFNERGNjExRTg5RkQ4ODVEMzQxNDUwNUVDIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk3RERGNkZENERGNjExRTg5RkQ4ODVEMzQxNDUwNUVDIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9IjgwMzM4MTcwMjAwQ0Q2QTlENUREMDQ3MzM0OEU5QzI4IiBzdFJlZjpkb2N1bWVudElEPSI4MDMzODE3MDIwMENENkE5RDVERDA0NzMzNDhFOUMyOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAMCAgICAgMCAgMFAwMDBQUEAwMEBQYFBQUFBQYIBgcHBwcGCAgJCgoKCQgMDAwMDAwODg4ODhAQEBAQEBAQEBABAwQEBgYGDAgIDBIODA4SFBAQEBAUERAQEBAQEREQEBAQEBAREBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/AABEIABYAFgMBEQACEQEDEQH/xAB2AAEBAQAAAAAAAAAAAAAAAAAHBAgBAQADAQAAAAAAAAAAAAAAAAUCBAYDEAABAwMDAwIEBwAAAAAAAAACAQMEEQUGABIHITETFAhBUXEVIjJCUjQWGBEAAQMEAgMBAAAAAAAAAAAAAQAREiFhAgNBIjETBKH/2gAMAwEAAhEDEQA/AM48+Xm4YDilttVoccbuuTyTjNG2ao+MZqnk8a1qhOEYhu+FV1zJYKeIcpUwP2K+vwBm93fMH7flTbJSbdDgo2kOJO2ooAbxFvcWtBJap1XpobL68ncCn6mR8Y8E1R65kNxTjdnPUjqtyJgmCibl2pckfWFt+VPPTTMxGSHgZRUHumnNR/cpjVtdaCVAxCLbUkQz6Ab04zkmCqnZaGKar7z0IHKsfMO4N1ojDLVxY9InwW7C+mJMlBnFAcefR4blEA3TdMvyrt3V3KdFROugScvPK0sBGyJfWWdOAkzP04/a1vJXLwb/AMPp/wCwi9s3/t2p307E+huWWbkPe90DcmS+WXuYMnuGfwWGMjO7tP3q1q42TLZqoE3HRxFUFbRnaIki7ada6lsGDFzwoajnSIStzJAurXFhyuIbld3sOemAeXQxGckdhtQ3C2quMjVpHOhqJKPb9Oi9DS7M7US++cQzs9Ve83H/AMKxxF1P4JKZKi08/wByrREp23UT6aZpGyErO6//2Q=='
    },
};

storiesOf('Sections/ArtistSection', module)
    .add('Empty', () => (
        <ArtistSection id={''} loading={false} artist={undefined} />
    ))
    .add('Standard', () => (
        <Router location={''}>
            <ArtistSection id={''} loading={false} artist={standardArtist} />
        </Router>
    ))
;
