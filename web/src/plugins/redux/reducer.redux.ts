// Redux Toolkit
import { combineReducers } from '@reduxjs/toolkit'

// Slices
import app from '@/features/app/redux/app.slice'
import auth from '@/features/auth/redux/auth.slice'
import etcTable from '@/features/etc/redux/table/etc-table.slice'

// Api
import { authApi } from '@/features/auth/redux/auth.rtk'
import { companyApi } from '@/features/master/company/redux/company.rtk'
import { projectApi } from '@/features/project-management/project/redux/project.rtk'
import { projectTransactionApi } from '@/features/project-transaction/redux/project-transaction.rtk'

const plainReducers = {
  app,
  auth,
  etcTable,
  [authApi.reducerPath]: authApi.reducer,
  [companyApi.reducerPath]: companyApi.reducer,
  [projectApi.reducerPath]: projectApi.reducer,
  [projectTransactionApi.reducerPath]: projectTransactionApi.reducer
}

const reducerRedux_reducers = combineReducers(plainReducers)

export { plainReducers, reducerRedux_reducers }
