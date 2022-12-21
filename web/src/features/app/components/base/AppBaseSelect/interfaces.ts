// Antd
import { SelectProps } from 'antd'

// Interfaces
import {
  APP_COLOR,
  APP_COLOR_LIGHT
} from '@/features/app/constant/app-style.constant'

export interface IAppBaseSelectProps extends SelectProps {
  backgroundColor?: APP_COLOR | APP_COLOR_LIGHT
  width?: number
  height?: number
}
