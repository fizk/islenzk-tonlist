import {AlbumType} from "../../@types";

export const orderAlbumType = (a: AlbumType, b: AlbumType) => (
    new Date(b.releaseDates).getTime() - new Date(a.releaseDates).getTime()
);
