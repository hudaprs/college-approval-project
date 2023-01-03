// Styled Components
import styled from 'styled-components'

// Interfaces
import { IAppBaseCardProps } from './interfaces'

// Antd
import { Card } from 'antd'

export const AppBaseCard = styled((props: IAppBaseCardProps) => (
  <Card {...props} />
))``
