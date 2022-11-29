// Interfaces
import {
  ICompanyAttrsCreate,
  ICompanyAttrsDetail,
  ICompanyAttrsList,
  ICompanyAttrsUpdate,
  ICompanyAttrsDelete
} from '@/features/master/company/interfaces/company-attrs.interface'
import {
  ICompanyResponseDetail,
  ICompanyResponsePaginate
} from '@/features/master/company/interfaces/company-response.interface'

// Rtk
import { emptySplitApi } from '@/features/app/redux/app.rtk'

export const companyApi = emptySplitApi.injectEndpoints({
  endpoints: builder => ({
    company_fetchList: builder.query<
      ICompanyResponsePaginate,
      ICompanyAttrsList | void
    >({
      query: payload => ({
        url: '/v1/master/companies',
        params: payload?.query
      })
    }),
    company_fetchDetail: builder.mutation<
      ICompanyResponseDetail,
      ICompanyAttrsDetail
    >({
      query: payload => `/v1/master/companies/${payload.params.id}`
    }),
    company_create: builder.mutation<
      ICompanyResponseDetail,
      ICompanyAttrsCreate
    >({
      query: payload => ({
        url: `/v1/master/companies`,
        method: 'POST',
        body: payload.body
      })
    }),
    company_update: builder.mutation<
      ICompanyResponseDetail,
      ICompanyAttrsUpdate
    >({
      query: payload => ({
        url: `/v1/master/companies/${payload.params.id}`,
        method: 'PATCH',
        body: payload.body
      })
    }),
    company_delete: builder.mutation<
      ICompanyResponseDetail,
      ICompanyAttrsDelete
    >({
      query: payload => ({
        url: `/v1/master/companies/${payload.params.id}`,
        method: 'DELETE'
      })
    })
  }),
  overrideExisting: false
})

export const {
  useLazyCompany_fetchListQuery,
  useCompany_fetchDetailMutation,
  useCompany_createMutation,
  useCompany_updateMutation,
  useCompany_deleteMutation
} = companyApi
