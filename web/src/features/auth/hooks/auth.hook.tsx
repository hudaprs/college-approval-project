// React
import { useMemo } from 'react'

// Custom Hooks
import { useAppSelector } from '@/features/app/hooks/app.hook'

// Mutations
import {
  auth_SET_AUTHENTICATED_USER,
  auth_SET_PROFILE_COMPLETED,
  auth_SET_TOKEN,
  auth_LOGOUT
} from '@/features/auth/redux/auth.slice'

// Rtk
import {
  useAuth_completeProfileMutation,
  useAuth_fetchCompanyListMutation,
  useAuth_loginMutation,
  useAuth_registerMutation,
  useLazyAuth_checkProfileQuery,
  useLazyAuth_meQuery
} from '@/features/auth/redux/auth.rtk'

const useAuth = () => {
  // Hook
  const auth_token = useAppSelector(state => state.auth.auth_token.token)
  const auth_authenticatedUserId = useAppSelector(
    state => state.auth.auth_authenticatedUser.id
  )
  const auth_authenticatedUserName = useAppSelector(
    state => state.auth.auth_authenticatedUser.name
  )
  const auth_authenticatedUserEmail = useAppSelector(
    state => state.auth.auth_authenticatedUser.email
  )
  const auth_authenticatedUserRole = useAppSelector(
    state => state.auth.auth_authenticatedUser.role
  )
  const auth_isProfileCompleted = useAppSelector(
    state => state.auth.auth_isProfileCompleted
  )
  const auth_isAuthenticated = useMemo((): boolean => {
    return Boolean(auth_token) || false
  }, [auth_token])

  // Login
  const [auth_login, { isLoading: auth_isLoginLoading }] =
    useAuth_loginMutation()

  // Register
  const [auth_register, { isLoading: auth_isRegisterLoading }] =
    useAuth_registerMutation()

  // Get authenticated user
  const [
    auth_getAuthenticatedUser,
    { isLoading: auth_isGetAuthenticatedUserLoading }
  ] = useLazyAuth_meQuery()

  // Profile check
  const [auth_profileCheck, { isLoading: auth_isProfileCheckLoading }] =
    useLazyAuth_checkProfileQuery()

  // Get company list
  const [
    auth_fetchCompanyList,
    {
      isLoading: auth_isCompanyListLoading,
      data: auth_companyList,
      reset: auth_resetCompanyList
    }
  ] = useAuth_fetchCompanyListMutation()

  // Complete profile
  const [auth_completeProfile, { isLoading: auth_isCompleteProfileLoading }] =
    useAuth_completeProfileMutation()

  return {
    // State
    auth_token,
    auth_authenticatedUserId,
    auth_authenticatedUserName,
    auth_authenticatedUserEmail,
    auth_authenticatedUserRole,
    auth_isAuthenticated,
    auth_isProfileCompleted,

    // Mutation
    auth_SET_AUTHENTICATED_USER,
    auth_SET_PROFILE_COMPLETED,
    auth_SET_TOKEN,
    auth_LOGOUT,

    // Rtk
    auth_login,
    auth_register,
    auth_getAuthenticatedUser,
    auth_profileCheck,
    auth_fetchCompanyList,
    auth_completeProfile,
    auth_resetCompanyList,
    auth_isLoginLoading,
    auth_isRegisterLoading,
    auth_isGetAuthenticatedUserLoading,
    auth_isProfileCheckLoading,
    auth_isCompanyListLoading,
    auth_isCompleteProfileLoading,
    auth_companyList
  }
}

export { useAuth }
