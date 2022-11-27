// Interfaces
import {
  IAuthAttrsLogin,
  IAuthAttrsRegister
} from '@/features/auth/interfaces/auth-attrs.interface'
import {
  IAuthResponseToken,
  IAuthResponseAuthenticatedUser
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
    })
  }),
  overrideExisting: false
})

export const {
  useAuth_registerMutation,
  useAuth_loginMutation,
  useLazyAuth_meQuery
} = authApi
