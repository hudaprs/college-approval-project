// Styled Components
import styled from 'styled-components'

// Antd
import { DatePicker } from 'antd'

// Interfaces
import { IAppBaseDatePickerProps } from './interfaces'

// Constants
import {
  APP_COLOR,
  APP_COLOR_LIGHT
} from '@/features/app/constant/app-style.constant'

export const AppBaseDatePicker = styled((props: IAppBaseDatePickerProps) => (
  <DatePicker {...props} inputReadOnly />
))`
  background-color: ${props =>
    props?.backgroundColor
      ? props.backgroundColor
      : APP_COLOR_LIGHT.BACKGROUND} !important;
  height: ${props => (props?.height ? `${props.height}px` : '50px')};
  width: ${props => (props?.width ? `${props.width}px` : '100%')};
  border-radius: 10px;
  font-size: 14.22px;
  color: ${APP_COLOR.DARK};
`
