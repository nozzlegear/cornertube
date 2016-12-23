declare module "youtube" {
    export interface BaseObject {
        kind: string;
        etag: string;
    }

    export interface PageInfo {
        totalResults: number;
        resultsPerPage: number;
    }

    export interface Thumbnail {
        url: string;
        width: number;
        height: number;
    }

    export interface Thumbnails {
        default: Thumbnail;
        medium: Thumbnail;
        high: Thumbnail;
        standard: Thumbnail;
        maxres: Thumbnail;
    }

    export interface Localized {
        title: string;
        description: string;
    }

    export interface VideoSnippet {
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;
        thumbnails: Thumbnails;
        channelTitle: string;
        tags: string[];
        categoryId: string;
        liveBroadcastContent: "none" | string;
        defaultLanguage: string;
        localized: Localized;
        defaultAudioLanguage: string;
    }

    export interface ContentDetails {
        duration: string,
        dimension: string,
        definition: string,
        caption: string,
        licensedContent: boolean,
        projection: string
    }

    export interface Video extends BaseObject {
        id?: string;
        snippet?: VideoSnippet;
        contentDetails?: ContentDetails;
    }

    export interface VideoListResponse extends BaseObject {
        nextPageToken?: string;
        prevPageToken?: string;
        pageInfo: PageInfo;
        items: Video[];
    }
}