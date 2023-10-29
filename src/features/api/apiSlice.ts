import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://ticket4meapi.azurewebsites.net/api/v1";

export const apiSlice = createApi({
    reducerPath: "api",
    tagTypes: ["Categories"],
    endpoints: (builder) => ({}),
    baseQuery: fetchBaseQuery({ baseUrl }),
});