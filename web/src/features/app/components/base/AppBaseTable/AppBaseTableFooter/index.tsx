// React
import { memo } from 'react'

// Components
import { AppBasePagination } from '@/features/app/components'

// Interfaces
import { IAppBaseTableFooterProps } from './interfaces'

// i18n
import { useTranslation } from 'react-i18next'

const AppBaseTableFooter = memo(
  ({ paginationAttrs, pagination, onChange }: IAppBaseTableFooterProps) => {
    // Hook
    const { t } = useTranslation()

    return (
      <div className='flex items-center justify-end'>
        <AppBasePagination
          {...paginationAttrs}
          pageSize={pagination?.per_page || 1}
          total={pagination?.total || 0}
          showTotal={() =>
            `${t('app.pagination.total')} ${pagination?.total} ${t(
              'app.pagination.items'
            )}`
          }
          defaultCurrent={1}
          current={pagination?.current_page}
          onChange={page => onChange('page', page)}
        />
      </div>
    )
  }
)

AppBaseTableFooter.displayName = 'AppBaseTableFooter'

export { AppBaseTableFooter }
