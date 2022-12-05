// Constant
import { AUTH_ROLE } from '@/features/auth/constant/auth-role.constant'

export interface IAuthToken {
  token: string | null
  refresh_token: string | null
}

export interface IAuthCheckProfile {
  is_completed: boolean
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

export interface IAuthCompleteProfileForm {
  phone_number: string
  is_company_not_exists: boolean
  company?: number
  company_name?: string
  company_address?: string
  company_phone?: string
  company_mobile?: string
}
