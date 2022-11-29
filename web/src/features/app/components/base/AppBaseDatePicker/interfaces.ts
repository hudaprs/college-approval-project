// Antd
import {
  APP_COLOR,
  APP_COLOR_LIGHT
} from '@/features/app/constant/app-style.constant'
import { DatePickerProps } from 'antd'

export interface IAppBaseDatePickerProps
  extends Omit<DatePickerProps, 'backgroundColor' | 'height' | 'width'> {
  backgroundColor?: APP_COLOR | APP_COLOR_LIGHT
  height?: number
  width?: number
}
