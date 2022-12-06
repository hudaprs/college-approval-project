// React
import { Suspense, useCallback, useEffect, useState } from 'react'

// Router
import { useRouter } from '@/plugins'

// Antd
import { ConfigProvider as AntdConfigProvider, Form } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'

// Custom Hooks
import { useAppDispatch } from '@/features/app/hooks/app.hook'
import { useApp } from '@/features/app/hooks/app.hook'
import { useAuth } from '@/features/auth/hooks/auth.hook'

// Constant
import { APP_LANGUAGE_LIST } from '@/features/app/constant/app.constant'
import { validateMessages } from '@/features/app/constant/validation'

// i18n
import i18n from 'i18next'

// Moment
import moment from 'moment'
import 'moment/locale/id'

// Utils
import { notificationUtils_open } from '@/features/app/utils/notification.utils'

// Components
import { ModalCompleteProfile } from './components'

// Interfaces
import { IAuthCompleteProfileForm } from '@/features/auth/interfaces/auth.interface'

const AppEntryPoint = () => {
  // Hook
  const routes = useRouter()
  const dispatch = useAppDispatch()
  const { app_locale } = useApp()
  const [isFirstTime, setIsFirstTime] = useState<boolean>(true)
  const [modal, setModal] = useState<{ isNotCompleteOpen: boolean }>({
    isNotCompleteOpen: false
  })
  const {
    auth_getAuthenticatedUser,
    auth_profileCheck,
    auth_fetchCompanyList,
    auth_completeProfile,
    auth_SET_AUTHENTICATED_USER,
    auth_SET_PROFILE_COMPLETED,
    auth_token,
    auth_isProfileCompleted,
    auth_isAuthenticated,
    auth_isCompanyListLoading,
    auth_isCompleteProfileLoading,
    auth_companyList
  } = useAuth()
  const [form] = Form.useForm()
  const isCompanyNotExists = Form.useWatch('is_company_not_exists', form)

  // Trigger any change in locale
  useEffect(() => {
    moment.locale(app_locale)
    i18n.changeLanguage(app_locale)
  }, [app_locale])

  /**
   * @description Handle modal
   *
   * @param {string} type
   * @param {boolean} value
   *
   * @return {void} void
   */
  const handleModal = useCallback(
    (type: 'isNotCompleteOpen', value: boolean): void => {
      setModal(previousModal => ({ ...previousModal, [type]: value }))
    },
    []
  )

  /**
   * @description Get authenticated user
   *
   * @return {Promise<void>} Promise<void>
   */
  const getAuthenticatedUser = useCallback(async (): Promise<void> => {
    try {
      const [
        { results: authenticatedUserResult },
        { results: checkProfileResult }
      ] = await Promise.all([
        auth_getAuthenticatedUser().unwrap(),
        auth_profileCheck().unwrap()
      ])

      // Check if profile not completed
      if (!checkProfileResult.is_completed) {
        // Throw message that user must complete the profile data
        notificationUtils_open('warning', {
          message: i18n.t('auth.warning.profileComplete')
        })

        handleModal('isNotCompleteOpen', true)
      }

      // Check if profile completed
      if (checkProfileResult.is_completed)
        handleModal('isNotCompleteOpen', false)

      dispatch(auth_SET_AUTHENTICATED_USER(authenticatedUserResult))
      dispatch(auth_SET_PROFILE_COMPLETED(checkProfileResult.is_completed))
    } catch (_) {
      //
    } finally {
      setIsFirstTime(() => false)
    }
  }, [
    auth_getAuthenticatedUser,
    auth_profileCheck,
    auth_SET_AUTHENTICATED_USER,
    auth_SET_PROFILE_COMPLETED,
    dispatch,
    handleModal
  ])

  /**
   * @description Handle complete profile
   *
   * @param {IAuthCompleteProfileForm} form
   *
   * @return {Promise<void>} Promise<void>
   */
  const onSubmit = useCallback(
    async (form: IAuthCompleteProfileForm): Promise<void> => {
      try {
        const completeProfileResponse = await auth_completeProfile({
          body: form
        }).unwrap()

        // Re-fetch authenticated user
        getAuthenticatedUser()

        notificationUtils_open('success', {
          message: completeProfileResponse.message
        })
      } catch (_) {
        //
      }
    },
    [auth_completeProfile, getAuthenticatedUser]
  )

  // Trigger auth when user already logged in
  useEffect(() => {
    if (auth_token) getAuthenticatedUser()
  }, [auth_token, getAuthenticatedUser])

  // Check if user already visit this page and loaded all data
  // NOTE: Check if user need to complete the profile first
  useEffect(() => {
    if (!isFirstTime && !auth_isProfileCompleted) {
      auth_fetchCompanyList()
    }

    // eslint-disable-next-line
  }, [isFirstTime, auth_fetchCompanyList])

  // Check if there any change in isCompanyNotExists
  useEffect(() => {
    if (!isFirstTime) {
      // Check if user choose company exists
      if (!isCompanyNotExists && auth_isAuthenticated) auth_fetchCompanyList()
      else form.setFieldValue('company', undefined)
    }

    // eslint-disable-next-line
  }, [isCompanyNotExists, auth_fetchCompanyList, auth_isAuthenticated])

  return (
    <AntdConfigProvider
      locale={APP_LANGUAGE_LIST[app_locale]}
      form={{ validateMessages: validateMessages[app_locale] }}
      theme={{
        token: { colorPrimary: '#3a36db' }
      }}
    >
      <StyleProvider hashPriority='high'>
        {/* Modal Complete Profile */}
        <ModalCompleteProfile
          form={form}
          title={i18n.t('auth.title.profileComplete')}
          open={modal.isNotCompleteOpen}
          confirmLoading={
            auth_isCompanyListLoading || auth_isCompleteProfileLoading
          }
          selectList={{
            companyList: auth_companyList?.results || []
          }}
          selectLoading={{
            isCompanyListLoading: auth_isCompanyListLoading
          }}
          isCompanyNotExists={isCompanyNotExists}
          onSubmit={onSubmit}
          closable={false}
          cancelButtonProps={{ style: { display: 'none' } }}
        />

        {/* Lazy Load Routes */}
        <Suspense fallback={'Loading...'}>{routes}</Suspense>
      </StyleProvider>
    </AntdConfigProvider>
  )
}

export { AppEntryPoint }
