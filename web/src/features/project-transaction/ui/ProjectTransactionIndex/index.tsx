// React
import { memo, useCallback, useState, useEffect, useMemo } from 'react'

// Components
import { StyledWrapper, Table, Modal } from './components'

// i18n
import { useTranslation } from 'react-i18next'

// Interfaces
import { TEtcTablePaginationType } from '@/features/etc/interfaces/table/etc-table-type.interface'
import {
  IProjectTransactionForm,
  IProjectTransactionUserRejectForm
} from '@/features/project-transaction/interfaces/project-transaction.interface'

// Utils
import { commonUtils_delay } from '@/features/app/utils/common.utils'
import { notificationUtils_open } from '@/features/app/utils/notification.utils'
import { useProjectTransaction } from '@/features/project-transaction/hooks/project-transaction.hook'

// Antd
import { Form } from 'antd'

// Custom Hooks
import { useEtcTable } from '@/features/etc/hooks/table/etc-table.hook'
import { useAuth } from '@/features/auth/hooks/auth.hook'

// Moment
import moment from 'moment'

// Constants
import { PROJECT_TRANSACTION_STATUS } from '@/features/project-transaction/constant/project-transaction-status.constant'

// Lodash
import pick from 'lodash.pick'
import { appBaseModalConfirm } from '@/features/app/components'

