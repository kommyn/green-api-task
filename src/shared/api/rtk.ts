import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { env } from "@shared/config";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: env.apiBase,
  }),
  endpoints: () => ({}),
});
