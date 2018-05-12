import {GraphQLList, GraphQLID, GraphQLNonNull} from 'graphql';
import Artist from '../types/Artist'
import * as uuid from 'uuid/v4';
import {QueryDocumentSnapshot} from "@google-cloud/firestore";
import {transformSnapshot} from "../utils/transform";
import {PeriodTypeInput} from "../types/Period";
import {ReferenceUnit} from "../../@types";

export default {
    type: Artist,
    args: {
        artist: {
            name: 'artist',
            type: new GraphQLNonNull(GraphQLID)
        },
        member: {
            name: 'member',
            type: new GraphQLNonNull(GraphQLID)
        },
        periods: {
            name: 'periods',
            type: new GraphQLList(PeriodTypeInput)
        }
    },
    resolve (root, {artist, member, periods = []}, {database}) {
        return database.doc(`/artists/${artist}`).get()
            .then((snapshot: QueryDocumentSnapshot) => {
                const data = snapshot.data();
                const reference: ReferenceUnit = {
                    __contentType: 'artist/person+member',
                    _id: database.doc(`artists/${member}`),
                    __created: new Date(),
                    __uuid: uuid(),
                    periods: periods.map(item => ({
                        from: new Date(item.from),
                        to: new Date(item.to)
                    }))
                };
                return snapshot.ref.update('__ref', [...data.__ref, reference])
            })
            .then(() => database.doc(`/artists/${artist}`).get())
            .then((snapshot: QueryDocumentSnapshot) => snapshot.exists ? transformSnapshot(snapshot) : null);

    }
};
