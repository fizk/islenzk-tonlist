import {GraphQLID, GraphQLNonNull} from 'graphql';
import Artist, {ArtistInput} from '../types/Artist'

export default {
    type: Artist,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID),
        },
        artist: {
            name: 'Artist',
            type: ArtistInput
        },
    },
    resolve (root, {artist, id}, {database, search, }) {
        return {}
        // const {period, ...rest} = Artist;
        // const normalizedArtist = {
        //     ...rest,
        //     from: period.from || null,
        //     to: period.to || null,
        // };
        //
        // return database.findOneAndUpdate(
        //     {_id: new ObjectID(id)},
        //     {$set: normalizedArtist},
        //     {returnOriginal: false}
        // ).then(result => {
        //
        //     if (result.ok) {
        //         const {_id, ...rest, } = result.value;
        //         // const searchData = {
        //         //     ...rest,
        //         //     from: rest.period.from ? rest.period.from.getTime() : null,
        //         //     to: rest.period.to ? rest.period.to.getTime() : null,
        //         // };
        //         //
        //         // search.index({
        //         //     index: 'application',
        //         //     type: 'Artist',
        //         //     id: _id.toString(),
        //         //     body: searchData,
        //         // });
        //
        //         return result.value;
        //     }
        // });
    }
};
