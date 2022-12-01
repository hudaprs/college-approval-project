// React
import { memo, useMemo, useCallback } from 'react'

// Components
import { AppRouteWrapper } from '@/features/app/components/AppRouteWrapper'
import {
  AppBaseLayout,
  AppBaseLayoutSider,
  AppBaseLayoutContent,
  AppBaseMenu,
  AppBaseLabel,
  appBaseModalConfirm
} from '@/features/app/components'
import {
  StyledUserInformation,
  StyledUserImage,
  StyledLogoutIcon
} from './components'

// Antd
import { MenuProps } from 'antd'
import {
  BarChartOutlined,
  DashboardOutlined,
  PartitionOutlined,
  ProjectOutlined
} from '@ant-design/icons'

// i18n
import { useTranslation } from 'react-i18next'

// React Router DOM
import { useNavigate, useLocation } from 'react-router-dom'

// Custom Hooks
import { useAppDispatch } from '@/features/app/hooks/app.hook'

// Utils
import { notificationUtils_open } from '@/features/app/utils/notification.utils'

// Custom Hooks
import { useAuth } from '@/features/auth/hooks/auth.hook'

// Assets
import AppImage from '@/assets/images/app.png'
import LogoutIcon from '@/assets/images/icon/logout.png'

const AppLayoutBackOffice = memo(() => {
  // Hook
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const {
    auth_authenticatedUserName,
    auth_authenticatedUserRole,
    auth_LOGOUT
  } = useAuth()
  const menuItems = useMemo((): MenuProps['items'] => {
    return [
      {
        key: '/back-office/dashboard',
        icon: <DashboardOutlined />,
        label: t('app.menu.dashboard'),
        onClick: () => navigate('/back-office/dashboard')
      },
      {
        key: '/back-office/master',
        icon: <PartitionOutlined />,
        label: t('app.menu.master.master'),
        children: [
          {
            key: '/back-office/master/companies',
            label: t('app.menu.master.company'),
            onClick: () => navigate('/back-office/master/companies')
          }
        ]
      },
      {
        key: '/back-office/project-management',
        icon: <ProjectOutlined />,
        label: t('app.menu.projectManagement.projectManagement'),
        children: [
          {
            key: '/back-office/project-management/projects',
            label: t('app.menu.projectManagement.project'),
            onClick: () => navigate('/back-office/project-management/projects')
          }
        ]
      },
      {
        key: '/back-office/project-transaction',
        icon: <BarChartOutlined />,
        label: t('app.menu.projectTransaction'),
        onClick: () => navigate('/back-office/project-transaction')
      }
    ]
  }, [t, navigate])
  const selectedMenuItem = useMemo((): string | undefined => {
    return menuItems
      ?.find(menuItem => menuItem?.key?.toString()?.includes(location.pathname))
      ?.key?.toString()
  }, [location.pathname, menuItems])

  /**
   * @description Logout user
   *
   * @return {void} void
   */
  const onLogout = useCallback((): void => {
    appBaseModalConfirm({
      title: t('auth.ask.logout'),
      onOk() {
        dispatch(auth_LOGOUT())

        notificationUtils_open('success', {
          message: t('app.alert.logoutSuccess')
        })
      },
      onCancel() {
        //
      }
    })
  }, [dispatch, auth_LOGOUT, t])

  return (
    <AppBaseLayout
      style={{ display: 'flex', overflowX: 'auto', minHeight: '100vh' }}
    >
      {/* Sidebar */}
      <AppBaseLayoutSider collapsed={false} width={250}>
        <div className='flex w-full flex-col justify-between'>
          <div style={{ minHeight: '90vh' }}>
            {/* Sidebar - Header */}
            <div className='flex items-center justify-center flex-col gap-4 mt-4 mb-4'>
              <img src={AppImage} alt='App' width={'70px'} height={'32px'} />
              <h1>Project Approval</h1>
            </div>

            {/* Sidebar - Items */}
            <AppBaseMenu
              mode='inline'
              defaultSelectedKeys={[selectedMenuItem || '']}
              items={menuItems}
            />
          </div>

          <StyledUserInformation
            style={{
              minHeight: '10vh'
            }}
          >
            {/* Image */}
            <StyledUserImage src='https://picsum.photos/45/43' alt='Profile' />

            {/* Credentials */}
            <div className='flex items-center flex-col'>
              <AppBaseLabel fontSize={12.64}>
                {auth_authenticatedUserName}
              </AppBaseLabel>
              <AppBaseLabel fontSize={11.24} isLight>
                {auth_authenticatedUserRole}
              </AppBaseLabel>
            </div>

            {/* Logout */}
            <StyledLogoutIcon src={LogoutIcon} onClick={onLogout} />
          </StyledUserInformation>
        </div>
      </AppBaseLayoutSider>
      <AppBaseLayout isContent collapsed={false}>
        <AppBaseLayoutContent>
          <AppRouteWrapper />
        </AppBaseLayoutContent>
      </AppBaseLayout>
    </AppBaseLayout>
  )
})

AppLayoutBackOffice.displayName = 'AppLayoutBackOffice'

export { AppLayoutBackOffice }
