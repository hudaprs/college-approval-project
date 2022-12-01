// React
import { memo, useMemo } from 'react'

// Components
import {
  AppBaseTableHeader,
  AppBaseTableBody,
  AppBaseTableFooter,
  AppBaseDropdown
} from '@/features/app/components'

// Interfaces
import { ITableProps } from './interfaces'
import { IProjectTransaction } from '@/features/project-transaction/interfaces/project-transaction.interface'

// i18n
import { useTranslation } from 'react-i18next'

// Antd
import { ColumnsType } from 'antd/lib/table'
import { Avatar, Tooltip } from 'antd'
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons'

// Utils
import { currencyUtils_idr } from '@/features/app/utils/currency.utils'
import { dateUtils_formatDate } from '@/features/app/utils/date.utils'

const Table = memo(
  ({ loading, fetching, data, onChange, onShow, onEdit }: ITableProps) => {
    // Hook
    const { t } = useTranslation()
    const columns = useMemo((): ColumnsType<IProjectTransaction> => {
      return [
        {
          title: t('projectTransaction.table.id'),
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: t('projectTransaction.table.name'),
          dataIndex: 'name',
          key: 'name',
          render: (_, record) => {
            return record.active_project ? record.active_project.name : ''
          }
        },
        {
          title: t('projectTransaction.table.budget'),
          dataIndex: 'budget',
          key: 'budget',
          render: (_, record) => {
            return record.active_project
              ? currencyUtils_idr(record.active_project.budget)
              : ''
          }
        },
        {
          title: t('projectTransaction.table.startDate'),
          dataIndex: 'start_date',
          key: 'start_date',
          render: (_, record) => {
            return record.active_project
              ? dateUtils_formatDate(record.active_project.start_date)
              : ''
          }
        },
        {
          title: t('projectTransaction.table.endDate'),
          dataIndex: 'end_date',
          key: 'end_date',
          render: (_, record) => {
            return record.active_project
              ? dateUtils_formatDate(record.active_project.end_date)
              : ''
          }
        },
        {
          title: t('app.status.status'),
          dataIndex: 'status',
          key: 'status'
        },
        {
          title: t('projectTransaction.table.users'),
          dataIndex: 'users',
          key: 'users',
          render: (_, record) => {
            return record.users.length > 0 ? (
              <Avatar.Group
                maxCount={2}
                maxPopoverTrigger='click'
                size='large'
                maxStyle={{
                  color: '#f56a00',
                  backgroundColor: '#fde3cf',
                  cursor: 'pointer'
                }}
              >
                <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                <Tooltip title='Ant User' placement='top'>
                  <Avatar
                    style={{ backgroundColor: '#87d068' }}
                    icon={<UserOutlined />}
                  />
                </Tooltip>
                <Avatar
                  style={{ backgroundColor: '#1890ff' }}
                  icon={<AntDesignOutlined />}
                />
              </Avatar.Group>
            ) : (
              '-'
            )
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
                  }
                ]}
              />
            )
          }
        }
      ]
    }, [onEdit, onShow, t])

    return (
      <>
        <AppBaseTableHeader onChange={onChange} loading={fetching} />
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
