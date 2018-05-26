export const transformSnapshot = (snapshot) => ({
    ...snapshot.data() ,
    updateTime: snapshot.updateTime,
    createTime: snapshot.createTime,
    _id: snapshot.id
});
