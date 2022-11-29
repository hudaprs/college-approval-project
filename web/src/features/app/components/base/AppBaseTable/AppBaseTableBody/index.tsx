// Styled Components
import styled from 'styled-components'

// Antd
import { Table, TableProps } from 'antd'

// Constant
import {
  APP_COLOR,
  APP_COLOR_LIGHT
} from '@/features/app/constant/app-style.constant'

// eslint-disable-next-line
const AppBaseTableBody = styled((props: TableProps<any>) => (
  <Table
    {...props}
    rowKey={props?.rowKey || 'id'}
    pagination={false}
    scroll={{ x: 1366 }}
  />
))`
  margin: 30px 0px 10px 0px;
  background: ${APP_COLOR_LIGHT.BACKGROUND} !important;

  .ant-table-content table {
    border-collapse: separate;
    border-spacing: 0 10px;
    background-color: ${APP_COLOR_LIGHT.BACKGROUND};
  }

  .ant-table-thead {
    .ant-table-cell {
      background: ${APP_COLOR_LIGHT.BACKGROUND} !important;
      border: none !important;
      padding-bottom: 0px;
    }
  }

  .ant-table-tbody tr {
    border: none !important;
    background-color: ${APP_COLOR.WHITE};
    border-radius: 10px;

    td:first-child {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }

    td:last-child {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
`

export { AppBaseTableBody }
