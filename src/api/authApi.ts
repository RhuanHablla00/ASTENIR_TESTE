import { baseApi } from "./baseApi";
import type { AuthUser } from "@/stores/authSlice";
import { setCredentials, clearCredentials } from "@/stores/authSlice";
import { persistor } from "@/stores/store";

export interface AuthResponse {
  user: AuthUser;
  access_token: string;
  refresh_token: string;
  verification_token?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  otp?: string
}

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
}

export interface RefreshRequest {
  refresh_token: string;
}

export interface RefreshResponse {
  access_token: string;
  refresh_token: string;
}

export interface ForgotPasswordRequest {
  email: string;
}


export interface ForgotPasswordResponse {
  message: string;
  reset_token?: string;
  reset_token_hint?: string;
}

export interface ResetPasswordRequest {
  token: string;
  new_password: string;
}
export interface ResetPasswordAuthenticatedRequest {
  current_password: string
  new_password: string
}

export interface SimpleMessageResponse {
  message: string;
}

export interface SessionItem {
  refresh_id: string;
  created_at: string;
  expires_in_seconds: number;
}

export interface SessionsResponse {
  sessions: SessionItem[];
}

export interface MeResponse {
  id: string;
  email: string;
}

export interface RequestEmailVerificationResponse {
  message: string;
  verification_token?: string;
}

export interface VerifyEmailRequest {
  token: string | null;
}

export interface ErrorResponse {
  error_code: string;
  remaining_attempts?: number;
}

export interface VerifyOtpRequest {
  code: string;
}

export type Gender = "male" | "female" | "prefer_not_to_say" | null;

export type PhoneNumberType = "office" | "home" | null;

export interface ProfileResponse {
  id: string;

  name: string | null;
  date_of_birth: string | null;
  gender: Gender;

  email: string;

  phone: string | null;
  phone_type: PhoneNumberType;
  photo_url?: string;

  country: string | null;
  address_line_1: string | null;
  address_line_2: string | null;
  city: string | null;
  administrative_area: string | null;
  postal_code: string | null;
}

export interface UpdateProfileRequest {
  name?: string | null;
  date_of_birth?: string | null;
  gender?: Gender;
  photo?: string;
  phone?: string | null;
  phone_type?: PhoneNumberType;
  country?: string | null;
  address_line_1?: string | null;
  address_line_2?: string | null;
  city?: string | null;
  administrative_area?: string | null;
  postal_code?: string | null;
}

export interface ChangeEmailRequest {
  new_email: string;
  password: string;
}

export interface ChangeEmailResponse {
  message: string;
}

