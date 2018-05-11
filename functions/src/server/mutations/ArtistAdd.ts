import {GraphQLNonNull, GraphQLEnumType} from 'graphql';
import Artist, {ArtistInput} from '../types/Artist'

export default {
    type: Artist,
    args: {
        values: {
            type: new GraphQLNonNull(ArtistInput),
        },
        type: {
            name: 'type',
            type: new GraphQLEnumType({
                name: 'ArtistType',
                values: {
                    person: {value: 'person'},
                    group: {value: 'group'},
                }
            })
        },
    },
    resolve (root, {values, type}, {database,}) {

        const data = Object.assign({
            __contentType: `artist/${type}`,
            __ref: [],
            aka: [],
            description: null,
            genres: [],
            periods: [],
            from: new Date(),
            to: new Date(),
        }, values);

        return database.collection('artists').add(data)
            .then(doc => doc.get())
            .then(snapshot => {
                return {
                    _id: snapshot.id,
                    ...snapshot.data()
                }
            });
    }
};
