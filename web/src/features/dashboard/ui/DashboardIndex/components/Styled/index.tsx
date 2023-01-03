// Styled Components
import styled from 'styled-components'

// Components
import { AppBaseCard } from '@/features/app/components'

export const StyledWrapper = styled.div`
  margin: 30px;
`

export const StyledCard = styled(AppBaseCard)`
  width: 100%;
  height: 122.54px;

  img {
    width: 63.38px;
    height: 63.38px;
  }

  .ant-card-body {
    width: 100% !important;
    display: flex !important;
    align-items: center;

    div:nth-child(2) {
      margin-left: 20px;
    }
  }
`
