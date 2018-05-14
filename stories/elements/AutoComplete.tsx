import * as React from 'react';
import {storiesOf, addDecorator} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import AutoComplete from '../../src/client/elements/AutoComplete/AutoComplete';
import AutoCompleteCollection from '../../src/client/elements/AutoComplete/AutoCompleteCollection';
import AutoCompleteArtist from '../../src/client/elements/AutoComplete/AutoCompleteArtist';
import {withKnobs, boolean} from '@storybook/addon-knobs/react';
import {ArtistType, CollectionType} from "../../@types";
import '../../src/client/components/App/_index.scss';

storiesOf('Elements/AutoComplete', module).addDecorator(withKnobs)

    .add('Collection', () => {
        const loading = boolean('loading', false);
        const collections: CollectionType[] = boolean('items', true)
            ? [
                {
                    _id: '0987',
                    name: 'Please, please me',
                    aka: [],
                    description: '',
                    releaseDates: '1964-01-01',
                    genres: [],
                    contentType: {type: '', attribute: '', subtype: ''},
                    hero: null,
                    avatar: {
                        url: '/images/avatar1.jpg',
                        base64: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABLAAD/4QMbaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk3RERGNkZFNERGNjExRTg5RkQ4ODVEMzQxNDUwNUVDIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk3RERGNkZENERGNjExRTg5RkQ4ODVEMzQxNDUwNUVDIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9IjgwMzM4MTcwMjAwQ0Q2QTlENUREMDQ3MzM0OEU5QzI4IiBzdFJlZjpkb2N1bWVudElEPSI4MDMzODE3MDIwMENENkE5RDVERDA0NzMzNDhFOUMyOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAMCAgICAgMCAgMFAwMDBQUEAwMEBQYFBQUFBQYIBgcHBwcGCAgJCgoKCQgMDAwMDAwODg4ODhAQEBAQEBAQEBABAwQEBgYGDAgIDBIODA4SFBAQEBAUERAQEBAQEREQEBAQEBAREBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/AABEIABYAFgMBEQACEQEDEQH/xAB2AAEBAQAAAAAAAAAAAAAAAAAHBAgBAQADAQAAAAAAAAAAAAAAAAUCBAYDEAABAwMDAwIEBwAAAAAAAAACAQMEEQUGABIHITETFAhBUXEVIjJCUjQWGBEAAQMEAgMBAAAAAAAAAAAAAQAREiFhAgNBIjETBKH/2gAMAwEAAhEDEQA/AM48+Xm4YDilttVoccbuuTyTjNG2ao+MZqnk8a1qhOEYhu+FV1zJYKeIcpUwP2K+vwBm93fMH7flTbJSbdDgo2kOJO2ooAbxFvcWtBJap1XpobL68ncCn6mR8Y8E1R65kNxTjdnPUjqtyJgmCibl2pckfWFt+VPPTTMxGSHgZRUHumnNR/cpjVtdaCVAxCLbUkQz6Ab04zkmCqnZaGKar7z0IHKsfMO4N1ojDLVxY9InwW7C+mJMlBnFAcefR4blEA3TdMvyrt3V3KdFROugScvPK0sBGyJfWWdOAkzP04/a1vJXLwb/AMPp/wCwi9s3/t2p307E+huWWbkPe90DcmS+WXuYMnuGfwWGMjO7tP3q1q42TLZqoE3HRxFUFbRnaIki7ada6lsGDFzwoajnSIStzJAurXFhyuIbld3sOemAeXQxGckdhtQ3C2quMjVpHOhqJKPb9Oi9DS7M7US++cQzs9Ve83H/AMKxxF1P4JKZKi08/wByrREp23UT6aZpGyErO6//2Q=='
                    },
                    artists: [],
                    songs: [],
                    publications: [],
                },
                {
                    _id: '9876',
                    name: 'With the Beatles',
                    aka: [],
                    description: '',
                    releaseDates: '1964-10-08',
                    genres: [],
                    contentType: {type: '', attribute: '', subtype: ''},
                    hero: null,
                    avatar: {
                        url: '/images/avatar1.jpg',
                        base64: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABLAAD/4QMbaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk3RERGNkZFNERGNjExRTg5RkQ4ODVEMzQxNDUwNUVDIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk3RERGNkZENERGNjExRTg5RkQ4ODVEMzQxNDUwNUVDIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9IjgwMzM4MTcwMjAwQ0Q2QTlENUREMDQ3MzM0OEU5QzI4IiBzdFJlZjpkb2N1bWVudElEPSI4MDMzODE3MDIwMENENkE5RDVERDA0NzMzNDhFOUMyOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAMCAgICAgMCAgMFAwMDBQUEAwMEBQYFBQUFBQYIBgcHBwcGCAgJCgoKCQgMDAwMDAwODg4ODhAQEBAQEBAQEBABAwQEBgYGDAgIDBIODA4SFBAQEBAUERAQEBAQEREQEBAQEBAREBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/AABEIABYAFgMBEQACEQEDEQH/xAB2AAEBAQAAAAAAAAAAAAAAAAAHBAgBAQADAQAAAAAAAAAAAAAAAAUCBAYDEAABAwMDAwIEBwAAAAAAAAACAQMEEQUGABIHITETFAhBUXEVIjJCUjQWGBEAAQMEAgMBAAAAAAAAAAAAAQAREiFhAgNBIjETBKH/2gAMAwEAAhEDEQA/AM48+Xm4YDilttVoccbuuTyTjNG2ao+MZqnk8a1qhOEYhu+FV1zJYKeIcpUwP2K+vwBm93fMH7flTbJSbdDgo2kOJO2ooAbxFvcWtBJap1XpobL68ncCn6mR8Y8E1R65kNxTjdnPUjqtyJgmCibl2pckfWFt+VPPTTMxGSHgZRUHumnNR/cpjVtdaCVAxCLbUkQz6Ab04zkmCqnZaGKar7z0IHKsfMO4N1ojDLVxY9InwW7C+mJMlBnFAcefR4blEA3TdMvyrt3V3KdFROugScvPK0sBGyJfWWdOAkzP04/a1vJXLwb/AMPp/wCwi9s3/t2p307E+huWWbkPe90DcmS+WXuYMnuGfwWGMjO7tP3q1q42TLZqoE3HRxFUFbRnaIki7ada6lsGDFzwoajnSIStzJAurXFhyuIbld3sOemAeXQxGckdhtQ3C2quMjVpHOhqJKPb9Oi9DS7M7US++cQzs9Ve83H/AMKxxF1P4JKZKi08/wByrREp23UT6aZpGyErO6//2Q=='
                    },
                    artists: [],
                    songs: [],
                    publications: [],
                },
                {
                    _id: '8765',
                    name: 'Beatles for sale',
                    aka: [],
                    description: '',
                    releaseDates: null,
                    genres: [],
                    contentType: {type: '', attribute: '', subtype: ''},
                    hero: null,
                    avatar: {
                        url: '/images/avatar1.jpg',
                        base64: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABLAAD/4QMbaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk3RERGNkZFNERGNjExRTg5RkQ4ODVEMzQxNDUwNUVDIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk3RERGNkZENERGNjExRTg5RkQ4ODVEMzQxNDUwNUVDIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9IjgwMzM4MTcwMjAwQ0Q2QTlENUREMDQ3MzM0OEU5QzI4IiBzdFJlZjpkb2N1bWVudElEPSI4MDMzODE3MDIwMENENkE5RDVERDA0NzMzNDhFOUMyOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAMCAgICAgMCAgMFAwMDBQUEAwMEBQYFBQUFBQYIBgcHBwcGCAgJCgoKCQgMDAwMDAwODg4ODhAQEBAQEBAQEBABAwQEBgYGDAgIDBIODA4SFBAQEBAUERAQEBAQEREQEBAQEBAREBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/AABEIABYAFgMBEQACEQEDEQH/xAB2AAEBAQAAAAAAAAAAAAAAAAAHBAgBAQADAQAAAAAAAAAAAAAAAAUCBAYDEAABAwMDAwIEBwAAAAAAAAACAQMEEQUGABIHITETFAhBUXEVIjJCUjQWGBEAAQMEAgMBAAAAAAAAAAAAAQAREiFhAgNBIjETBKH/2gAMAwEAAhEDEQA/AM48+Xm4YDilttVoccbuuTyTjNG2ao+MZqnk8a1qhOEYhu+FV1zJYKeIcpUwP2K+vwBm93fMH7flTbJSbdDgo2kOJO2ooAbxFvcWtBJap1XpobL68ncCn6mR8Y8E1R65kNxTjdnPUjqtyJgmCibl2pckfWFt+VPPTTMxGSHgZRUHumnNR/cpjVtdaCVAxCLbUkQz6Ab04zkmCqnZaGKar7z0IHKsfMO4N1ojDLVxY9InwW7C+mJMlBnFAcefR4blEA3TdMvyrt3V3KdFROugScvPK0sBGyJfWWdOAkzP04/a1vJXLwb/AMPp/wCwi9s3/t2p307E+huWWbkPe90DcmS+WXuYMnuGfwWGMjO7tP3q1q42TLZqoE3HRxFUFbRnaIki7ada6lsGDFzwoajnSIStzJAurXFhyuIbld3sOemAeXQxGckdhtQ3C2quMjVpHOhqJKPb9Oi9DS7M7US++cQzs9Ve83H/AMKxxF1P4JKZKi08/wByrREp23UT6aZpGyErO6//2Q=='
                    },
                    artists: [],
                    songs: [],
                    publications: [],
                },
              ]
            : [];

        return (
            <AutoComplete loading={loading} onSelect={action('onSelect')} onType={action('onType')}>
                {collections.map(item => (
                    <AutoCompleteCollection key={item._id} value={item} />
                ))}
            </AutoComplete>
        );
    })

    .add('Artist', () => {
        const loading = boolean('loading', false);
        const artists: ArtistType[] = boolean('items', true)
            ? [
                {

                    _id: '1234',
                    name: 'The Beatles',
                    aka: [],
                    description: '',
                    periods: [{from: '1959-01-01', to: '1970-01-01'}],
                    genres: [],
                    contentType: {type: '', attribute: '', subtype: ''},
                    albums: [],
                    compilations: [],
                    eps: [],
                    singles: [],
                    association: [],
                    members: [],
                    hero: null,
                    avatar: {
                        url: '/images/avatar1.jpg',
                        base64: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABLAAD/4QMbaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk3RERGNkZFNERGNjExRTg5RkQ4ODVEMzQxNDUwNUVDIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk3RERGNkZENERGNjExRTg5RkQ4ODVEMzQxNDUwNUVDIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9IjgwMzM4MTcwMjAwQ0Q2QTlENUREMDQ3MzM0OEU5QzI4IiBzdFJlZjpkb2N1bWVudElEPSI4MDMzODE3MDIwMENENkE5RDVERDA0NzMzNDhFOUMyOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAMCAgICAgMCAgMFAwMDBQUEAwMEBQYFBQUFBQYIBgcHBwcGCAgJCgoKCQgMDAwMDAwODg4ODhAQEBAQEBAQEBABAwQEBgYGDAgIDBIODA4SFBAQEBAUERAQEBAQEREQEBAQEBAREBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/AABEIABYAFgMBEQACEQEDEQH/xAB2AAEBAQAAAAAAAAAAAAAAAAAHBAgBAQADAQAAAAAAAAAAAAAAAAUCBAYDEAABAwMDAwIEBwAAAAAAAAACAQMEEQUGABIHITETFAhBUXEVIjJCUjQWGBEAAQMEAgMBAAAAAAAAAAAAAQAREiFhAgNBIjETBKH/2gAMAwEAAhEDEQA/AM48+Xm4YDilttVoccbuuTyTjNG2ao+MZqnk8a1qhOEYhu+FV1zJYKeIcpUwP2K+vwBm93fMH7flTbJSbdDgo2kOJO2ooAbxFvcWtBJap1XpobL68ncCn6mR8Y8E1R65kNxTjdnPUjqtyJgmCibl2pckfWFt+VPPTTMxGSHgZRUHumnNR/cpjVtdaCVAxCLbUkQz6Ab04zkmCqnZaGKar7z0IHKsfMO4N1ojDLVxY9InwW7C+mJMlBnFAcefR4blEA3TdMvyrt3V3KdFROugScvPK0sBGyJfWWdOAkzP04/a1vJXLwb/AMPp/wCwi9s3/t2p307E+huWWbkPe90DcmS+WXuYMnuGfwWGMjO7tP3q1q42TLZqoE3HRxFUFbRnaIki7ada6lsGDFzwoajnSIStzJAurXFhyuIbld3sOemAeXQxGckdhtQ3C2quMjVpHOhqJKPb9Oi9DS7M7US++cQzs9Ve83H/AMKxxF1P4JKZKi08/wByrREp23UT6aZpGyErO6//2Q=='
                    },
                },
                {

                    _id: '2345',
                    name: 'The Rolling Stones',
                    aka: [],
                    description: '',
                    periods: [{from: '1961-01-01', to: null}],
                    genres: [],
                    contentType: {type: '', attribute: '', subtype: ''},
                    albums: [],
                    compilations: [],
                    eps: [],
                    singles: [],
                    association: [],
                    members: [],
                    hero: null,
                    avatar: {
                        url: '/images/avatar1.jpg',
                        base64: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABLAAD/4QMbaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk3RERGNkZFNERGNjExRTg5RkQ4ODVEMzQxNDUwNUVDIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk3RERGNkZENERGNjExRTg5RkQ4ODVEMzQxNDUwNUVDIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9IjgwMzM4MTcwMjAwQ0Q2QTlENUREMDQ3MzM0OEU5QzI4IiBzdFJlZjpkb2N1bWVudElEPSI4MDMzODE3MDIwMENENkE5RDVERDA0NzMzNDhFOUMyOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAMCAgICAgMCAgMFAwMDBQUEAwMEBQYFBQUFBQYIBgcHBwcGCAgJCgoKCQgMDAwMDAwODg4ODhAQEBAQEBAQEBABAwQEBgYGDAgIDBIODA4SFBAQEBAUERAQEBAQEREQEBAQEBAREBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/AABEIABYAFgMBEQACEQEDEQH/xAB2AAEBAQAAAAAAAAAAAAAAAAAHBAgBAQADAQAAAAAAAAAAAAAAAAUCBAYDEAABAwMDAwIEBwAAAAAAAAACAQMEEQUGABIHITETFAhBUXEVIjJCUjQWGBEAAQMEAgMBAAAAAAAAAAAAAQAREiFhAgNBIjETBKH/2gAMAwEAAhEDEQA/AM48+Xm4YDilttVoccbuuTyTjNG2ao+MZqnk8a1qhOEYhu+FV1zJYKeIcpUwP2K+vwBm93fMH7flTbJSbdDgo2kOJO2ooAbxFvcWtBJap1XpobL68ncCn6mR8Y8E1R65kNxTjdnPUjqtyJgmCibl2pckfWFt+VPPTTMxGSHgZRUHumnNR/cpjVtdaCVAxCLbUkQz6Ab04zkmCqnZaGKar7z0IHKsfMO4N1ojDLVxY9InwW7C+mJMlBnFAcefR4blEA3TdMvyrt3V3KdFROugScvPK0sBGyJfWWdOAkzP04/a1vJXLwb/AMPp/wCwi9s3/t2p307E+huWWbkPe90DcmS+WXuYMnuGfwWGMjO7tP3q1q42TLZqoE3HRxFUFbRnaIki7ada6lsGDFzwoajnSIStzJAurXFhyuIbld3sOemAeXQxGckdhtQ3C2quMjVpHOhqJKPb9Oi9DS7M7US++cQzs9Ve83H/AMKxxF1P4JKZKi08/wByrREp23UT6aZpGyErO6//2Q=='
                    },
                },
                {

                    _id: '3456',
                    name: 'The Who',
                    aka: [],
                    description: '',
                    periods: [],
                    genres: [],
                    contentType: {type: '', attribute: '', subtype: ''},
                    albums: [],
                    compilations: [],
                    eps: [],
                    singles: [],
                    association: [],
                    members: [],
                    hero: null,
                    avatar: {
                        url: '/images/avatar1.jpg',
                        base64: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABLAAD/4QMbaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk3RERGNkZFNERGNjExRTg5RkQ4ODVEMzQxNDUwNUVDIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk3RERGNkZENERGNjExRTg5RkQ4ODVEMzQxNDUwNUVDIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9IjgwMzM4MTcwMjAwQ0Q2QTlENUREMDQ3MzM0OEU5QzI4IiBzdFJlZjpkb2N1bWVudElEPSI4MDMzODE3MDIwMENENkE5RDVERDA0NzMzNDhFOUMyOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAMCAgICAgMCAgMFAwMDBQUEAwMEBQYFBQUFBQYIBgcHBwcGCAgJCgoKCQgMDAwMDAwODg4ODhAQEBAQEBAQEBABAwQEBgYGDAgIDBIODA4SFBAQEBAUERAQEBAQEREQEBAQEBAREBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/AABEIABYAFgMBEQACEQEDEQH/xAB2AAEBAQAAAAAAAAAAAAAAAAAHBAgBAQADAQAAAAAAAAAAAAAAAAUCBAYDEAABAwMDAwIEBwAAAAAAAAACAQMEEQUGABIHITETFAhBUXEVIjJCUjQWGBEAAQMEAgMBAAAAAAAAAAAAAQAREiFhAgNBIjETBKH/2gAMAwEAAhEDEQA/AM48+Xm4YDilttVoccbuuTyTjNG2ao+MZqnk8a1qhOEYhu+FV1zJYKeIcpUwP2K+vwBm93fMH7flTbJSbdDgo2kOJO2ooAbxFvcWtBJap1XpobL68ncCn6mR8Y8E1R65kNxTjdnPUjqtyJgmCibl2pckfWFt+VPPTTMxGSHgZRUHumnNR/cpjVtdaCVAxCLbUkQz6Ab04zkmCqnZaGKar7z0IHKsfMO4N1ojDLVxY9InwW7C+mJMlBnFAcefR4blEA3TdMvyrt3V3KdFROugScvPK0sBGyJfWWdOAkzP04/a1vJXLwb/AMPp/wCwi9s3/t2p307E+huWWbkPe90DcmS+WXuYMnuGfwWGMjO7tP3q1q42TLZqoE3HRxFUFbRnaIki7ada6lsGDFzwoajnSIStzJAurXFhyuIbld3sOemAeXQxGckdhtQ3C2quMjVpHOhqJKPb9Oi9DS7M7US++cQzs9Ve83H/AMKxxF1P4JKZKi08/wByrREp23UT6aZpGyErO6//2Q=='
                    },
                },
                {

                    _id: '4567',
                    name: 'The Who',
                    aka: [],
                    description: '',
                    periods: [{from: null, to: '2001-01-01'}],
                    genres: [],
                    contentType: {type: '', attribute: '', subtype: ''},
                    albums: [],
                    compilations: [],
                    eps: [],
                    singles: [],
                    association: [],
                    members: [],
                    hero: null,
                    avatar: {
                        url: '/images/avatar1.jpg',
                        base64: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABLAAD/4QMbaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk3RERGNkZFNERGNjExRTg5RkQ4ODVEMzQxNDUwNUVDIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk3RERGNkZENERGNjExRTg5RkQ4ODVEMzQxNDUwNUVDIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9IjgwMzM4MTcwMjAwQ0Q2QTlENUREMDQ3MzM0OEU5QzI4IiBzdFJlZjpkb2N1bWVudElEPSI4MDMzODE3MDIwMENENkE5RDVERDA0NzMzNDhFOUMyOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAMCAgICAgMCAgMFAwMDBQUEAwMEBQYFBQUFBQYIBgcHBwcGCAgJCgoKCQgMDAwMDAwODg4ODhAQEBAQEBAQEBABAwQEBgYGDAgIDBIODA4SFBAQEBAUERAQEBAQEREQEBAQEBAREBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/AABEIABYAFgMBEQACEQEDEQH/xAB2AAEBAQAAAAAAAAAAAAAAAAAHBAgBAQADAQAAAAAAAAAAAAAAAAUCBAYDEAABAwMDAwIEBwAAAAAAAAACAQMEEQUGABIHITETFAhBUXEVIjJCUjQWGBEAAQMEAgMBAAAAAAAAAAAAAQAREiFhAgNBIjETBKH/2gAMAwEAAhEDEQA/AM48+Xm4YDilttVoccbuuTyTjNG2ao+MZqnk8a1qhOEYhu+FV1zJYKeIcpUwP2K+vwBm93fMH7flTbJSbdDgo2kOJO2ooAbxFvcWtBJap1XpobL68ncCn6mR8Y8E1R65kNxTjdnPUjqtyJgmCibl2pckfWFt+VPPTTMxGSHgZRUHumnNR/cpjVtdaCVAxCLbUkQz6Ab04zkmCqnZaGKar7z0IHKsfMO4N1ojDLVxY9InwW7C+mJMlBnFAcefR4blEA3TdMvyrt3V3KdFROugScvPK0sBGyJfWWdOAkzP04/a1vJXLwb/AMPp/wCwi9s3/t2p307E+huWWbkPe90DcmS+WXuYMnuGfwWGMjO7tP3q1q42TLZqoE3HRxFUFbRnaIki7ada6lsGDFzwoajnSIStzJAurXFhyuIbld3sOemAeXQxGckdhtQ3C2quMjVpHOhqJKPb9Oi9DS7M7US++cQzs9Ve83H/AMKxxF1P4JKZKi08/wByrREp23UT6aZpGyErO6//2Q=='
                    },
                },
              ]
            : [];

        return (
            <AutoComplete loading={loading} onSelect={action('onSelect')} onType={action('onType')}>
                {artists.map(item => (
                    <AutoCompleteArtist key={item._id} value={item} />
                ))}
            </AutoComplete>
        );
    })
;
