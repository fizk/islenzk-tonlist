import admin from "firebase-admin";

type ID = string;
type UUID = string;

// -- -- -- -- [ABSTRACT] -- -- -- -- -- -- -- -- -- -- --
export interface ReferenceUnit {
    _id: admin.firestore.DocumentReference
    __created?: Date
    __uuid: UUID
    __contentType: string
    [key: string]: any
}

export interface Reference {
    _id: admin.firestore.DocumentReference
    __ref: ReferenceUnit[]
}

export interface Unit{
    _id: string
    updateTime: string
    createTime: string
    __contentType: string
    __ref: ReferenceUnit[]
    [key: string]: any
}

// -- -- -- -- [GENERAL] -- -- -- -- -- -- -- -- -- -- --
export interface ContentType {
    type: string
    subtype: string
    attribute: string
}

// -- -- -- -- [ARTIST] -- -- -- -- -- -- -- -- -- -- --
export interface ArtistType extends Unit {
    name: string
    description: string
    genres: string[]
    aka: string[]
    from: Date
    to: Date
    contentType: ContentType
}
// -- -- -- -- [ALBUM] -- -- -- -- -- -- -- -- -- -- --
export interface AlbumType extends Unit {
    name: string;
    description: string
    genres: string[]
    aka: string[]
    from: Date
    to: Date
    contentType: ContentType
}
