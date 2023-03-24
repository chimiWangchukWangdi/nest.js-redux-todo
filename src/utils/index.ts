import { APIErrorResponse, APIResponse } from "@/model";

/**
 * Handles the common response structure of the API
 *
 * @template R - response data type
 * @template K - optional key in response data to return
 * @template E - error response type
 * @param {Promise<APIResponse<R>| APIErrorResponse<E>>} response - promise of API response or error
 * @param {any} thunk - The Redux thunk parameter object
 * @param {K} [key] - Optional key in the response data object to return
 * @returns {Promise<R[K] | void>} - Promise of response data or void in case of error
 */
export const commonResponseHandler = async <R, K extends keyof R, E=never>(response: Promise<APIResponse<R>| APIErrorResponse<E>>, thunk: any, key?: K,) => {
    const { data, error } = await response;
    if (data) {
        return (key ? data?.[ key ] : data);
    } else {
        return thunk.rejectWithValue(error.errors);
    }
};