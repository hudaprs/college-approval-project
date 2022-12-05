// Redux Toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Constant
import { AUTH_SLICE_INITIAL_STATE } from '@/features/auth/constant/auth-slice.constant'

// Interfaces
import {
  IAuthToken,
  IAuthAuthenticatedUser
} from '@/features/auth/interfaces/auth.interface'

const auth = createSlice({
  name: 'auth',
  initialState: AUTH_SLICE_INITIAL_STATE,
  reducers: {
    auth_SET_TOKEN: (
      state,
      { payload: { token, refresh_token } }: PayloadAction<IAuthToken>
    ): void => {
      state.auth_token.token = token
      state.auth_token.refresh_token = refresh_token
    },
    auth_SET_AUTHENTICATED_USER: (
      state,
      { payload }: PayloadAction<IAuthAuthenticatedUser>
    ): void => {
      state.auth_authenticatedUser = payload
    },
    auth_SET_PROFILE_COMPLETED: (
      state,
      { payload }: PayloadAction<boolean>
    ): void => {
      state.auth_isProfileCompleted = payload
    },
    auth_LOGOUT: state => {
      state.auth_token = AUTH_SLICE_INITIAL_STATE.auth_token
      state.auth_isProfileCompleted =
        AUTH_SLICE_INITIAL_STATE.auth_isProfileCompleted
      state.auth_authenticatedUser =
        AUTH_SLICE_INITIAL_STATE.auth_authenticatedUser
    }
  }
})

// Mutations
export const {
  auth_SET_TOKEN,
  auth_SET_AUTHENTICATED_USER,
  auth_SET_PROFILE_COMPLETED,
  auth_LOGOUT
} = auth.actions

export default auth.reducer
