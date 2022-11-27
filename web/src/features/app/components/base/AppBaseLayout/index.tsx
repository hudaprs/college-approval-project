// Styled Components
import styled from 'styled-components'

// Antd
import { Layout, LayoutProps, SiderProps } from 'antd'

// Lodash
import omit from 'lodash.omit'

// Constant
import {
  APP_COLOR,
  APP_COLOR_LIGHT
} from '@/features/app/constant/app-style.constant'

// Layout
const { Header, Sider, Content, Footer } = Layout

const AppBaseLayout = styled(
  ({ ...rest }: { isContent?: boolean; collapsed?: boolean } & LayoutProps) => (
    <Layout {...omit(rest, ['isContent', 'collapsed'])} />
  )
)`
  background-color: ${APP_COLOR_LIGHT.BACKGROUND};
`

const AppBaseLayoutHeader = styled(Header)`
  background-color: #fff;
  width: 100%;
`

const AppBaseLayoutSider = styled(Sider)<SiderProps>`
  background-color: ${APP_COLOR.WHITE} !important;
`

const AppBaseLayoutContent = styled(Content)`
  margin: 0px;
`

const AppBaseLayoutFooter = styled(Footer)``

export {
  AppBaseLayout,
  AppBaseLayoutHeader,
  AppBaseLayoutSider,
  AppBaseLayoutContent,
  AppBaseLayoutFooter
}
