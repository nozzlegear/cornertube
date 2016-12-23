import inspect from "logspect";
import isOkay from "./axios_utils";
import { resolve, reject } from "bluebird";
import { VideoListResponse } from "youtube";
import Axios, { AxiosResponse } from "axios";

export interface Keys {
    /**
     * The application's YouTube API Key.
     */
    key: string;

    /**
     * A YouTube OAuth access token.
     */
    access_token?: string;
}

export class ApiError extends Error {
    constructor(body?: string | Object, axiosResponse?: AxiosResponse) {
        super("Something went wrong and your request could not be completed.");

        if (!!axiosResponse) {
            this.unauthorized = axiosResponse.status === 401;
            this.status = axiosResponse.status;
            this.statusText = axiosResponse.statusText;

            if (body) {
                try {
                    const response: { message: string, details: { key: string, errors: string[] }[] } = typeof (body) === "string" ? JSON.parse(body || "{}") : body;

                    this.message = Array.isArray(response.details) ? response.details.map(e => e.errors.join(", ")).join(", ") : response.message;
                    this.details = response.details;
                } catch (e) {
                    inspect("Could not read response's error JSON.", body);
                }
            }
        } else {
            // A network error occurred.
            this.status = 503;
            this.statusText = "Service Unavailable";
            this.unauthorized = false;
        }
    }

    public unauthorized: boolean;

    public status: number;

    public statusText: string;

    public details?: any;
}

export default class BaseService {
    constructor(private basePath: string, private keys: { key: string, access_token?: string }) { }

    protected async sendRequest<T>(path: string, method: "POST" | "PUT" | "GET" | "DELETE", bodyData?: any, qsData?: any) {
        const url = `${this.basePath}/${path}`.replace(/\/\/+/i, "/");
        const keys = this.keys;
        const request = Axios({
            url,
            method: method,
            headers: {
                "Content-Type": bodyData ? "application/json" : undefined,
            },
            params: { ...qsData, ...keys },
            data: bodyData,
        });

        let result: AxiosResponse;
        let body: T;

        try {
            result = await request;
            body = result.data;
        }
        catch (e) {
            // Axios was configured to only throw an error when a network error is encountered.
            inspect(`There was a problem the fetch operation for ${url}`, e);

            throw new ApiError();
        }

        if (!isOkay(result)) {
            throw new ApiError(body, result);
        }

        return body;
    }
}

export class YouTube extends BaseService {
    constructor(key: string, access_token?: string) {
        super("https://www.googleapis.com/youtube/v3/videos", { key, access_token });
    }

    public getMostPopular = (options: { part: string, chart: "mostpopular", id?: string, maxResults?: number, pageToken?: string; }) => this.sendRequest<VideoListResponse>("", "GET", undefined, options);
}