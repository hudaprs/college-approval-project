// Rtk
import {
  useLazyCompany_fetchListQuery,
  useCompany_createMutation,
  useCompany_deleteMutation,
  useCompany_fetchDetailMutation,
  useCompany_updateMutation
} from '@/features/master/company/redux/company.rtk'

const useCompany = () => {
  // Fetch Todo List
  const [
    company_fetchList,
    {
      isLoading: company_isListLoading,
      isFetching: company_isListFetching,
      data: company_list
    }
  ] = useLazyCompany_fetchListQuery()

  // Fetch Todo Detail
  const [
    company_fetchDetail,
    {
      data: company_detail,
      isLoading: company_isDetailLoading,
      reset: company_resetDetail
    }
  ] = useCompany_fetchDetailMutation()

  // Create Todo
  const [company_create, { isLoading: company_isCreateLoading }] =
    useCompany_createMutation()

  // Update Todo
  const [company_update, { isLoading: company_isUpdateLoading }] =
    useCompany_updateMutation()

  // Delete Todo
  const [company_delete, { isLoading: company_isDeleteLoading }] =
    useCompany_deleteMutation()

  return {
    // Rtk
    company_fetchList,
    company_fetchDetail,
    company_create,
    company_update,
    company_delete,
    company_resetDetail,
    company_isListLoading,
    company_isListFetching,
    company_list,
    company_detail,
    company_isDetailLoading,
    company_isCreateLoading,
    company_isUpdateLoading,
    company_isDeleteLoading
  }
}

export { useCompany }
