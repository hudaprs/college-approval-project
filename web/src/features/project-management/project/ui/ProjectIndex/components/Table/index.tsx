// React
import { memo, useMemo } from 'react'

// Components
import {
  AppBaseTableHeader,
  AppBaseTableBody,
  AppBaseTableFooter,
  AppBaseButton,
  AppBaseDropdown,
  AppBasePopConfirm
} from '@/features/app/components'

// Interfaces
import { ITableProps } from './interfaces'
import { IProject } from '@/features/project-management/project/interfaces/project.interface'

// i18n
import { useTranslation } from 'react-i18next'

// Antd
import { ColumnsType } from 'antd/lib/table'

// Utils
import { currencyUtils_idr } from '@/features/app/utils/currency.utils'
import { dateUtils_formatDate } from '@/features/app/utils/date.utils'

const Table = memo(
  ({
    loading,
    fetching,
    data,
    onChange,
    onCreate,
    onShow,
    onEdit,
    onDelete
  }: ITableProps) => {
    // Hook
    const { t } = useTranslation()
    const columns = useMemo((): ColumnsType<IProject> => {
      return [
        {
          title: t('project.table.id'),
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: t('project.table.name'),
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: t('project.table.budget'),
          dataIndex: 'budget',
          key: 'budget',
          render: (_, record) => {
            return currencyUtils_idr(record.budget)
          }
        },
        {
          title: t('project.table.startDate'),
          dataIndex: 'start_date',
          key: 'start_date'
        },
        {
          title: t('project.table.endDate'),
          dataIndex: 'end_date',
          key: 'end_date'
        },
        {
          title: t('project.table.transactions'),
          dataIndex: 'project_transactions',
          key: 'project_transactions',
          render: (_, record) => {
            return `${record.project_transactions.length} ${t(
              'project.table.transactions'
            )}`
          }
        },
        {
          title: t('app.table.createdAt'),
          dataIndex: 'created_at',
          key: 'created_at',
          render: (_, record) => {
            return dateUtils_formatDate(record.created_at)
          }
        },
        {
          title: t('app.table.updatedAt'),
          dataIndex: 'updated_at',
          key: 'updated_at',
          render: (_, record) => {
            return dateUtils_formatDate(record.updated_at)
          }
        },
        {
          title: t('app.table.action'),
          dataIndex: 'action',
          key: 'action',
          render: (_, record) => {
            return (
              <AppBaseDropdown
                items={[
                  {
                    key: '1',
                    label: t('app.action.show'),
                    onClick: () => onShow(record.id)
                  },
                  {
                    key: '2',
                    label: t('app.action.edit'),
                    onClick: () => onEdit(record.id)
                  },
                  {
                    key: '3',
                    label: (
                      <AppBasePopConfirm
                        title={t('app.confirmation.areYouSure')}
                        onConfirm={() => onDelete(record.id)}
                      >
                        {t('app.action.delete')}
                      </AppBasePopConfirm>
                    )
                  }
                ]}
              />
            )
          }
        }
      ]
    }, [onDelete, onEdit, t])

    return (
      <>
        <AppBaseTableHeader
          onChange={onChange}
          left={
            <AppBaseButton type='primary' onClick={onCreate}>
              {t('project.title.create')}
            </AppBaseButton>
          }
          loading={fetching}
        />
        <AppBaseTableBody
          loading={loading || fetching}
          columns={columns}
          dataSource={data?.list}
        />
        <AppBaseTableFooter pagination={data?.pagination} onChange={onChange} />
      </>
    )
  }
)

Table.displayName = 'Table'

export { Table }
