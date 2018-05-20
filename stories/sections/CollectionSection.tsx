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
    description: 'Lorem Ipsum is unattractive, both inside and out. I fully understand why it’s former users left it for something else. They made a good decision. An \'extremely credible source\' has called my office and told me that Lorem Ipsum\'s birth certificate is a fraud. I don\'t think anybody knows it was Russia that wrote Lorem Ipsum, but I don\'t know, maybe it was. It could be Russia, but it could also be China. It could also be lots of other people. It also could be some wordsmith sitting on their bed that weights 400 pounds. Ok? You know, it really doesn’t matter what you write as long as you’ve got a young, and beautiful, piece of text.\n' +
    '\n' +
    'When other websites give you text, they’re not sending the best. They’re not sending you, they’re sending words that have lots of problems and they’re bringing those problems with us. They’re bringing mistakes. They’re bringing misspellings. They’re typists… And some, I assume, are good words. Look at these words. Are they small words? And he referred to my words - if they\'re small, something else must be small. I guarantee you there\'s no problem, I guarantee. Lorem Ipsum\'s father was with Lee Harvey Oswald prior to Oswald\'s being, you know, shot. Lorem Ipsum better hope that there are no "tapes" of our conversations before he starts leaking to the press! I write the best placeholder text, and I\'m the biggest developer on the web by far... While that\'s mock-ups and this is politics, are they really so different?\n' +
    '\n' +
    'I\'m speaking with myself, number one, because I have a very good brain and I\'ve said a lot of things. My text is long and beautiful, as, it has been well documented, are various other parts of my website. The other thing with Lorem Ipsum is that you have to take out its family.\n' +
    '\n' +
    'You’re disgusting. I’m the best thing that ever happened to placeholder text.\n' +
    '\n' +
    'The other thing with Lorem Ipsum is that you have to take out its family.',
    releaseDates: '1963-01-01',
    contentType: {type: 'collection', subtype: 'album', attribute: ''},
    avatar: {
        url: '/images/avatar1.jpg',
        base64: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABLAAD/4QMbaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk3RERGNkZFNERGNjExRTg5RkQ4ODVEMzQxNDUwNUVDIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk3RERGNkZENERGNjExRTg5RkQ4ODVEMzQxNDUwNUVDIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9IjgwMzM4MTcwMjAwQ0Q2QTlENUREMDQ3MzM0OEU5QzI4IiBzdFJlZjpkb2N1bWVudElEPSI4MDMzODE3MDIwMENENkE5RDVERDA0NzMzNDhFOUMyOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAMCAgICAgMCAgMFAwMDBQUEAwMEBQYFBQUFBQYIBgcHBwcGCAgJCgoKCQgMDAwMDAwODg4ODhAQEBAQEBAQEBABAwQEBgYGDAgIDBIODA4SFBAQEBAUERAQEBAQEREQEBAQEBAREBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/AABEIABYAFgMBEQACEQEDEQH/xAB2AAEBAQAAAAAAAAAAAAAAAAAHBAgBAQADAQAAAAAAAAAAAAAAAAUCBAYDEAABAwMDAwIEBwAAAAAAAAACAQMEEQUGABIHITETFAhBUXEVIjJCUjQWGBEAAQMEAgMBAAAAAAAAAAAAAQAREiFhAgNBIjETBKH/2gAMAwEAAhEDEQA/AM48+Xm4YDilttVoccbuuTyTjNG2ao+MZqnk8a1qhOEYhu+FV1zJYKeIcpUwP2K+vwBm93fMH7flTbJSbdDgo2kOJO2ooAbxFvcWtBJap1XpobL68ncCn6mR8Y8E1R65kNxTjdnPUjqtyJgmCibl2pckfWFt+VPPTTMxGSHgZRUHumnNR/cpjVtdaCVAxCLbUkQz6Ab04zkmCqnZaGKar7z0IHKsfMO4N1ojDLVxY9InwW7C+mJMlBnFAcefR4blEA3TdMvyrt3V3KdFROugScvPK0sBGyJfWWdOAkzP04/a1vJXLwb/AMPp/wCwi9s3/t2p307E+huWWbkPe90DcmS+WXuYMnuGfwWGMjO7tP3q1q42TLZqoE3HRxFUFbRnaIki7ada6lsGDFzwoajnSIStzJAurXFhyuIbld3sOemAeXQxGckdhtQ3C2quMjVpHOhqJKPb9Oi9DS7M7US++cQzs9Ve83H/AMKxxF1P4JKZKi08/wByrREp23UT6aZpGyErO6//2Q=='
    },
    hero: {
        url: '/images/avatar1.jpg',
        base64: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABLAAD/4QMbaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk3RERGNkZFNERGNjExRTg5RkQ4ODVEMzQxNDUwNUVDIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk3RERGNkZENERGNjExRTg5RkQ4ODVEMzQxNDUwNUVDIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9IjgwMzM4MTcwMjAwQ0Q2QTlENUREMDQ3MzM0OEU5QzI4IiBzdFJlZjpkb2N1bWVudElEPSI4MDMzODE3MDIwMENENkE5RDVERDA0NzMzNDhFOUMyOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAMCAgICAgMCAgMFAwMDBQUEAwMEBQYFBQUFBQYIBgcHBwcGCAgJCgoKCQgMDAwMDAwODg4ODhAQEBAQEBAQEBABAwQEBgYGDAgIDBIODA4SFBAQEBAUERAQEBAQEREQEBAQEBAREBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/AABEIABYAFgMBEQACEQEDEQH/xAB2AAEBAQAAAAAAAAAAAAAAAAAHBAgBAQADAQAAAAAAAAAAAAAAAAUCBAYDEAABAwMDAwIEBwAAAAAAAAACAQMEEQUGABIHITETFAhBUXEVIjJCUjQWGBEAAQMEAgMBAAAAAAAAAAAAAQAREiFhAgNBIjETBKH/2gAMAwEAAhEDEQA/AM48+Xm4YDilttVoccbuuTyTjNG2ao+MZqnk8a1qhOEYhu+FV1zJYKeIcpUwP2K+vwBm93fMH7flTbJSbdDgo2kOJO2ooAbxFvcWtBJap1XpobL68ncCn6mR8Y8E1R65kNxTjdnPUjqtyJgmCibl2pckfWFt+VPPTTMxGSHgZRUHumnNR/cpjVtdaCVAxCLbUkQz6Ab04zkmCqnZaGKar7z0IHKsfMO4N1ojDLVxY9InwW7C+mJMlBnFAcefR4blEA3TdMvyrt3V3KdFROugScvPK0sBGyJfWWdOAkzP04/a1vJXLwb/AMPp/wCwi9s3/t2p307E+huWWbkPe90DcmS+WXuYMnuGfwWGMjO7tP3q1q42TLZqoE3HRxFUFbRnaIki7ada6lsGDFzwoajnSIStzJAurXFhyuIbld3sOemAeXQxGckdhtQ3C2quMjVpHOhqJKPb9Oi9DS7M7US++cQzs9Ve83H/AMKxxF1P4JKZKi08/wByrREp23UT6aZpGyErO6//2Q=='
    },
    genres: [
        {style: 'Beat', type: null},
        {style: 'Beat', type: null},
        {style: 'Merseybeat', type: null},
    ],
    artists: [
        {
            _id: 'artists-1',
            name: 'The Beatles',
            aka: [''],
            description: 'Fun guy',
            periods: [],
            genres: [],
            contentType: {type: 'artist', subtype: 'person', attribute: 'member'},
            albums: [],
            compilations: [],
            eps: [],
            singles: [],
            members: [],
            association: [],
            avatar: {
                url: '/images/avatar1.jpg',
                base64: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABLAAD/4QMbaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk3RERGNkZFNERGNjExRTg5RkQ4ODVEMzQxNDUwNUVDIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk3RERGNkZENERGNjExRTg5RkQ4ODVEMzQxNDUwNUVDIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9IjgwMzM4MTcwMjAwQ0Q2QTlENUREMDQ3MzM0OEU5QzI4IiBzdFJlZjpkb2N1bWVudElEPSI4MDMzODE3MDIwMENENkE5RDVERDA0NzMzNDhFOUMyOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAMCAgICAgMCAgMFAwMDBQUEAwMEBQYFBQUFBQYIBgcHBwcGCAgJCgoKCQgMDAwMDAwODg4ODhAQEBAQEBAQEBABAwQEBgYGDAgIDBIODA4SFBAQEBAUERAQEBAQEREQEBAQEBAREBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/AABEIABYAFgMBEQACEQEDEQH/xAB2AAEBAQAAAAAAAAAAAAAAAAAHBAgBAQADAQAAAAAAAAAAAAAAAAUCBAYDEAABAwMDAwIEBwAAAAAAAAACAQMEEQUGABIHITETFAhBUXEVIjJCUjQWGBEAAQMEAgMBAAAAAAAAAAAAAQAREiFhAgNBIjETBKH/2gAMAwEAAhEDEQA/AM48+Xm4YDilttVoccbuuTyTjNG2ao+MZqnk8a1qhOEYhu+FV1zJYKeIcpUwP2K+vwBm93fMH7flTbJSbdDgo2kOJO2ooAbxFvcWtBJap1XpobL68ncCn6mR8Y8E1R65kNxTjdnPUjqtyJgmCibl2pckfWFt+VPPTTMxGSHgZRUHumnNR/cpjVtdaCVAxCLbUkQz6Ab04zkmCqnZaGKar7z0IHKsfMO4N1ojDLVxY9InwW7C+mJMlBnFAcefR4blEA3TdMvyrt3V3KdFROugScvPK0sBGyJfWWdOAkzP04/a1vJXLwb/AMPp/wCwi9s3/t2p307E+huWWbkPe90DcmS+WXuYMnuGfwWGMjO7tP3q1q42TLZqoE3HRxFUFbRnaIki7ada6lsGDFzwoajnSIStzJAurXFhyuIbld3sOemAeXQxGckdhtQ3C2quMjVpHOhqJKPb9Oi9DS7M7US++cQzs9Ve83H/AMKxxF1P4JKZKi08/wByrREp23UT6aZpGyErO6//2Q=='
            },
            hero: {
                url: '/images/avatar1.jpg',
                base64: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABLAAD/4QMbaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk3RERGNkZFNERGNjExRTg5RkQ4ODVEMzQxNDUwNUVDIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk3RERGNkZENERGNjExRTg5RkQ4ODVEMzQxNDUwNUVDIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9IjgwMzM4MTcwMjAwQ0Q2QTlENUREMDQ3MzM0OEU5QzI4IiBzdFJlZjpkb2N1bWVudElEPSI4MDMzODE3MDIwMENENkE5RDVERDA0NzMzNDhFOUMyOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAMCAgICAgMCAgMFAwMDBQUEAwMEBQYFBQUFBQYIBgcHBwcGCAgJCgoKCQgMDAwMDAwODg4ODhAQEBAQEBAQEBABAwQEBgYGDAgIDBIODA4SFBAQEBAUERAQEBAQEREQEBAQEBAREBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/AABEIABYAFgMBEQACEQEDEQH/xAB2AAEBAQAAAAAAAAAAAAAAAAAHBAgBAQADAQAAAAAAAAAAAAAAAAUCBAYDEAABAwMDAwIEBwAAAAAAAAACAQMEEQUGABIHITETFAhBUXEVIjJCUjQWGBEAAQMEAgMBAAAAAAAAAAAAAQAREiFhAgNBIjETBKH/2gAMAwEAAhEDEQA/AM48+Xm4YDilttVoccbuuTyTjNG2ao+MZqnk8a1qhOEYhu+FV1zJYKeIcpUwP2K+vwBm93fMH7flTbJSbdDgo2kOJO2ooAbxFvcWtBJap1XpobL68ncCn6mR8Y8E1R65kNxTjdnPUjqtyJgmCibl2pckfWFt+VPPTTMxGSHgZRUHumnNR/cpjVtdaCVAxCLbUkQz6Ab04zkmCqnZaGKar7z0IHKsfMO4N1ojDLVxY9InwW7C+mJMlBnFAcefR4blEA3TdMvyrt3V3KdFROugScvPK0sBGyJfWWdOAkzP04/a1vJXLwb/AMPp/wCwi9s3/t2p307E+huWWbkPe90DcmS+WXuYMnuGfwWGMjO7tP3q1q42TLZqoE3HRxFUFbRnaIki7ada6lsGDFzwoajnSIStzJAurXFhyuIbld3sOemAeXQxGckdhtQ3C2quMjVpHOhqJKPb9Oi9DS7M7US++cQzs9Ve83H/AMKxxF1P4JKZKi08/wByrREp23UT6aZpGyErO6//2Q=='
            },
        },
    ],
    publications: [
        {
            catalogNumber: 'PMC 1202',
            date: '1963-01-01',
            formats: ['LP', 'Album', 'Mono'],
            publishers: [
                {
                    _id: 'publisher-1',
                    name: 'Parlophone'
                }
            ]
        },
        {
            catalogNumber: 'TOCP-54501',
            date: '1980-01-01',
            formats: ['CD', 'Album', 'RE', 'RM'],
            publishers: [
                {
                    _id: 'publisher-1',
                    name: 'Parlophone'
                }
            ]
        },
        {
            catalogNumber: 'PCS 3042',
            date: '2017-01-01',
            formats: ['LP', 'RE', 'RM', '180'],
            publishers: [
                {
                    _id: 'publisher-1',
                    name: 'Parlophone'
                }
            ]
        },
    ],
    songs: [
        {
            position: 1,
            song: {
                _id: 'song-1',
                name: 'I saw here standing there',
                description: '',
                duration: 2.55,
                genres: [],
                appearsOn: [],
                hero: null,
                avatar: null,
            }
        },
        {
            position: 2,
            song: {
                _id: 'song-2',
                name: 'Misery',
                description: '',
                duration: 1.49,
                genres: [],
                appearsOn: [],
                hero: null,
                avatar: null,
            }
        },
        {
            position: 3,
            song: {
                _id: 'song-3',
                name: 'Anna (Go to Him)',
                description: '',
                duration: 2.55,
                genres: [],
                appearsOn: [],
                hero: null,
                avatar: null,
            }
        },
        {
            position: 4,
            song: {
                _id: 'song-4',
                name: 'Chains',
                description: '',
                duration: 2.23,
                genres: [],
                appearsOn: [],
                hero: null,
                avatar: null,
            }
        },
        {
            position: 5,
            song: {
                _id: 'song-5',
                name: 'Boys',
                description: '',
                duration: 2.24,
                genres: [],
                appearsOn: [],
                hero: null,
                avatar: null,
            }
        },
        {
            position: 6,
            song: {
                _id: 'song-6',
                name: 'Ask Me Why',
                description: '',
                duration: 2.24,
                genres: [],
                appearsOn: [],
                hero: null,
                avatar: null,
            }
        },
        {
            position: 7,
            song: {
                _id: 'song-7',
                name: 'Please Please Me',
                description: '',
                duration: 2.00,
                genres: [],
                appearsOn: [],
                hero: null,
                avatar: null,
            }
        },
        {
            position: 8,
            song: {
                _id: 'song-8',
                name: 'I saw here standing there',
                description: '',
                duration: 2.55,
                genres: [],
                appearsOn: [],
                hero: null,
                avatar: null,
            }
        },
        {
            position: 9,
            song: {
                _id: 'song-9',
                name: 'Misery',
                description: '',
                duration: 1.49,
                genres: [],
                appearsOn: [],
                hero: null,
                avatar: null,
            }
        },
        {
            position: 10,
            song: {
                _id: 'song-10',
                name: 'Anna (Go to Him)',
                description: '',
                duration: 2.55,
                genres: [],
                appearsOn: [],
                hero: null,
                avatar: null,
            }
        },
        {
            position: 11,
            song: {
                _id: 'song-11',
                name: 'Chains',
                description: '',
                duration: 2.23,
                genres: [],
                appearsOn: [],
                hero: null,
                avatar: null,
            }
        },
        {
            position: 12,
            song: {
                _id: 'song-12',
                name: 'Boys',
                description: '',
                duration: 2.24,
                genres: [],
                appearsOn: [],
                hero: null,
                avatar: null,
            }
        },
        {
            position: 13,
            song: {
                _id: 'song-13',
                name: 'Ask Me Why',
                description: '',
                duration: 2.24,
                genres: [],
                appearsOn: [],
                hero: null,
                avatar: null,
            }
        },
        {
            position: 14,
            song: {
                _id: 'song-14',
                name: 'Please Please Me',
                description: '',
                duration: 2.00,
                genres: [],
                appearsOn: [],
                hero: null,
                avatar: null,
            }
        },
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
