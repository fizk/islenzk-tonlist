import {GraphQLID, GraphQLNonNull} from 'graphql';
import Period, {PeriodTypeInput} from '../types/Period';

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
        prevPeriod: {
            name: 'prevPeriod',
            type: new GraphQLNonNull(PeriodTypeInput),
        },
        nextPeriod: {
            name: 'nextPeriod',
            type: new GraphQLNonNull(PeriodTypeInput),
        },
    },
    resolve (root, {artist, association, prevPeriod, nextPeriod, }, {database, search, }) {
        return {}
        // return database.findOne({_id: new ObjectID(Artist)}).then(document => {
        //     document.__ref = document.__ref.map(reference => {
        //         if(new ObjectID(association).equals(reference._id) && reference.__contentType === 'MEMBER') {
        //             reference.period = reference.period.map(p => {
        //                     const referenceFrom = p.from ? p.from.getTime() : null;
        //                     const referenceTo = p.to ? p.to.getTime() : null;
        //                     const argumentFrom = prevPeriod.from ? new Date(prevPeriod.from).getTime() : null;
        //                     const argumentTo = prevPeriod.to ? new Date(prevPeriod.to).getTime() : null;
        //
        //                     return ((referenceFrom == argumentFrom) && (referenceTo == argumentTo))
        //                         ? {from: nextPeriod.from, to: nextPeriod.to}
        //                         : p;
        //             });
        //         }
        //         return reference;
        //     });
        //
        //     return database.update({_id: new ObjectID(Artist)}, document).then(_ => prevPeriod)
        // });
    }
};
