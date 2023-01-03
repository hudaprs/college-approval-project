// React
import { memo } from 'react'

// Components
import { StyledWrapper } from './components'
import { AppBaseLabel } from '@/features/app/components'

// Interfaces
import { IAppBaseHeaderProps } from './interfaces'

const AppBaseHeader = memo(({ title }: IAppBaseHeaderProps) => {
  return (
    <StyledWrapper>
      <AppBaseLabel isBold fontSize={27.07}>
        {title}
      </AppBaseLabel>
    </StyledWrapper>
  )
})

AppBaseHeader.displayName = 'AppBaseHeader'

export { AppBaseHeader }
