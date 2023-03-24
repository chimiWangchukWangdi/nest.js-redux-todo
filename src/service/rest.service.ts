import { APIErrorResponse, APIResponse, RestMethods } from "@/model";
import isUrl from "validator/lib/isURL";

//setup api base url window.origin is used as fallback
const apiBaseUrl = (function (self, global) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) throw new Error("api url is not defined");
  let apiBaseUrl = "";
  const isAbsoluteUrl = isUrl(baseUrl);
  if (!isAbsoluteUrl) {
    apiBaseUrl = baseUrl;
  } else {
    try {
      apiBaseUrl = (global ?? self).origin + baseUrl;
    } catch (ex) {
      throw new Error("baseUrl not defined");
    }
  }
  return apiBaseUrl;
})(typeof window !== "undefined" ? window : global, globalThis);

/**
 * Wrapper around window.fetch.
 * Response are wrapped in error or data object for convenience
 */
/**
 * @param url The api endpoint
 * @param method The http verb
 * @param init{ RequestInit} Fetch api config
 * @param absoluteUrl
 * @param withCredentials
 */
export const FetchAPI = async <T, E = any>(
  url: string,
  method: RestMethods,
  init?: RequestInit & { query?: Record<string, any> },
  absoluteUrl = false,
  withCredentials = true
): Promise<APIResponse<T> | APIErrorResponse<E>> => {
  const urlWithQueryParams = new URL(
    absoluteUrl ? url : "",
    absoluteUrl ? undefined : apiBaseUrl + url
  );
  if (init?.query) {
    Object.entries(init.query).forEach(([key, value]) => {
      value && urlWithQueryParams.searchParams.set(key, value);
    });
  }

  return window
    .fetch(urlWithQueryParams.toString(), {
      method,
      ...init,
      credentials: withCredentials ? "include" : "same-origin",
    })
    .then(async (response) => {
      if (response.ok || response.status < 400) {
        const json = await response.json();
        return { data: json } as APIResponse<T>;
      }
      // convert non-2xx HTTP responses into errors:
      const json = await response.json();
      return Promise.resolve<APIErrorResponse>({ error: json });
    })
    .catch(() => {
      return Promise.resolve<APIErrorResponse>({
        error: {
          errors: ["We are unable to process your request at this time!"],
        },
      });
    });
};
