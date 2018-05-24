import {DatabaseTypes} from "../../@types";

export const orderAlbumType = (a: DatabaseTypes.Collection, b: DatabaseTypes.Collection) => (
    new Date(b.releaseDates).getTime() - new Date(a.releaseDates).getTime()
);
