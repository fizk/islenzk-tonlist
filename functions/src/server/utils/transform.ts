import {DocumentSnapshot, QueryDocumentSnapshot} from '@google-cloud/firestore'

export const transformSnapshot = <T>(snapshot: QueryDocumentSnapshot | DocumentSnapshot) => ({
    ...snapshot.data() ,
    updateTime: snapshot.updateTime,
    createTime: snapshot.createTime,
    _id: snapshot.id
});
