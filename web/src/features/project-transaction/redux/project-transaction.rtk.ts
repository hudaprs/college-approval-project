// Interfaces
import {
  IProjectTransactionAttrsList,
  IProjectTransactionAttrsDetail,
  IProjectTransactionAttrsAssignUsers,
  IProjectTransactionAttrsUpdateStatus,
  IProjectTransactionAttrsUserApprove,
  IProjectTransactionAttrsUserReject,
  IProjectTransactionAttrsUserResetDecision
} from '@/features/project-transaction/interfaces/project-transaction-attrs.interface'
import {
  IProjectTransactionResponseBudgetCalculation,
  IProjectTransactionResponseDetail,
  IProjectTransactionResponsePaginate,
  IProjectTransactionResponseStatus,
  IProjectTransactionResponseUser
} from '@/features/project-transaction/interfaces/project-transaction-response.interface'

// Rtk
import { emptySplitApi } from '@/features/app/redux/app.rtk'

export const projectTransactionApi = emptySplitApi.injectEndpoints({
  endpoints: builder => ({
    projectTransaction_fetchList: builder.query<
      IProjectTransactionResponsePaginate,
      IProjectTransactionAttrsList | void
    >({
      query: payload => ({
        url: '/v1/project-transaction',
        params: payload?.query
      })
    }),
    projectTransaction_fetchDetail: builder.mutation<
      IProjectTransactionResponseDetail,
      IProjectTransactionAttrsDetail
    >({
      query: payload => `/v1/project-transaction/${payload.params.id}`
    }),
    projectTransaction_fetchStatusList: builder.mutation<
      IProjectTransactionResponseStatus,
      void
    >({
      query: () => ({
        url: '/v1/project-transaction/status/list'
      })
    }),
    projectTransaction_fetchUserList: builder.mutation<
      IProjectTransactionResponseUser,
      void
    >({
      query: () => ({
        url: '/v1/project-transaction/users'
      })
    }),
    projectTransaction_assignUsers: builder.mutation<
      IProjectTransactionResponseDetail,
      IProjectTransactionAttrsAssignUsers
    >({
      query: payload => ({
        url: `/v1/project-transaction/users/assign/${payload.params.id}`,
        method: 'PATCH',
        body: payload.body
      })
    }),
    projectTransaction_updateStatus: builder.mutation<
      IProjectTransactionResponseDetail,
      IProjectTransactionAttrsUpdateStatus
    >({
      query: payload => ({
        url: `/v1/project-transaction/status/update/${payload.params.id}`,
        method: 'PATCH',
        body: payload.body
      })
    }),
    projectTransaction_userApprove: builder.mutation<
      IProjectTransactionResponseDetail,
      IProjectTransactionAttrsUserApprove
    >({
      query: payload => ({
        url: `/v1/project-transaction/users/approve/${payload.params.id}`,
        method: 'PATCH'
      })
    }),
    projectTransaction_userReject: builder.mutation<
      IProjectTransactionResponseDetail,
      IProjectTransactionAttrsUserReject
    >({
      query: payload => ({
        url: `/v1/project-transaction/users/reject/${payload.params.id}`,
        method: 'PATCH',
        body: payload.body
      })
    }),
    projectTransaction_userResetDecision: builder.mutation<
      IProjectTransactionResponseDetail,
      IProjectTransactionAttrsUserResetDecision
    >({
      query: payload => ({
        url: `/v1/project-transaction/users/reset/${payload.params.id}`,
        method: 'PATCH'
      })
    }),
    projectTransaction_fetchBudgetCalculation: builder.query<
      IProjectTransactionResponseBudgetCalculation,
      void
    >({
      query: () => ({
        url: `/v1/project-transaction/calculation/budget`
      })
    })
  }),
  overrideExisting: false
})

export const {
  useLazyProjectTransaction_fetchListQuery,
  useProjectTransaction_fetchDetailMutation,
  useProjectTransaction_fetchStatusListMutation,
  useProjectTransaction_fetchUserListMutation,
  useProjectTransaction_assignUsersMutation,
  useProjectTransaction_updateStatusMutation,
  useProjectTransaction_userApproveMutation,
  useProjectTransaction_userRejectMutation,
  useProjectTransaction_userResetDecisionMutation,
  useLazyProjectTransaction_fetchBudgetCalculationQuery
} = projectTransactionApi
