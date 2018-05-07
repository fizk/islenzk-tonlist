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
        period: {
            name: 'type',
            type: new GraphQLNonNull(PeriodTypeInput),
        },
    },
    resolve (root, {artist, association, period, }, {database, search, }) {
        return {}
        //
        // //@todo implement this
        // return database.findOne({_id: new ObjectID(Artist)}).then(document => {
        //     document.__ref = document.__ref.map(reference => {
        //         if(new ObjectID(association).equals(reference._id) && reference.__contentType === 'MEMBER') {
        //             reference.period = reference.period.filter(p => {
        //                 const referenceFrom = p.from ? p.from.getTime() : null;
        //                 const referenceTo = p.to ? p.to.getTime() : null;
        //                 const argumentFrom = period.from ? new Date(period.from).getTime() : null;
        //                 const argumentTo = period.to ? new Date(period.to).getTime() : null;
        //
        //                 return (referenceFrom !== argumentFrom) || (referenceTo !== argumentTo);
        //             });
        //         }
        //         return reference;
        //     });
        //
        //     return database.update({_id: new ObjectID(Artist)}, document).then(_ => period)
        // });
    }
};