const ProjectTransactionIndex = memo(() => {
  // Hook
  const { etcTable_find, etcTable_onChange } = useEtcTable([{ id: 1 }])
  const [form] = Form.useForm()
  const { t } = useTranslation()
  const { auth_authenticatedUserId, auth_authenticatedUserRole } = useAuth()
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
    projectTransaction_userApprove,
    projectTransaction_userReject,
    projectTransaction_userResetDecision,
    projectTransaction_isListLoading,
    projectTransaction_isListFetching,
    projectTransaction_isUserListLoading,
    projectTransaction_isStatusListLoading,
    projectTransaction_isAssignUsersLoading,
    projectTransaction_isUpdateStatusLoading,
    projectTransaction_isUserApproveLoading,
    projectTransaction_isUserRejectLoading,
    projectTransaction_isUserResetDecisionLoading,
    projectTransaction_list,
    projectTransaction_detail,
    projectTransaction_statusList,
    projectTransaction_userList,
    projectTransaction_isEditable
  } = useProjectTransaction()
  const [modal, setModal] = useState<{ isCreateEditOpen: boolean }>({
    isCreateEditOpen: false
  })
  const [isShowOnly, setIsShowOnly] = useState<boolean>(false)
  const isFormEditable = useMemo(() => {
    return (
      !isShowOnly &&
      projectTransaction_isEditable(projectTransaction_detail?.results?.status)
    )
  }, [
    isShowOnly,
    projectTransaction_isEditable,
    projectTransaction_detail?.results?.status
  ])
  const modalTitle = useMemo(() => {
    return t(
      `projectTransaction.title.${
        !isFormEditable
          ? 'show'
          : projectTransaction_detail?.results?.id
          ? 'handle'
          : ''
      }`
    )
  }, [isFormEditable, t, projectTransaction_detail?.results?.id])
  const formStatus = Form.useWatch('status', form)

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

  // Watch any change when status changed
  useEffect(() => {
    let getUserList: any

    if (formStatus) {
      // Check if user going to INTERNAL AGREEMENT PROCESS
      if (
        formStatus === PROJECT_TRANSACTION_STATUS.INTERNAL_AGREEMENT_PROCESS
      ) {
        getUserList = projectTransaction_fetchUserList()
        getUserList.unwrap()
      }
    }

    return () => {
      if (import.meta.env.PROD && getUserList) getUserList.abort()
    }
  }, [formStatus, projectTransaction_fetchUserList])

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

        // Reset only show
        setIsShowOnly(false)
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
   * @param {boolean} isShowOnly
   *
   * @return {Promise<void>} Promise<void>
   */
  const handleShowEdit = useCallback(
    async (id: number, isShowOnly = false): Promise<void> => {
      setIsShowOnly(isShowOnly)

      try {
        const response = await projectTransaction_fetchDetail({
          params: { id }
        }).unwrap()

        if (
          !isShowOnly &&
          [
            PROJECT_TRANSACTION_STATUS.REVISED,
            PROJECT_TRANSACTION_STATUS.AGREEMENT_PROCESS,
            PROJECT_TRANSACTION_STATUS.INTERNAL_AGREEMENT_PROCESS,
            PROJECT_TRANSACTION_STATUS.PENDING
          ].includes(response.results.status)
        ) {
          projectTransaction_fetchStatusList()
        }

        if (
          !isShowOnly &&
          [PROJECT_TRANSACTION_STATUS.INTERNAL_AGREEMENT_PROCESS].includes(
            response.results.status
          )
        ) {
          projectTransaction_fetchUserList()
        }

        // Set form value
        form.setFieldsValue({
          ...form.getFieldsValue(),
          ...pick(response.results, ['status']),
          ...response.results.active_project,
          users: response.results.users.map(user => user.id),
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
      projectTransaction_fetchUserList,
      form
    ]
  )

  /**
   * @description Handle when user approve project
   *
   * @return {Promise<void>} Promise<void>
   */
  const onUserApprove = useCallback(async (): Promise<void> => {
    appBaseModalConfirm({
      title: t('projectTransaction.ask.approve'),
      async onOk() {
        const projectTransactionId: number =
          projectTransaction_detail!.results.id

        try {
          const userApproveResponse = await projectTransaction_userApprove({
            params: { id: projectTransactionId }
          }).unwrap()

          // Re-fetch project transaction detail
          await projectTransaction_fetchDetail({
            params: { id: projectTransactionId }
          }).unwrap()

          notificationUtils_open('success', {
            message: userApproveResponse.message
          })
        } catch (_) {
          //
        }
      },
      onCancel() {
        //
      }
    })
  }, [
    t,
    projectTransaction_userApprove,
    projectTransaction_fetchDetail,
    projectTransaction_detail
  ])

  /**
   * @description Handle when user reject project
   *
   * @param {IProjectTransactionUserRejectForm} form
   *
   * @return {Promise<void>} Promise<void>
   */
  const onUserReject = useCallback(
    async (form: IProjectTransactionUserRejectForm): Promise<void> => {
      appBaseModalConfirm({
        title: t('projectTransaction.ask.reject'),
        async onOk() {
          const projectTransactionId: number =
            projectTransaction_detail!.results.id

          try {
            const userRejectResponse = await projectTransaction_userReject({
              params: { id: projectTransactionId },
              body: form
            }).unwrap()

            // Re-fetch project transaction detail
            await projectTransaction_fetchDetail({
              params: { id: projectTransactionId }
            }).unwrap()

            notificationUtils_open('success', {
              message: userRejectResponse.message
            })
          } catch (_) {
            //
          }
        },
        onCancel() {
          //
        }
      })
    },
    [
      t,
      projectTransaction_userReject,
      projectTransaction_fetchDetail,
      projectTransaction_detail
    ]
  )

  /**
   * @description Handle when user reject project
   *
   * @return {Promise<void>} Promise<void>
   */
  const onUserResetDecision = useCallback(async (): Promise<void> => {
    appBaseModalConfirm({
      title: t('projectTransaction.ask.resetDecision'),
      async onOk() {
        const projectTransactionId: number =
          projectTransaction_detail!.results.id

        try {
          const userResetDecisionResponse =
            await projectTransaction_userResetDecision({
              params: { id: projectTransactionId }
            }).unwrap()

          // Re-fetch project transaction detail
          await projectTransaction_fetchDetail({
            params: { id: projectTransactionId }
          }).unwrap()

          notificationUtils_open('success', {
            message: userResetDecisionResponse.message
          })
        } catch (_) {
          //
        }
      },
      onCancel() {
        //
      }
    })
  }, [
    t,
    projectTransaction_userResetDecision,
    projectTransaction_fetchDetail,
    projectTransaction_detail
  ])

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
          let body: IProjectTransactionForm = {
            status: form.status
          }

          // Check for status INTERNAL_AGREEMENT_PROCESS
          if (
            form.status ===
              PROJECT_TRANSACTION_STATUS.INTERNAL_AGREEMENT_PROCESS &&
            form.users
          ) {
            body = { ...body, users: form.users }
          }

          // Check for status REJECTED
          if (
            form.status === PROJECT_TRANSACTION_STATUS.REJECTED &&
            form.reject_reason
          ) {
            body = { ...body, reject_reason: form.reject_reason }
          }

          const updateStatusResponse = await projectTransaction_updateStatus({
            params,
            body
          }).unwrap()

          notificationUtils_open('success', {
            message: updateStatusResponse.message
          })

          handleModal('isCreateEditOpen', false)

          onChangeTable('reset')
        }
      } catch (_) {
        //
      }
    },
    [
      projectTransaction_updateStatus,
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
        authenticatedUserRole={auth_authenticatedUserRole!}
        onChange={onChangeTable}
        onShow={id => handleShowEdit(id, true)}
        onEdit={handleShowEdit}
        isEditable={projectTransaction_isEditable}
      />

      {/* Modal */}
      <Modal
        form={form}
        projectTransaction={projectTransaction_detail?.results}
        authenticatedUserId={auth_authenticatedUserId!}
        authenticatedUserRole={auth_authenticatedUserRole!}
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
        actionLoading={{
          projectTransaction_isUserApproveLoading,
          projectTransaction_isUserRejectLoading
        }}
        selectLoading={{
          isStatusListLoading: projectTransaction_isStatusListLoading,
          isUserListLoading: projectTransaction_isUserListLoading
        }}
        onUserApprove={onUserApprove}
        onUserReject={onUserReject}
        onUserResetDecision={onUserResetDecision}
        onSubmit={onSubmit}
        isFormEditable={isFormEditable}
        footer={!isFormEditable ? null : undefined}
      />
    </StyledWrapper>
  )
})

ProjectTransactionIndex.displayName = 'ProjectTransactionIndex'

export { ProjectTransactionIndex }
