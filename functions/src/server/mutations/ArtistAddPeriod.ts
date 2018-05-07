import {GraphQLID, GraphQLNonNull} from 'graphql';
import Period, {PeriodTypeInput} from '../types/Period'

export default {
    type: Period,
    args: {
        artist: {
            name: 'artist',
            type: new GraphQLNonNull(GraphQLID)
        },
        association: {
            name: 'association',
            type: new GraphQLNonNull(GraphQLID)
        },
        period: {
            name: 'type',
            type: new GraphQLNonNull(PeriodTypeInput),
        },
    },
    resolve (root, {artist, association, period, }, {database, search, }) {
        return {}
        // return database.findOneAndUpdate(
        //     {_id: new ObjectID(Artist), '__ref._id': new ObjectID(association), '__ref.__contentType': 'MEMBER'},
        //     {$push: {'__ref.$.period': {from: period.from, to: period.to}}},
        //     {returnOriginal: false}
        // ).then(result => {
        //     if (!result.ok) throw new Error(result.result);
        //
        //     const {_id, ...rest, } = result.value;
        //     search.index({
        //         index: 'application',
        //         type: "Artist",
        //         id: _id.toString(),
        //         body: rest,
        //     }).then(console.log)
        //         .catch(console.error);
        //
        //     return {
        //         from: period.from,
        //         to: period.to,
        //     }
        // });
    }
};