export interface EnableOtpResponse {
  qr_code_url: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({
              user: data.user,
              access_token: data.access_token,
              refresh_token: data.refresh_token,
            })
          );
        } catch {
        }
      },
    }),

    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({
              user: data.user,
              access_token: data.access_token,
              refresh_token: data.refresh_token,
            })
          );
        } catch {
        }
      },
    }),

    refresh: builder.mutation<RefreshResponse, RefreshRequest>({
      query: (body) => ({
        url: "/auth/refresh",
        method: "POST",
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({
              access_token: data.access_token,
              refresh_token: data.refresh_token,
            })
          );
        } catch {
          dispatch(clearCredentials());
        }
      },
    }),

    logout: builder.mutation<SimpleMessageResponse, { refresh_token: string }>({
      query: (body) => ({
        url: "/auth/logout",
        method: "POST",
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          const storedRefresh = localStorage.getItem("refresh_token");
          if (storedRefresh === arg.refresh_token) {
            dispatch(clearCredentials());
            persistor.purge()

          }
        } catch {
        }
      },
    }),

    logoutSession: builder.mutation<SimpleMessageResponse, { session_id: string }>({
      query: (body) => ({
        url: "/auth/logout/session",
        method: "POST",
        body,
      }),
    }),

    logoutAll: builder.mutation<SimpleMessageResponse, void>({
      query: () => ({
        url: "/auth/logout-all",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          dispatch(clearCredentials());
          persistor.purge();
        }
      },
      invalidatesTags: ["Session"],
    }),

    listSessions: builder.query<SessionsResponse, void>({
      query: () => ({
        // useworkspace: true,
        url: "/auth/sessions",
        method: "GET",
      }),
      providesTags: ["Session"],
    }),

    me: builder.query<MeResponse, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),

    profile: builder.query<ProfileResponse, void>({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),

    updateProfile: builder.mutation<ProfileResponse, UpdateProfileRequest>({
      query: (body) => ({
        url: "/auth/profile",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Auth", "Profile",],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            setCredentials({
              user: {
                id: data.id,
                email: data.email,
                name: data.name ?? undefined,
                photo_url: data.photo_url
              }
            })
          );
        } catch {
        }
      },
    }),

    changeEmail: builder.mutation<ChangeEmailResponse | ErrorResponse, ChangeEmailRequest>({
      query: (body) => ({
        url: "/auth/change-email",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),

    resetPasswordAuthenticated: builder.mutation<ForgotPasswordResponse, ResetPasswordAuthenticatedRequest>({
      query: (body) => ({
        url: "/auth/reset-password-authenticated",
        method: "PUT",
        body,
      }),
    }),

    resetPassword: builder.mutation<SimpleMessageResponse, ResetPasswordRequest>({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          dispatch(clearCredentials());
        }
      },
    }),

    requestEmailVerification: builder.mutation<RequestEmailVerificationResponse, void>({
      query: () => ({
        url: "/auth/request-email-verification",
        method: "POST",
      }),
    }),

    verifyEmail: builder.mutation<SimpleMessageResponse, VerifyEmailRequest>({
      query: (body) => ({
        url: "/auth/verify-email",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    enableOtp: builder.mutation<EnableOtpResponse, void>({
      query: () => ({
        url: "/auth/otp/enable",
        method: "PUT",
      }),
      invalidatesTags: ["Auth"],
    }),

    disableOtp: builder.mutation<SimpleMessageResponse, void>({
      query: () => ({
        url: "/auth/otp/disable",
        method: "PUT",
      }),
      invalidatesTags: ["Auth"],
    }),

    verifyOtp: builder.mutation<SimpleMessageResponse, VerifyOtpRequest>({
      query: (body) => ({
        url: "/auth/otp/verify",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    facebookBusiness: builder.query<any, { use_global: boolean }>({
      query: ({ use_global }) => ({
        useworkspace: true,
        url: "/meta/facebook-business",
        method: "GET",
        params: {
          use_global: use_global,
        },
      }),
    }),

    whatsappMesssaging: builder.query<any, { use_global: boolean }>({
      query: ({ use_global }) => ({
        useworkspace: true,
        url: "/meta/whatsapp-messsaging",
        method: "GET",
        params: {
          use_global: use_global,
        },
      }),
    }),
    
    fanpageInstagram: builder.query<any, { use_global: boolean }>({
      query: ({ use_global }) => ({
        useworkspace: true,
        url: "/meta/fanpage-instagram",
        method: "GET",
        params: {
          use_global: use_global,
        },
      }),
    }),

    facebookBusinessDisconnect: builder.mutation<SimpleMessageResponse, void>({
      query: () => ({
        useworkspace: true,
        url: "/meta/logout",
        method: "DELETE",
      }),
    }),


  }),
  overrideExisting: false,
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshMutation,
  useLogoutMutation,
  useLogoutAllMutation,
  useLogoutSessionMutation,
  useListSessionsQuery,
  useMeQuery,

  // PROFILE
  useProfileQuery,
  useUpdateProfileMutation,
  useChangeEmailMutation,

  useForgotPasswordMutation,
  useResetPasswordMutation,
  useResetPasswordAuthenticatedMutation,
  useRequestEmailVerificationMutation,
  useVerifyEmailMutation,
  useEnableOtpMutation,
  useVerifyOtpMutation,
  useDisableOtpMutation,
  useFacebookBusinessQuery,
  useWhatsappMesssagingQuery,
  useFanpageInstagramQuery,
  useFacebookBusinessDisconnectMutation,
} = authApi;