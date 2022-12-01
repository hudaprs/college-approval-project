// React
import { memo, useMemo } from 'react'

// Components
import {
  StyledWrapper,
  StyledContainer,
  StyledFormContainer,
  StyledBanner
} from './components'
import { AppBaseLabel, AppRouteWrapper } from '@/features/app/components'

// i18n
import { useTranslation } from 'react-i18next'

// Assets
import AppImage from '@/assets/images/app.png'
import LoginImage from '@/assets/images/auth/login.png'
import RegisterImage from '@/assets/images/auth/register.png'

// React Router DOM
import { useLocation } from 'react-router-dom'

const AppLayoutAuth = memo(() => {
  // Hook
  const { t } = useTranslation()
  const location = useLocation()
  const isLoginPath = useMemo(() => {
    return location.pathname.includes('login')
  }, [location.pathname])

  return (
    <StyledWrapper>
      <StyledContainer>
        <StyledFormContainer>
          {/* Header & Icon - Left Side */}
          <div
            className='flex flex-col items-center gap-8 mb-4'
            data-testid='auth-layout-left-side'
          >
            <img src={AppImage} alt='App' width={'90px'} height={'55.5px'} />

            <AppBaseLabel isBold fontSize={26}>
              {t(`auth.${isLoginPath ? 'login' : 'register'}`)}
            </AppBaseLabel>
          </div>

          {/* Content Here */}
          <AppRouteWrapper />
        </StyledFormContainer>

        {/* Banner - Right Side */}
        <StyledBanner data-testid='auth-layout-right-side'>
          <img
            src={isLoginPath ? LoginImage : RegisterImage}
            alt='App'
            width={'647px'}
            height={'602px'}
          />
        </StyledBanner>
      </StyledContainer>
    </StyledWrapper>
  )
})

AppLayoutAuth.displayName = 'AppLayoutAuth'

export { AppLayoutAuth }
