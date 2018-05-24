import {GraphQLNonNull} from 'graphql';
import Collection, {CollectionInput, CollectionType} from '../types/Collection';
import {transformSnapshot} from "../utils/transform";
import {DatabaseTypes as D} from "../../@types";

export default {
    type: Collection,
    args: {
        values: {
            type: new GraphQLNonNull(CollectionInput),
        },
        type: {
            name: 'type',
            type: new GraphQLNonNull(CollectionType)
        },
    },
    resolve (root, {values, type}, {database,}) {

        const data: D.Collection = Object.assign({
            __contentType: `collection/${type}`,
            __ref: [],
            aka: [],
            description: null,
            genres: [],
            releaseDates: null
        }, values);

        return database.collection('collections').add(data)
            .then(doc => doc.get())
            .then(transformSnapshot);
    }
};
