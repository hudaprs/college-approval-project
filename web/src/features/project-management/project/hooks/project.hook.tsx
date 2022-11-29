// Rtk
import {
  useLazyProject_fetchListQuery,
  useProject_createMutation,
  useProject_deleteMutation,
  useProject_fetchDetailMutation,
  useProject_updateMutation
} from '@/features/project-management/project/redux/project.rtk'

const useProject = () => {
  // Fetch Todo List
  const [
    project_fetchList,
    {
      isLoading: project_isListLoading,
      isFetching: project_isListFetching,
      data: project_list
    }
  ] = useLazyProject_fetchListQuery()

  // Fetch Todo Detail
  const [
    project_fetchDetail,
    {
      data: project_detail,
      isLoading: project_isDetailLoading,
      reset: project_resetDetail
    }
  ] = useProject_fetchDetailMutation()

  // Create Todo
  const [project_create, { isLoading: project_isCreateLoading }] =
    useProject_createMutation()

  // Update Todo
  const [project_update, { isLoading: project_isUpdateLoading }] =
    useProject_updateMutation()

  // Delete Todo
  const [project_delete, { isLoading: project_isDeleteLoading }] =
    useProject_deleteMutation()

  return {
    // Rtk
    project_fetchList,
    project_fetchDetail,
    project_create,
    project_update,
    project_delete,
    project_resetDetail,
    project_isListLoading,
    project_isListFetching,
    project_list,
    project_detail,
    project_isDetailLoading,
    project_isCreateLoading,
    project_isUpdateLoading,
    project_isDeleteLoading
  }
}

export { useProject }
