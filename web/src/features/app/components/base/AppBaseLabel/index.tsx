// Styled Components
import styled from 'styled-components'

// Constant
import { APP_COLOR } from '@/features/app/constant/app-style.constant'

// Interfaces
import { IAppBaseLabelProps } from './interfaces'

const AppBaseLabel = styled.p<IAppBaseLabelProps>`
  margin-top: ${props =>
    props?.marginTop ? `${props.marginTop}px` : '0px'} !important;
  margin-bottom: ${props =>
    props?.marginBottom ? `${props.marginBottom}px` : '0px'} !important;
  font-size: ${props =>
    props?.fontSize ? `${props.fontSize}px` : '11px'} !important;
  font-weight: ${props =>
    props?.fontWeight ? props.fontWeight : props?.isBold ? 700 : 400};
  color: ${props => (props?.fontColor ? props.fontColor : APP_COLOR.DARK)};
  opacity: ${props => (props?.isLight ? 0.5 : 1)};
  display: inline-block;
`

export { AppBaseLabel }
