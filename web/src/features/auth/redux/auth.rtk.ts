// Interfaces
import {
  IAuthAttrsCompleteProfileForm,
  IAuthAttrsLogin,
  IAuthAttrsRegister
} from '@/features/auth/interfaces/auth-attrs.interface'
import {
  IAuthResponseToken,
  IAuthResponseAuthenticatedUser,
  IAuthResponseCheckProfile,
  IAuthResponseCompleteProfile,
  IAuthResponseCompanyList
} from '@/features/auth/interfaces/auth-response.interface'

// Rtk
import { emptySplitApi } from '@/features/app/redux/app.rtk'

export const authApi = emptySplitApi.injectEndpoints({
  endpoints: builder => ({
    auth_register: builder.mutation<
      IAuthResponseAuthenticatedUser,
      IAuthAttrsRegister
    >({
      query: ({ body }) => ({
        url: '/v1/auth/register',
        method: 'POST',
        body
      })
    }),
    auth_login: builder.mutation<IAuthResponseToken, IAuthAttrsLogin>({
      query: ({ body }) => ({
        url: '/v1/auth/login',
        method: 'POST',
        body
      })
    }),
    auth_me: builder.query<IAuthResponseAuthenticatedUser, void>({
      query: () => ({
        url: `/v1/auth/me`
      })
    }),
    auth_checkProfile: builder.query<IAuthResponseCheckProfile, void>({
      query: () => ({
        url: '/v1/auth/check-profile'
      })
    }),
    auth_fetchCompanyList: builder.mutation<IAuthResponseCompanyList, void>({
      query: () => ({
        url: '/v1/auth/companies'
      })
    }),
    auth_completeProfile: builder.mutation<
      IAuthResponseCompleteProfile,
      IAuthAttrsCompleteProfileForm
    >({
      query: ({ body }) => ({
        url: '/v1/auth/complete-profile',
        method: 'PATCH',
        body
      })
    })
  }),
  overrideExisting: false
})

export const {
  useAuth_registerMutation,
  useAuth_loginMutation,
  useLazyAuth_meQuery,
  useLazyAuth_checkProfileQuery,
  useAuth_fetchCompanyListMutation,
  useAuth_completeProfileMutation
} = authApi
