import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import type { RootState } from "@/stores/store";
import { clearCredentials, setCredentials } from "@/stores/authSlice";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || "http://localhost:3000/v1",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token =
      state.auth.accessToken || localStorage.getItem("access_token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("ngrok-skip-browser-warning", "true");
    }

    headers.set("Content-Type", "application/json");
    return headers;
  },
});

const baseQueryWithWorkspaceAndReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const state = api.getState() as RootState;
  const workspaceId = state.workspace?.selectedWorkspace?.id;

  let modifiedArgs: FetchArgs =
    typeof args === "string" ? { url: args } : { ...args };

  const explicitUseWorkspace = (modifiedArgs as any).useworkspace === true;

  if (explicitUseWorkspace && workspaceId) {
    modifiedArgs.url = `/workspace/${workspaceId}${modifiedArgs.url}`;
  }

  delete (modifiedArgs as any).useworkspace;

  let result = await rawBaseQuery(modifiedArgs, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken =
      state.auth.refreshToken || localStorage.getItem("refresh_token");

    if (!refreshToken) {
      api.dispatch(clearCredentials());
      return result;
    }

    const refreshResult = await rawBaseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
        body: { refresh_token: refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult.data && !refreshResult.error) {
      const data = refreshResult.data as {
        access_token: string;
        refresh_token: string;
      };

      api.dispatch(
        setCredentials({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        })
      );

      result = await rawBaseQuery(modifiedArgs, api, extraOptions);
    } else {
      api.dispatch(clearCredentials());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithWorkspaceAndReauth,
  tagTypes: ["Auth", "Session", "Profile", "Workspace"],
  endpoints: () => ({}),
});
