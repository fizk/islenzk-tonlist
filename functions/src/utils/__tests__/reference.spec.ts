import {refDifference} from '../reference';

class SnapshotLike {
    path: string;

    constructor(path: string) {
        this.path = path;
    }

    isEqual(other: SnapshotLike) {
        return this.path === other.path
    }
}

describe('describe', () => {
    test('test', () => {

        const ref1 = [
            {
                __uuid: '1',
                _id: new SnapshotLike('/collection/1')
            },
            {
                __uuid: '2',
                date: '2001-01-01',
                _id: new SnapshotLike('/collection/2')
            },
            {
                __uuid: '4',
                _id: new SnapshotLike('/collection/2')
            },
        ];
        const ref2 = [
            {
                __uuid: '1',
                _id: new SnapshotLike('/collection/1')
            },
            {
                __uuid: '2',
                date: '2002-01-01',
                _id: new SnapshotLike('/collection/2')
            },
            {
                __uuid: '3',
                _id: new SnapshotLike('/collection/3')
            },
        ];

        const expected = {
            added: [
                ref2[2]
            ],
            updated: [
                ref2[1]
            ],
            deleted: [
                ref1[2]
            ]
        };
        const actual = refDifference(ref1, ref2);

        expect(actual).toEqual(expected);
    })
});
