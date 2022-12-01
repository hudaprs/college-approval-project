// React
import { memo, useCallback, useState, useEffect, useMemo } from 'react'

// Components
import { StyledWrapper, Table, Modal } from './components'

// i18n
import { useTranslation } from 'react-i18next'

// Interfaces
import { TEtcTablePaginationType } from '@/features/etc/interfaces/table/etc-table-type.interface'
import { IProjectTransactionForm } from '@/features/project-transaction/interfaces/project-transaction.interface'

// Utils
import { commonUtils_delay } from '@/features/app/utils/common.utils'
import { notificationUtils_open } from '@/features/app/utils/notification.utils'
import { useProjectTransaction } from '@/features/project-transaction/hooks/project-transaction.hook'

// Antd
import { Form } from 'antd'

// Custom Hooks
import { useEtcTable } from '@/features/etc/hooks/table/etc-table.hook'

// Moment
import moment from 'moment'

// Constants
import { PROJECT_TRANSACTION_STATUS } from '@/features/project-transaction/constant/project-transaction-status.constant'

// Lodash
import pick from 'lodash.pick'

const ProjectTransactionIndex = memo(() => {
  // Hook
  const { etcTable_find, etcTable_onChange } = useEtcTable([{ id: 1 }])
  const [form] = Form.useForm()
  const { t } = useTranslation()
  const {
    projectTransaction_fetchList,
    projectTransaction_fetchDetail,
    projectTransaction_fetchStatusList,
    projectTransaction_fetchUserList,
    projectTransaction_assignUsers,
    projectTransaction_updateStatus,
    projectTransaction_resetDetail,
    projectTransaction_resetStatusList,
    projectTransaction_resetUserList,
    projectTransaction_isListLoading,
    projectTransaction_isListFetching,
    projectTransaction_isUserListLoading,
    projectTransaction_isStatusListLoading,
    projectTransaction_isAssignUsersLoading,
    projectTransaction_isUpdateStatusLoading,
    projectTransaction_list,
    projectTransaction_detail,
    projectTransaction_statusList,
    projectTransaction_userList
  } = useProjectTransaction()
  const [modal, setModal] = useState<{ isCreateEditOpen: boolean }>({
    isCreateEditOpen: false
  })
  const [isFormEditable, setIsFormEditable] = useState<boolean>(true)
  const modalTitle = useMemo(() => {
    return t(
      `project.title.${
        !isFormEditable
          ? 'show'
          : projectTransaction_detail?.results?.id
          ? 'edit'
          : 'create'
      }`
    )
  }, [isFormEditable, t, projectTransaction_detail?.results?.id])

  useEffect(() => {
    const getProjectList = projectTransaction_fetchList({
      query: etcTable_find(1)
    })
    getProjectList.unwrap()

    return () => {
      /**
       * @note Abort this only in production
       * @note In development mode, because of <React.StrictMode /> it will rerender and will request will be aborted
       * @note Only cancel this if application is in production mode
       * @note It just only for useEffect
       * @note Another abort just when creating / update / delete save it in the same function
       */
      if (import.meta.env.PROD) getProjectList.abort()
    }
  }, [projectTransaction_fetchList, etcTable_find])

  /**
   * @description Handle modal
   *
   * @param {string} type
   * @param {boolean} value
   *
   * @return {Promise<void>} Promise<void>
   */
  const handleModal = useCallback(
    async (type: 'isCreateEditOpen', value: boolean): Promise<void> => {
      setModal(previousModal => ({
        ...previousModal,
        [type]: value
      }))

      // Do when modal close
      if (!value) {
        await commonUtils_delay(100)

        // Reset the previous fetched data
        projectTransaction_resetDetail()
        projectTransaction_resetStatusList()
        projectTransaction_resetUserList()

        // Clear the form
        form.resetFields()

        // Make form editable
        setIsFormEditable(true)
      }
    },
    [
      projectTransaction_resetDetail,
      projectTransaction_resetStatusList,
      projectTransaction_resetUserList,
      form
    ]
  )

  /**
   * @description Watch any change in table
   *
   * @param {TEtcTablePaginationType} type
   * @param {string|number} value
   *
   * @return {Promise<void>} Promise<void>
   */
  const onChangeTable = useCallback(
    async (
      type: TEtcTablePaginationType,
      value?: string | number
    ): Promise<void> => {
      try {
        etcTable_onChange({ id: 1, type, value })

        projectTransaction_fetchList({ query: etcTable_find(1) })
      } catch (_) {
        //
      }
    },
    [etcTable_onChange, projectTransaction_fetchList, etcTable_find]
  )

  /**
   * @description Handle show edit
   *
   * @param {number} id
   * @param {boolean} isReadable
   *
   * @return {Promise<void>} Promise<void>
   */
  const handleShowEdit = useCallback(
    async (id: number, isReadable?: boolean): Promise<void> => {
      if (!isReadable) setIsFormEditable(false)

      try {
        const response = await projectTransaction_fetchDetail({
          params: { id }
        }).unwrap()

        // Check if status of transaction not approved / rejected
        if (
          ![
            PROJECT_TRANSACTION_STATUS.REJECTED,
            PROJECT_TRANSACTION_STATUS.APPROVED
          ].includes(response.results.status)
        ) {
          projectTransaction_fetchStatusList()
        }

        // Set form value
        form.setFieldsValue({
          ...form.getFieldsValue(),
          ...pick(response.results, ['status']),
          ...response.results.active_project,
          start_date: response.results.active_project
            ? moment(response.results.active_project.start_date)
            : undefined,
          end_date: response.results.active_project
            ? moment(response.results.active_project.end_date)
            : undefined
        })

        handleModal('isCreateEditOpen', true)
      } catch (_) {
        handleModal('isCreateEditOpen', false)
      }
    },
    [
      handleModal,
      projectTransaction_fetchDetail,
      projectTransaction_fetchStatusList,
      form
    ]
  )

  /**
   * @description Submit
   *
   * @param {any} form
   *
   * @return {Promise<void>} Promise<void>
   */
  const onSubmit = useCallback(
    async (form: IProjectTransactionForm): Promise<void> => {
      try {
        if (projectTransaction_detail?.results?.id) {
          const params = { id: projectTransaction_detail.results.id }

          const updateStatusResponse = await projectTransaction_updateStatus({
            params,
            body: { status: form.status }
          }).unwrap()

          notificationUtils_open('success', {
            message: updateStatusResponse.message
          })

          // Check if user is assigning users
          // Assigning users only came out in INTERNAL_AGREEMENT_PROCESS
          if (
            form.status ===
              PROJECT_TRANSACTION_STATUS.INTERNAL_AGREEMENT_PROCESS &&
            form?.users
          ) {
            const assignUsersResponse = await projectTransaction_assignUsers({
              params,
              body: { users: form.users }
            }).unwrap()

            notificationUtils_open('success', {
              message: assignUsersResponse.message
            })
          }

          handleModal('isCreateEditOpen', false)

          onChangeTable('reset')
        }
      } catch (_) {
        //
      }
    },
    [
      projectTransaction_updateStatus,
      projectTransaction_assignUsers,
      handleModal,
      projectTransaction_detail?.results?.id,
      onChangeTable
    ]
  )

  return (
    <StyledWrapper>
      {/* Table */}
      <Table
        loading={projectTransaction_isListLoading}
        fetching={projectTransaction_isListFetching}
        data={projectTransaction_list?.results}
        onChange={onChangeTable}
        onShow={id => handleShowEdit(id, false)}
        onEdit={id => handleShowEdit(id, true)}
      />

      {/* Modal */}
      <Modal
        form={form}
        title={modalTitle}
        open={modal.isCreateEditOpen}
        onCancel={() => handleModal('isCreateEditOpen', false)}
        confirmLoading={
          projectTransaction_isUserListLoading ||
          projectTransaction_isStatusListLoading ||
          projectTransaction_isAssignUsersLoading ||
          projectTransaction_isUpdateStatusLoading
        }
        selectList={{
          statusList: projectTransaction_statusList?.results || [],
          userList: projectTransaction_userList?.results || []
        }}
        selectLoading={{
          isStatusListLoading: projectTransaction_isStatusListLoading,
          isUserListLoading: projectTransaction_isUserListLoading
        }}
        onSubmit={onSubmit}
        isFormEditable={isFormEditable}
        footer={!isFormEditable ? null : undefined}
      />
    </StyledWrapper>
  )
})

ProjectTransactionIndex.displayName = 'ProjectTransactionIndex'

export { ProjectTransactionIndex }
