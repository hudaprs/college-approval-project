// Styled Components
import styled from 'styled-components'

// Antd
import { Tooltip } from 'antd'

// Interfaces
import { IAppBaseTooltipProps } from './interfaces'

const AppBaseTooltip = styled((props: IAppBaseTooltipProps) => (
  <Tooltip {...props} />
))``

export { AppBaseTooltip }
