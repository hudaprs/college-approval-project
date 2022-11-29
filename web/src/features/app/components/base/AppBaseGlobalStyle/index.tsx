// Styled Components
import { createGlobalStyle } from 'styled-components'

// Constant
import { APP_COLOR_LIGHT } from '@/features/app/constant/app-style.constant'

const styled = { createGlobalStyle }

const AppBaseGlobalStyle = styled.createGlobalStyle`
  @font-face {
    font-family: 'DMSans-Regular';
    src: url('/src/assets/fonts/DMSans-Regular.ttf') format('truetype');
  }

  body {
    font-family: 'DmSans-Regular', Arial, Helvetica, sans-serif;
    background-color: ${APP_COLOR_LIGHT.BACKGROUND} !important;
  }
`

export { AppBaseGlobalStyle }
