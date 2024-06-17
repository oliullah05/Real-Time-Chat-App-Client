import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const baseApi = createApi({
    reducerPath:"api",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_IMGBB_BASE_API}`,
        prepareHeaders: (headers) => {
           
            headers.set("authorization",JSON.parse(localStorage.getItem("auth") as string) as string)
            return headers
        }
    }),
    tagTypes: [],
    endpoints: () => ({}),
})