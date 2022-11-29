// Styled Components
import styled from 'styled-components'

// Antd
import { Input } from 'antd'

// Constant
import {
  APP_COLOR,
  APP_COLOR_LIGHT
} from '@/features/app/constant/app-style.constant'

// Interfaces
import { IAppBaseInputProps } from '@/features/app/components/base/AppBaseInput/interfaces'

// Lodash
import omit from 'lodash/omit'

// Components
import { AppBaseInputCurrency } from './components'

const BLACKLIST_PROPS = [
  'backgroundColor',
  'height',
  'width',
  'onSearch',
  'loading'
]

const AppBaseInput = styled((props: IAppBaseInputProps) => (
  <Input {...omit(props, [...BLACKLIST_PROPS])} />
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

const AppBaseInputSearch = styled((props: IAppBaseInputProps) => (
  <Input.Search
    {...omit(
      props,
      [...BLACKLIST_PROPS].filter(list => list !== 'onSearch')
    )}
  />
))``

const AppBaseInputTextArea = styled(props => (
  <Input.TextArea {...omit(props, [...BLACKLIST_PROPS])} />
))`
  &:not(.ant-input-status-error) {
    border: none;
  }

  background-color: ${props =>
    props?.backgroundColor || APP_COLOR_LIGHT.BACKGROUND} !important;
  height: ${props => (props?.height ? `${props.height}px` : '50px')};
  width: ${props => (props?.width ? `${props.width}px` : '100%')};
  border-radius: 10px;
  font-size: 14.22px;
  color: ${APP_COLOR.DARK};
`

export {
  AppBaseInput,
  AppBaseInputSearch,
  AppBaseInputTextArea,
  AppBaseInputCurrency
}
