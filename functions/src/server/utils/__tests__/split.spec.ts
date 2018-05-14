import {splitContentType} from '../split';

describe('splitContentType', () => {
    test('type/subtype+attribute: valid', () => {
        const expected = {
            type: 'type',
            subtype: 'subtype',
            attribute: 'attribute'
        };
        const actual = splitContentType('type/subtype+attribute');

        expect(actual).toEqual(expected);
    });

    test('type/subtype: valid', () => {
        const expected = {
            type: 'type',
            subtype: 'subtype',
            attribute: undefined
        };
        const actual = splitContentType('type/subtype');

        expect(actual).toEqual(expected);
    });

    test('type: valid', () => {
        const expected = {
            type: 'type',
            subtype: undefined,
            attribute: undefined
        };
        const actual = splitContentType('type');

        expect(actual).toEqual(expected);
    });

    test('type-subtype: invalid', () => {
        const expected = {
            type: undefined,
            subtype: undefined,
            attribute: undefined
        };
        const actual = splitContentType('type-subtype');

        expect(actual).toEqual(expected);
    });

    test('ty-pe/sub-type: invalid', () => {
        const expected = {
            type: undefined,
            subtype: undefined,
            attribute: undefined
        };
        const actual = splitContentType('ty-pe/sub-type');

        expect(actual).toEqual(expected);
    });

    test('ty-pe/sub-type+attr-ibute: invalid', () => {
        const expected = {
            type: undefined,
            subtype: undefined,
            attribute: undefined
        };
        const actual = splitContentType('ty-pe/sub-type+attr-ibute');

        expect(actual).toEqual(expected);
    });

    test('type/sub-type+attr-ibute: invalid', () => {
        const expected = {
            type: undefined,
            subtype: undefined,
            attribute: undefined
        };
        const actual = splitContentType('type/sub-type+attr-ibute');

        expect(actual).toEqual(expected);
    });

    test('type/subtype+attr-ibute: invalid', () => {
        const expected = {
            type: undefined,
            subtype: undefined,
            attribute: undefined
        };
        const actual = splitContentType('type/subtype+attr-ibute');

        expect(actual).toEqual(expected);
    });

    test('type+attr: valid', () => {
        const expected = {
            type: 'type',
            subtype: undefined,
            attribute: 'attr'
        };
        const actual = splitContentType('type+attr');

        expect(actual).toEqual(expected);
    });

});
