// Styled Components
import styled from 'styled-components'

// Antd
import { Divider } from 'antd'

// Interfaces
import { IAppBaseDividerProps } from './interfaces'

const AppBaseDivider = styled((props: IAppBaseDividerProps) => (
  <Divider {...props} />
))`
  display: flex;
  align-items: center;
`

export { AppBaseDivider }
