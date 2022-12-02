// React
import { useCallback } from 'react'

// Rtk
import {
  useLazyProjectTransaction_fetchListQuery,
  useProjectTransaction_fetchDetailMutation,
  useProjectTransaction_fetchStatusListMutation,
  useProjectTransaction_fetchUserListMutation,
  useProjectTransaction_assignUsersMutation,
  useProjectTransaction_updateStatusMutation
} from '@/features/project-transaction/redux/project-transaction.rtk'

// Constants
import { PROJECT_TRANSACTION_STATUS } from '@/features/project-transaction/constant/project-transaction-status.constant'

// Interfaces
import { IProjectTransactionResponseDetail } from '@/features/project-transaction/interfaces/project-transaction-response.interface'

const useProjectTransaction = () => {
  // Fetch Project Transaction List
  const [
    projectTransaction_fetchList,
    {
      isLoading: projectTransaction_isListLoading,
      isFetching: projectTransaction_isListFetching,
      data: projectTransaction_list
    }
  ] = useLazyProjectTransaction_fetchListQuery()

  // Fetch Project Transaction Detail
  const [
    projectTransaction_fetchDetail,
    {
      data: projectTransaction_detail,
      isLoading: projectTransaction_isDetailLoading,
      reset: projectTransaction_resetDetail
    }
  ] = useProjectTransaction_fetchDetailMutation()

  // Fetch Status List
  const [
    projectTransaction_fetchStatusList,
    {
      data: projectTransaction_statusList,
      isLoading: projectTransaction_isStatusListLoading,
      reset: projectTransaction_resetStatusList
    }
  ] = useProjectTransaction_fetchStatusListMutation()

  // Fetch User List
  const [
    projectTransaction_fetchUserList,
    {
      data: projectTransaction_userList,
      isLoading: projectTransaction_isUserListLoading,
      reset: projectTransaction_resetUserList
    }
  ] = useProjectTransaction_fetchUserListMutation()

  // Assign User to Project Transaction
  const [
    projectTransaction_assignUsers,
    { isLoading: projectTransaction_isAssignUsersLoading }
  ] = useProjectTransaction_assignUsersMutation()

  // Update Status Project Transaction
  const [
    projectTransaction_updateStatus,
    { isLoading: projectTransaction_isUpdateStatusLoading }
  ] = useProjectTransaction_updateStatusMutation()

  // Check if project transaction editable
  const projectTransaction_isEditable = useCallback(
    (status: PROJECT_TRANSACTION_STATUS | undefined): boolean => {
      if (status) {
        return ![
          PROJECT_TRANSACTION_STATUS.REJECTED,
          PROJECT_TRANSACTION_STATUS.APPROVED
        ].includes(status)
      }

      return false
    },
    []
  )

  return {
    // Rtk
    projectTransaction_fetchList,
    projectTransaction_fetchDetail,
    projectTransaction_resetDetail,
    projectTransaction_fetchStatusList,
    projectTransaction_fetchUserList,
    projectTransaction_assignUsers,
    projectTransaction_updateStatus,
    projectTransaction_resetStatusList,
    projectTransaction_resetUserList,
    projectTransaction_isListLoading,
    projectTransaction_isListFetching,
    projectTransaction_isStatusListLoading,
    projectTransaction_isUserListLoading,
    projectTransaction_isAssignUsersLoading,
    projectTransaction_isUpdateStatusLoading,
    projectTransaction_isDetailLoading,
    projectTransaction_list,
    projectTransaction_detail,
    projectTransaction_statusList,
    projectTransaction_userList,

    // Hook
    projectTransaction_isEditable
  }
}

export { useProjectTransaction }
