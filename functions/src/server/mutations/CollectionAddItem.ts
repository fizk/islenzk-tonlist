import {GraphQLID, GraphQLNonNull, GraphQLInt, GraphQLString} from 'graphql';
import * as uuid from 'uuid/v4';
import {QueryDocumentSnapshot} from "@google-cloud/firestore";
import {transformSnapshot} from "../utils/transform";
import {ReferenceUnit} from "../../@types";
import Collection from "../types/Collection";
import {ItemType} from "../types/Item";

export default {
    type: Collection,
    args: {
        collection: {
            type: new GraphQLNonNull(GraphQLID)
        },
        item: {
            type: new GraphQLNonNull(GraphQLID)
        },
        type: {
            type: new GraphQLNonNull(ItemType),
        },
        order: {
            type: GraphQLInt
        },
        orderLabel: {
            type: GraphQLString
        }
    },
    resolve (root, {collection, item, type, order = 0}, {database}) {
        return database.doc(`collections/${collection}`).get()
            .then((snapshot: QueryDocumentSnapshot) => {
                const data = snapshot.data();
                const reference: ReferenceUnit = {
                    __contentType: `item/${type}`,
                    _id: database.doc(`items/${item}`),
                    __created: new Date(),
                    __uuid: uuid(),
                    order: order
                };
                return snapshot.ref.update('__ref', [...data.__ref, reference])
            })
            .then(() => database.doc(`collections/${collection}`).get())
            .then((snapshot: QueryDocumentSnapshot) => snapshot.exists ? transformSnapshot(snapshot) : null);

    }
};
