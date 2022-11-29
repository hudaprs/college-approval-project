// Styled Components
import styled from 'styled-components'

// Antd
import { Checkbox } from 'antd'

// Interfaces
import { IAppBaseCheckboxProps } from './interfaces'

const AppBaseCheckbox = styled((props: IAppBaseCheckboxProps) => (
  <Checkbox {...props} />
))``

export { AppBaseCheckbox }
