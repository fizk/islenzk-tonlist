// import {refDifference} from '../reference';
//
// describe('describe', () => {
//     test('test', () => {
//
//         const ref1 = [
//             {
//                 uuid: '1',
//                 _id: {
//                     path: '/collection/1',
//                     isEqual(other) {
//                         return this.path === other.path
//                     }
//                 }
//             },
//             {
//                 uuid: '2',
//                 date: '2001-01-01',
//                 _id: {
//                     path: '/collection/2',
//                     isEqual(other) {
//                         return this.path === other.path
//                     }
//                 }
//             },
//             {
//                 uuid: '4',
//                 _id: {
//                     path: '/collection/2',
//                     isEqual(other) {
//                         return this.path === other.path
//                     }
//                 }
//             },
//         ];
//         const ref2 = [
//             {
//                 uuid: '1',
//                 _id: {
//                     path: '/collection/1',
//                     isEqual(other) {
//                         return this.path === other.path
//                     }
//                 }
//             },
//             {
//                 uuid: '2',
//                 date: '2002-01-01',
//                 _id: {
//                     path: '/collection/2',
//                     isEqual(other) {
//                         return this.path === other.path
//                     }
//                 }
//             },
//             {
//                 uuid: '3',
//                 _id: {
//                     path: '/collection/3',
//                     isEqual(other) {
//                         return this.path === other.path
//                     }
//                 }
//             },
//         ];
//
//         const expected = {
//             added: [
//                 ref2[2]
//             ],
//             updated: [
//                 ref2[1]
//             ],
//             deleted: [
//                 ref1[2]
//             ]
//         };
//         const actual = refDifference(ref1, ref2);
//
//         expect(actual).toEqual(expected);
//     })
// });
