// Styled Components
import styled from 'styled-components'

// Styled Components
import { Select } from 'antd'

// Interfaces
import { IAppBaseSelectProps } from './interfaces'

// Lodash
import omit from 'lodash.omit'

// Constants
import {
  APP_COLOR,
  APP_COLOR_LIGHT
} from '@/features/app/constant/app-style.constant'

export const AppBaseSelect = styled((props: IAppBaseSelectProps) => (
  <Select
    {...omit(props, ['backgroundColor', 'height', 'width'])}
    filterOption={(input, option) =>
      ((option?.label ?? '') as string)
        .toLowerCase()
        .includes(input.toLowerCase())
    }
  />
))``
