// Styled Components
import styled from 'styled-components'

// Styled Components
import { Select } from 'antd'

// Interfaces
import { IAppBaseSelectProps } from './interfaces'

// Lodash
import omit from 'lodash.omit'

// Constants
import {
  APP_COLOR,
  APP_COLOR_LIGHT
} from '@/features/app/constant/app-style.constant'

export const AppBaseSelect = styled((props: IAppBaseSelectProps) => (
  <Select
    {...omit(props, ['backgroundColor', 'height', 'width'])}
    style={{ height: 200 }}
  />
))`
  height: ${props => (props?.height ? `${props.height}px` : '50px')} !important;
  width: ${props => (props?.width ? `${props.width}px` : '100%')} !important;
  background-color: ${props =>
    props?.backgroundColor
      ? props.backgroundColor
      : APP_COLOR_LIGHT.BACKGROUND} !important;
  border-radius: 10px;
  font-size: 14.22px;
  color: ${APP_COLOR.DARK};
`
