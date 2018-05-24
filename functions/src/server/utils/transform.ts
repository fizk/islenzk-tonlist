import {DocumentSnapshot, QueryDocumentSnapshot} from '@google-cloud/firestore'
import {GraphQLTypes} from "../../@types";

export const transformSnapshot = (snapshot: QueryDocumentSnapshot | DocumentSnapshot): GraphQLTypes.UnitType => ({
    ...snapshot.data() ,
    updateTime: snapshot.updateTime,
    createTime: snapshot.createTime,
    _id: snapshot.id
});
