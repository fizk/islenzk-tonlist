export default class ContentType {
    type: any;
    subtype: any;
    attribute: any;

    constructor(type, subtype, attribute) {
        this.type = type;
        this.subtype = subtype;
        this.attribute = attribute;
    }

    static fromString(contentType) {
        const [input, type, subtype, ] = (contentType || '').match(/(.*)\/(.*)/) || [undefined, undefined, undefined];
        return new ContentType(type, subtype, undefined);
    }

    toObject() {
        return {
            type: this.type,
            subtype: this.subtype,
            attribute: this.attribute,
        };
    }

    toString() {
        return this.attribute
            ? `${this.type}/${this.subtype}+${this.attribute}`
            : `${this.type}/${this.subtype}`;
    }
};

export const contentTypeToString = ({type, subtype, attribute}) => {
    return attribute
        ? `${type}/${subtype}+${attribute}`
        : `${type}/${subtype}`;
};
