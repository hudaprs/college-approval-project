// React
import { useCallback } from 'react'

// Components
import {
  AppBaseButton,
  AppBaseDivider,
  AppBaseFormItem,
  AppBaseLabel,
  AppBaseInput
} from '@/features/app/components'

// i18n
import { useTranslation } from 'react-i18next'

// Constant
import { APP_COLOR_LIGHT } from '@/features/app/constant/app-style.constant'

// Antd
import { Form } from 'antd'

// React Router DOM
import { useNavigate } from 'react-router-dom'

// Interfaces
import { IAuthLoginForm } from '@/features/auth/interfaces/auth.interface'

// Custom Hooks
import { useAppDispatch } from '@/features/app/hooks/app.hook'
import { useAuth } from '@/features/auth/hooks/auth.hook'

const AuthLogin = () => {
  // Hook
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const { auth_login, auth_isLoginLoading, auth_SET_TOKEN } = useAuth()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  /**
   * @description Redirect to register
   *
   * @return {void} void
   */
  const onRedirectToRegister = useCallback((): void => {
    navigate('/auth/register')
  }, [navigate])

  /**
   * @description Login handler
   *
   * @param {IAuthLoginForm} form
   *
   * @return {Promise<void>} Promise<void>
   */
  const onSubmit = useCallback(
    async (form: IAuthLoginForm): Promise<void> => {
      try {
        const { results } = await auth_login({ body: form }).unwrap()

        dispatch(auth_SET_TOKEN(results))
      } catch (_) {
        //
      }
    },
    [dispatch, auth_SET_TOKEN, auth_login]
  )

  return (
    <div data-testid='auth-login'>
      {/* Divider */}
      <div className='mt-4 w-full'>
        <AppBaseDivider />
      </div>

      {/* Form */}
      <Form
        form={form}
        onFinish={onSubmit}
        layout='vertical'
        requiredMark={false}
      >
        {/* Email */}
        <AppBaseFormItem
          name='email'
          label={t('app.user.email')}
          rules={[{ required: true, type: 'email' }]}
        >
          <AppBaseInput placeholder='example@gmail.com' />
        </AppBaseFormItem>

        {/* Password */}
        <AppBaseFormItem
          name='password'
          label={t('app.user.password')}
          rules={[{ required: true, type: 'string' }]}
        >
          <AppBaseInput
            type='password'
            placeholder={`${t('app.user.password')}`}
          />
        </AppBaseFormItem>

        {/* Login Button */}
        <AppBaseButton
          type='primary'
          htmlType='submit'
          height={50}
          loading={auth_isLoginLoading}
          block
        >
          {t('auth.login')}
        </AppBaseButton>

        {/* Information if user didn't have account */}
        <div className='flex items-center gap-1 mt-5 justify-center'>
          <AppBaseLabel fontSize={16}>{t('auth.notHaveAccount')}?</AppBaseLabel>
          <AppBaseLabel
            fontColor={APP_COLOR_LIGHT.PRIMARY}
            className='cursor-pointer'
            onClick={onRedirectToRegister}
            fontSize={16}
            data-testid='register-button'
          >
            {t('auth.newAccount')}
          </AppBaseLabel>
        </div>
      </Form>
    </div>
  )
}

export { AuthLogin }
