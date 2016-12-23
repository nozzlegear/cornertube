import inspect from "logspect";
import { resolve } from "path";
import { snakeCase } from "lodash";
import isBrowser from "is-in-browser";
import { v4 as guid } from "node-uuid";

// NODE_ENV is injected by webpack for the browser client.
declare const NODE_ENV: string;

const env = process && process.env || {};

export const APP_NAME = "CornerTube";

function get(baseKey: string, defaultValue = undefined) {
    const snakedAppName = snakeCase(APP_NAME).toUpperCase();
    const snakedKey = snakeCase(baseKey).toUpperCase();

    return env[`${snakedAppName}_${snakedKey}`] || env[`GEARWORKS_${snakedKey}`] || env[snakedKey] || defaultValue;
}

export const ISLIVE = env.NODE_ENV === "production";

export const IRON_PASSWORD = get("IRON_PASSWORD");

export const YOUTUBE_API_KEY = get("youtube_api_key");

export const YOUTUBE_OAUTH_CLIENT_ID = get("youtube_oauth_client_id");

export const YOUTUBE_OAUTH_CLIENT_SECRET = get("youtube_oauth_client_secret");

/**
 * A list of properties on a user or sessiontoken object that will be automatically sealed and unsealed by Iron.
 */
export const SEALABLE_USER_PROPERTIES = ["shopify_access_token"];

if (!isBrowser) {
    if (!IRON_PASSWORD) {
        inspect("Warning: IRON_PASSWORD was not found in environment variables. Session authorization will be unsecure and may exhibit unwanted behavior.");
    }
}