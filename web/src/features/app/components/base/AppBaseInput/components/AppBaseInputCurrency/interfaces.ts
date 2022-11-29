// React Currency Input Props
import { CurrencyInputProps } from 'react-currency-input-field'

// Constants
import {
  APP_COLOR_LIGHT,
  APP_COLOR
} from '@/features/app/constant/app-style.constant'

export interface IAppBaseInputCurrencyProps extends CurrencyInputProps {
  backgroundColor?: APP_COLOR | APP_COLOR_LIGHT
  height?: number
  width?: number
  placeholder?: string
}
