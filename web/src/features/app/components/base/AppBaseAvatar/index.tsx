// Styled Components
import styled from 'styled-components'

// Antd
import { Avatar } from 'antd'

// Interfaces
import { IAppBaseAvatarProps } from './interfaces'

const AppBaseAvatar = styled((props: IAppBaseAvatarProps) => (
  <Avatar {...props} />
))``

export { AppBaseAvatar }
