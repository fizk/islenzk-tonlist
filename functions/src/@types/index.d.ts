import admin from "firebase-admin";
import {Snapshot} from "../server/utils/database";

type ID = string;
type UUID = string;

/**
 * Database types are the shapes that are stored in
 * the Firestore database.
 *
 */
declare namespace DatabaseTypes {

    export interface ReferenceUnit {
        _id: admin.firestore.DocumentReference | Snapshot<any>
        __created?: Date
        __uuid: UUID
        __contentType: string
        [key: string]: any
    }

    export interface Unit{
        _id: string
        updateTime?: string
        createTime?: string
        __contentType: string
        __ref: ReferenceUnit[]
    }

    export interface Artist extends Unit {
        __contentType: 'artist/person' | 'artist/group' | 'artist/person+member'
        name: string
        description?: string
        genres?: string[]
        aka?: string[]
        from?: Date
        to?: Date
    }

    export interface Collection extends Unit {
        __contentType: 'collection/album' | 'collection/album+single' | 'collection/album+ep' | 'collection/album+compilation'
        name: string
        releaseDates?: Date
        description?: string
        genres?: string[]
        aka?: string[]
        from?: Date
        to?: Date
    }

    export interface Item extends Unit {
        __contentType: 'item/song'
        _id: string
        name: string
        description?: string
        duration?: number
        genres?: string[]
        instruments?: Artist[]
        authors?: Artist[]
        engineers?: Artist[]
        appearsOn?: Collection
    }

    export interface Image extends Unit {
        __contentType: 'image/avatar' | 'image/hero'
        _id: string
        width?: number
        height?: number
        url?: string
        base64?: string
        name?: string
    }
}

/**
 * GraphQL types are the shapes that the GraphQL server
 * returns
 *
 */
declare namespace GraphQLTypes {

    export interface UnitType {
        _id?: string
        __typename?: string,
        updateTime?: string
        createTime?: string
        [key: string]: any
    }

    export interface PeriodType {
        from: string
        to: string
    }

    export interface GenreType {
        type: string
        style: string
    }

    export interface ImageType {
        _id?: string
        name?: string
        width?: number
        height?: number
        base64?: string
    }

    export interface ContentType {
        type: string
        subtype: string
        attribute: string
    }

    export interface Artist extends UnitType{
        __typename: string,
        _id?: string
        contentType?: ContentType
        name: string
        description?: string
        genres?: GenreType[]
        aka?: string[]
        from?: Date
        to?: Date
        albums?: {uuid: string, collection: Collection}[]
        periods?: {uuid: string, collection: Collection}[]
        avatar?: ImageType
        hero?: ImageType
    }

    export interface ItemType extends UnitType {
        _id: string
        name: string
        description?: string
        duration?: number
        genres?: string[]
        instruments?: Artist[]
        authors?: Artist[]
        engineers?: Artist[]
        appearsOn?: Collection
    }

    export interface Collection extends UnitType {
        __typename: string,
        _id?: string
        contentType?: ContentType
        genres?: GenreType[]
        name: string
        releaseDates?: Date
        description?: string
        aka?: string[]
        from?: Date
        to?: Date
        songs?: {song: ItemType, position: number}[]
    }

    export interface GroupMember {
        periods: PeriodType[]
        artist: Artist
        uuid: UUID
    }
}

declare global {
    namespace jest {
        // tslint:disable-next-line:interface-name
        interface Matchers<R> {
            toMatchShapeOf(expected: any): R
        }
    }
}
