export const splitContentType = (contentType: string) => {
    // tslint:disable-next-line
    const [input, type, subtype] = (contentType || '').match(/(.*)\/(.*)/) || [undefined, undefined, undefined];
    return {
        type: type,
        subtype: subtype,
    }
};

export const splitGenre = (genre: string) => {
    const genreArray = genre.split('/');
    return {
        type: genreArray[0],
        style: genreArray[1],
    }
};
