// React
import { memo } from 'react'

// Components
import { StyledCard } from '@/features/dashboard/ui/DashboardIndex/components'
import { AppBaseLabel } from '@/features/app/components'

// Images
import DashboardOneImage from '@/assets/images/dashboard/dashboard-1.png'
import DashboardTwoImage from '@/assets/images/dashboard/dashboard-2.png'
import DashboardThreeImage from '@/assets/images/dashboard/dashboard-3.png'
import DashboardFourImage from '@/assets/images/dashboard/dashboard-4.png'

const CardList = memo(() => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-10'>
      {/* Card 1 */}
      <StyledCard bordered={false}>
        {/* Icon */}
        <div>
          <img src={DashboardOneImage} alt='dashboard-1' />
        </div>

        {/* Label */}
        <div className={'flex flex-col gap-1'}>
          <AppBaseLabel isBold fontSize={24.06}>
            179+
          </AppBaseLabel>
          <AppBaseLabel fontSize={15.02}>Save Products</AppBaseLabel>
        </div>
      </StyledCard>

      {/* Card 2 */}
      <StyledCard bordered={false}>
        {/* Icon */}
        <div>
          <img src={DashboardTwoImage} alt='dashboard-2' />
        </div>

        {/* Label */}
        <div className={'flex flex-col gap-1'}>
          <AppBaseLabel isBold fontSize={24.06}>
            20+
          </AppBaseLabel>
          <AppBaseLabel fontSize={15.02}>Stock Products</AppBaseLabel>
        </div>
      </StyledCard>

      {/* Card 3 */}
      <StyledCard bordered={false}>
        {/* Icon */}
        <div>
          <img src={DashboardThreeImage} alt='dashboard-3' />
        </div>

        {/* Label */}
        <div className={'flex flex-col gap-1'}>
          <AppBaseLabel isBold fontSize={24.06}>
            190+
          </AppBaseLabel>
          <AppBaseLabel fontSize={15.02}>Sales Products</AppBaseLabel>
        </div>
      </StyledCard>

      {/* Card 4 */}
      <StyledCard bordered={false}>
        {/* Icon */}
        <div>
          <img src={DashboardFourImage} alt='dashboard-4' />
        </div>

        {/* Label */}
        <div className={'flex flex-col gap-1'}>
          <AppBaseLabel isBold fontSize={24.06}>
            20+
          </AppBaseLabel>
          <AppBaseLabel fontSize={15.02}>Job Applications</AppBaseLabel>
        </div>
      </StyledCard>
    </div>
  )
})

CardList.displayName = 'CardList'

export { CardList }
