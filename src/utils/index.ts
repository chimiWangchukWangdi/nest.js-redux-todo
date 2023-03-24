import { APIErrorResponse, APIResponse } from "@/model";

export const commonResponseHandler = async <R, K extends keyof R, E=never>(response: Promise<APIResponse<R>| APIErrorResponse<E>>, thunk: any, key?: K,) => {
    const { data, error } = await response;
    if (data) {
        return (key ? data?.[ key ] : data);
    } else {
        return thunk.rejectWithValue(error.errors);
    }
};