// Styled Components
import styled from 'styled-components'

// Interfaces
import { IAppBaseInputCurrencyProps } from './interfaces'

// Constants
import {
  APP_COLOR,
  APP_COLOR_LIGHT
} from '@/features/app/constant/app-style.constant'

// React Currency Input Field
import CurrencyInput from 'react-currency-input-field'

const AppBaseInputCurrency = styled((props: IAppBaseInputCurrencyProps) => (
  <CurrencyInput {...props} />
))`
  padding: 4px 11px;
  background-color: ${props =>
    props?.backgroundColor || APP_COLOR_LIGHT.BACKGROUND} !important;
  height: ${props => (props?.height ? `${props.height}px` : '50px')};
  width: ${props => (props?.width ? `${props.width}px` : '100%')} !important;
  border-radius: 10px;
  font-size: 14.22px;
  color: ${APP_COLOR.DARK};
`

export { AppBaseInputCurrency }
