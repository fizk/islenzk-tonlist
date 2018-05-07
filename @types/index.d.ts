
export interface ImageType {
    url: string,
    base64: string,
}

export interface SongType {
    _id: string
    name: string
    description: string
    duration: number
    genres: GenreType[],
    appearsOn: AlbumType[]
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

export interface AlbumType {
    _id: string,
    name: string,
    aka: string[]
    description: string
    releaseDates: string,
    contentType: ContentTypeType,
    hero: ImageType
    avatar: ImageType
    genres: GenreType[],
    artists: ArtistType[]
    publications: PublicationType[]
    songs: {
        position: number
        song: SongType
    }[]
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
    albums: AlbumType[],
    compilations: AlbumType[],
    eps: AlbumType[],
    singles: AlbumType[],
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
    albums: AlbumType[],
    compilations: AlbumType[],
    eps: AlbumType[],
    singles: AlbumType[],
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
    aka: string[],
    description: string,
    releaseDates: string,
    genres: GenreType[],
    contentType: ContentTypeType,
    hero: ImageType | null,
    avatar: ImageType | null,
    artists: ArtistType[]
}
