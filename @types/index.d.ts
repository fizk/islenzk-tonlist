
export interface ImageType {
    url: string,
    base64: string,
}

export interface ItemType {
    _id: string
    name: string
    description: string
    duration: number
    genres: GenreType[],
    appearsOn: {uuid: string, collection: CollectionType}[]
    hero: ImageType
    avatar: ImageType
}

export interface PublisherType {
    _id
    name
}

export interface PublicationType {
    catalogNumber
    date
    formats
    publishers: PublisherType[]
}

export interface PeriodType {
    from: string,
    to: string,
}

export interface ContentTypeType {
    type: string,
    subtype: string,
    attribute: string,
}

export interface GenreType {
    type: string,
    style: string
}

export interface ArtistPersonType {
    _id: string,
    name: string,
    aka: string[],
    description: string,
    periods: PeriodType[],
    genres: GenreType[],
    contentType: ContentTypeType,
    albums: {uuid: string, collection: CollectionType}[],
    compilations: {uuid: string, collection: CollectionType}[],
    eps: {uuid: string, collection: CollectionType}[],
    singles: {uuid: string, collection: CollectionType}[],
    association: {
        group: ArtistType,
        periods: PeriodType[],
    }[],
    hero: ImageType,
    avatar: ImageType,
}

export interface ArtistGroupType {
    _id: string,
    name: string,
    aka: string[],
    description: string,
    periods: PeriodType[],
    genres: GenreType[],
    contentType: ContentTypeType,
    albums: {uuid: string, collection: CollectionType}[],
    compilations: {uuid: string, collection: CollectionType}[],
    eps: {uuid: string, collection: CollectionType}[],
    singles: {uuid: string, collection: CollectionType}[],
    members: {
        artist: ArtistType,
        periods: PeriodType[],
    }[],
    hero: ImageType | null,
    avatar: ImageType | null,
}

export type ArtistType = ArtistGroupType & ArtistPersonType


export interface CollectionType {
    _id: string,
    name: string,
    aka: string[]
    description: string
    releaseDates: string,
    contentType: ContentTypeType,
    hero: ImageType | null,
    avatar: ImageType | null,
    genres: GenreType[],
    artists: ArtistType[]
    publications: PublicationType[]
    songs: {
        position: number
        song: ItemType
    }[]
}
