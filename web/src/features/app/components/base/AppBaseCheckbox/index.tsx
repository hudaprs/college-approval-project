// Styled Components
import styled from 'styled-components'

// Antd
import { Checkbox } from 'antd'

// Interfaces
import { IAppBaseCheckboxProps } from './interfaces'

// Lodash
import omit from 'lodash/omit'

const AppBaseCheckbox = styled((props: IAppBaseCheckboxProps) => (
  <Checkbox
    {...omit(props, ['isCenter'])}
    style={{
      ...props?.style,
      alignItems:
        props?.style?.alignItems || props?.isCenter
          ? 'center'
          : props?.style?.alignItems
    }}
  />
))``

export { AppBaseCheckbox }
