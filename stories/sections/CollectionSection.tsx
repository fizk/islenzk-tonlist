import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {BrowserRouter as Router} from 'react-router-dom';
import CollectionSection from '../../src/client/sections/CollectionSection/CollectionSection';
import {CollectionType} from "../../@types";
import '../../src/client/components/App/_index.scss';

const standardArtist: CollectionType & {__typename: string} = {
    __typename: 'Group',
    _id: '1',
    name: 'Please, please me',
    aka: ['The first album'],
    description: 'This is the first album',
    releaseDates: '1963-01-01',
    contentType: {type: 'pop', subtype: 'rock', attribute: ''},
    avatar: {
        url: '/images/avatar1.jpg',
        base64: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABLAAD/4QMbaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk3RERGNkZFNERGNjExRTg5RkQ4ODVEMzQxNDUwNUVDIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk3RERGNkZENERGNjExRTg5RkQ4ODVEMzQxNDUwNUVDIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9IjgwMzM4MTcwMjAwQ0Q2QTlENUREMDQ3MzM0OEU5QzI4IiBzdFJlZjpkb2N1bWVudElEPSI4MDMzODE3MDIwMENENkE5RDVERDA0NzMzNDhFOUMyOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAMCAgICAgMCAgMFAwMDBQUEAwMEBQYFBQUFBQYIBgcHBwcGCAgJCgoKCQgMDAwMDAwODg4ODhAQEBAQEBAQEBABAwQEBgYGDAgIDBIODA4SFBAQEBAUERAQEBAQEREQEBAQEBAREBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/AABEIABYAFgMBEQACEQEDEQH/xAB2AAEBAQAAAAAAAAAAAAAAAAAHBAgBAQADAQAAAAAAAAAAAAAAAAUCBAYDEAABAwMDAwIEBwAAAAAAAAACAQMEEQUGABIHITETFAhBUXEVIjJCUjQWGBEAAQMEAgMBAAAAAAAAAAAAAQAREiFhAgNBIjETBKH/2gAMAwEAAhEDEQA/AM48+Xm4YDilttVoccbuuTyTjNG2ao+MZqnk8a1qhOEYhu+FV1zJYKeIcpUwP2K+vwBm93fMH7flTbJSbdDgo2kOJO2ooAbxFvcWtBJap1XpobL68ncCn6mR8Y8E1R65kNxTjdnPUjqtyJgmCibl2pckfWFt+VPPTTMxGSHgZRUHumnNR/cpjVtdaCVAxCLbUkQz6Ab04zkmCqnZaGKar7z0IHKsfMO4N1ojDLVxY9InwW7C+mJMlBnFAcefR4blEA3TdMvyrt3V3KdFROugScvPK0sBGyJfWWdOAkzP04/a1vJXLwb/AMPp/wCwi9s3/t2p307E+huWWbkPe90DcmS+WXuYMnuGfwWGMjO7tP3q1q42TLZqoE3HRxFUFbRnaIki7ada6lsGDFzwoajnSIStzJAurXFhyuIbld3sOemAeXQxGckdhtQ3C2quMjVpHOhqJKPb9Oi9DS7M7US++cQzs9Ve83H/AMKxxF1P4JKZKi08/wByrREp23UT6aZpGyErO6//2Q=='
    },
    hero: {
        url: '/images/avatar1.jpg',
        base64: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABLAAD/4QMbaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk3RERGNkZFNERGNjExRTg5RkQ4ODVEMzQxNDUwNUVDIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk3RERGNkZENERGNjExRTg5RkQ4ODVEMzQxNDUwNUVDIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9IjgwMzM4MTcwMjAwQ0Q2QTlENUREMDQ3MzM0OEU5QzI4IiBzdFJlZjpkb2N1bWVudElEPSI4MDMzODE3MDIwMENENkE5RDVERDA0NzMzNDhFOUMyOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAMCAgICAgMCAgMFAwMDBQUEAwMEBQYFBQUFBQYIBgcHBwcGCAgJCgoKCQgMDAwMDAwODg4ODhAQEBAQEBAQEBABAwQEBgYGDAgIDBIODA4SFBAQEBAUERAQEBAQEREQEBAQEBAREBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/AABEIABYAFgMBEQACEQEDEQH/xAB2AAEBAQAAAAAAAAAAAAAAAAAHBAgBAQADAQAAAAAAAAAAAAAAAAUCBAYDEAABAwMDAwIEBwAAAAAAAAACAQMEEQUGABIHITETFAhBUXEVIjJCUjQWGBEAAQMEAgMBAAAAAAAAAAAAAQAREiFhAgNBIjETBKH/2gAMAwEAAhEDEQA/AM48+Xm4YDilttVoccbuuTyTjNG2ao+MZqnk8a1qhOEYhu+FV1zJYKeIcpUwP2K+vwBm93fMH7flTbJSbdDgo2kOJO2ooAbxFvcWtBJap1XpobL68ncCn6mR8Y8E1R65kNxTjdnPUjqtyJgmCibl2pckfWFt+VPPTTMxGSHgZRUHumnNR/cpjVtdaCVAxCLbUkQz6Ab04zkmCqnZaGKar7z0IHKsfMO4N1ojDLVxY9InwW7C+mJMlBnFAcefR4blEA3TdMvyrt3V3KdFROugScvPK0sBGyJfWWdOAkzP04/a1vJXLwb/AMPp/wCwi9s3/t2p307E+huWWbkPe90DcmS+WXuYMnuGfwWGMjO7tP3q1q42TLZqoE3HRxFUFbRnaIki7ada6lsGDFzwoajnSIStzJAurXFhyuIbld3sOemAeXQxGckdhtQ3C2quMjVpHOhqJKPb9Oi9DS7M7US++cQzs9Ve83H/AMKxxF1P4JKZKi08/wByrREp23UT6aZpGyErO6//2Q=='
    },
    genres: [],
    artists: [],
    publications: [],
    songs: [
        {
            position: 1,
            song: {
                _id: '2',
                name: 'I saw here standing there',
                description: '',
                duration: 12345,
                genres: [],
                appearsOn: [],
                hero: null,
                avatar: null,
            }
        }
    ],
};

storiesOf('Sections/CollectionSection', module)
    .add('Empty', () => (
        <CollectionSection loading={false} album={undefined} />
    ))

    .add('Standard', () => (
        <Router location={''}>
            <CollectionSection loading={false} album={standardArtist} />
        </Router>
    ))
;
