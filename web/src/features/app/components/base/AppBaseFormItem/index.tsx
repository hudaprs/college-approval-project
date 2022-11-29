// Styled Components
import styled from 'styled-components'

// Antd
import { Form } from 'antd'

// Constant
import { APP_COLOR } from '@/features/app/constant/app-style.constant'

// Interfaces
import { IAppBaseFormItemProps } from './interfaces'

// Lodash
import omit from 'lodash/omit'

const AppBaseFormItem = styled((props: IAppBaseFormItemProps) => (
  <Form.Item {...omit(props, ['labelColor', 'labelSize'])} />
))`
  .ant-form-item-label label {
    color: ${props => props?.labelColor || APP_COLOR.DARK};
    font-size: ${props => (props?.labelSize ? `${props.labelSize}px` : '16px')};
    line-height: 20.83px;
    font-weight: 500px;
    padding: 0px;
  }
`

export { AppBaseFormItem }
