// Constant
import { AUTH_ROLE } from '@/features/auth/constant/auth-role.constant'

export interface IAuthToken {
  token: string | null
}

export interface IAuthAuthenticatedUser {
  id: number | null
  company_id: number | null
  name: string | null
  role: AUTH_ROLE | null
  email: string | null
  phone_number: string | null
}

export interface IAuthLoginForm {
  email: string
  password: string
}

export interface IAuthRegisterForm {
  name: string
  email: string
  password: string
}
