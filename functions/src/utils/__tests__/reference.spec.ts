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

describe('refDifference', () => {
    test('unrealistic example', () => {
        const before = [
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
        const after = [
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
                after[2]
            ],
            updated: [
                after[1]
            ],
            deleted: [
                before[2]
            ]
        };
        const actual = refDifference(before, after);

        expect(actual).toEqual(expected);
    });

    test('realistic example', () => {
        const before = [
            {
                _id: new SnapshotLike('artists/lUwXZfdb6thigBW7hFcH'),
                __contentType: 'artist/person+member',
                __uuid: '4c5a0aa6-f132-48d8-85a8-6d96f4c390e1',
                periods: []
            }
        ];
        const after = [
            {
                _id: new SnapshotLike('artists/lUwXZfdb6thigBW7hFcH'),
                __contentType: 'artist/person+member',
                __uuid: '4c5a0aa6-f132-48d8-85a8-6d96f4c390e1' ,
                periods: [],
            },
            {
                _id: new SnapshotLike('artists/hNG5GZDo57MhwxmsrfbR'),
                __contentType: 'artist/person+member',
                __uuid: '955f340c-d2ac-47f4-9e11-c08de4d34bb9',
                periods: [],
            }
        ];
        const expected = {
            added: [
                after[1]
            ],
            updated: [],
            deleted: []
        };
        const actual = refDifference(before, after);

        expect(actual).toEqual(expected);
    })
});
