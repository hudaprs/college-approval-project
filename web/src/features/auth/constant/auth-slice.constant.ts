// Interfaces
import { IAuthSliceInitialState } from '@/features/auth/interfaces/auth-slice.interface'

export const AUTH_SLICE_INITIAL_STATE: IAuthSliceInitialState = {
  auth_authenticatedUser: {
    id: null,
    company_id: null,
    name: null,
    role: null,
    email: null,
    phone_number: null
  },
  auth_token: {
    token: null
  }
}
