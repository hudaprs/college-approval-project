// Interfaces
import {
  IProjectAttrsCreate,
  IProjectAttrsDetail,
  IProjectAttrsList,
  IProjectAttrsUpdate,
  IProjectAttrsDelete
} from '@/features/project-management/project/interfaces/project-attrs.interface'
import {
  IProjectResponseDetail,
  IProjectResponsePaginate
} from '@/features/project-management/project/interfaces/project-response.interface'

// Rtk
import { emptySplitApi } from '@/features/app/redux/app.rtk'

export const projectApi = emptySplitApi.injectEndpoints({
  endpoints: builder => ({
    project_fetchList: builder.query<
      IProjectResponsePaginate,
      IProjectAttrsList | void
    >({
      query: payload => ({
        url: '/v1/master/projects',
        params: payload?.query
      })
    }),
    project_fetchDetail: builder.mutation<
      IProjectResponseDetail,
      IProjectAttrsDetail
    >({
      query: payload => `/v1/master/projects/${payload.params.id}`
    }),
    project_create: builder.mutation<
      IProjectResponseDetail,
      IProjectAttrsCreate
    >({
      query: payload => ({
        url: `/v1/master/projects`,
        method: 'POST',
        body: payload.body
      })
    }),
    project_update: builder.mutation<
      IProjectResponseDetail,
      IProjectAttrsUpdate
    >({
      query: payload => ({
        url: `/v1/master/projects/${payload.params.id}`,
        method: 'PATCH',
        body: payload.body
      })
    }),
    project_delete: builder.mutation<
      IProjectResponseDetail,
      IProjectAttrsDelete
    >({
      query: payload => ({
        url: `/v1/master/projects/${payload.params.id}`,
        method: 'DELETE'
      })
    })
  }),
  overrideExisting: false
})

export const {
  useLazyProject_fetchListQuery,
  useProject_fetchDetailMutation,
  useProject_createMutation,
  useProject_updateMutation,
  useProject_deleteMutation
} = projectApi
