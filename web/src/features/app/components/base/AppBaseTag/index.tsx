// Styled Components
import styled from 'styled-components'

// Antd
import { Tag } from 'antd'

// Interfaces
import { IAppBaseTagProps } from './interfaces'

const AppBaseTag = styled((props: IAppBaseTagProps) => <Tag {...props} />)``

export { AppBaseTag }
