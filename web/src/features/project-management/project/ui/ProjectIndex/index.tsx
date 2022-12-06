// React
import { memo, useCallback, useState, useEffect, useMemo } from 'react'

// Components
import { appBaseModalConfirm } from '@/features/app/components'
import { StyledWrapper, Table, Modal } from './components'

// i18n
import { useTranslation } from 'react-i18next'

// Interfaces
import { IProjectForm } from '@/features/project-management/project/interfaces/project.interface'
import { IProjectResponseDetail } from '@/features/project-management/project/interfaces/project-response.interface'
import { TEtcTablePaginationType } from '@/features/etc/interfaces/table/etc-table-type.interface'

// Utils
import { commonUtils_delay } from '@/features/app/utils/common.utils'
import { notificationUtils_open } from '@/features/app/utils/notification.utils'

// Antd
import { Form } from 'antd'

// Custom Hooks
import { useEtcTable } from '@/features/etc/hooks/table/etc-table.hook'
import { useProject } from '@/features/project-management/project/hooks/project.hook'
import { useAuth } from '@/features/auth/hooks/auth.hook'

// Moment
import moment from 'moment'

const ProjectIndex = memo(() => {
  // Hook
  const { etcTable_find, etcTable_onChange } = useEtcTable([{ id: 1 }])
  const [form] = Form.useForm()
  const { t } = useTranslation()
  const {
    project_fetchList,
    project_isListLoading,
    project_isListFetching,
    project_list,
    project_fetchDetail,
    project_resetDetail,
    project_create,
    project_isCreateLoading,
    project_update,
    project_isUpdateLoading,
    project_delete,
    project_detail
  } = useProject()
  const { auth_authenticatedUserId } = useAuth()
  const [modal, setModal] = useState<{ isCreateEditOpen: boolean }>({
    isCreateEditOpen: false
  })
  const [isFormEditable, setIsFormEditable] = useState<boolean>(true)
  const modalTitle = useMemo(() => {
    return t(
      `project.title.${
        !isFormEditable
          ? 'show'
          : project_detail?.results?.id
          ? 'edit'
          : 'create'
      }`
    )
  }, [isFormEditable, t, project_detail?.results?.id])

  useEffect(() => {
    const getProjectList = project_fetchList({ query: etcTable_find(1) })
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
  }, [project_fetchList, etcTable_find])

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

        // Reset the previous fetched detail
        project_resetDetail()

        // Clear the form
        form.resetFields()

        // Make form editable
        setIsFormEditable(true)
      }
    },
    [project_resetDetail, form]
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

        project_fetchList({ query: etcTable_find(1) })
      } catch (_) {
        //
      }
    },
    [etcTable_onChange, project_fetchList, etcTable_find]
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
        const response = await project_fetchDetail({
          params: {
            id
          }
        }).unwrap()

        // Set form value
        form.setFieldsValue({
          ...form.getFieldsValue(),
          ...response.results,
          start_date: moment(response.results.start_date),
          end_date: moment(response.results.end_date)
        })

        handleModal('isCreateEditOpen', true)
      } catch (_) {
        handleModal('isCreateEditOpen', false)
      }
    },
    [handleModal, project_fetchDetail, form]
  )

  /**
   * @description Delete todo
   *
   * @param {number} id
   *
   * @return {Promise<void>} Promise<void>
   */
  const onDelete = useCallback(
    async (id: number): Promise<void> => {
      try {
        const deleteResponse = await project_delete({ params: { id } }).unwrap()

        notificationUtils_open('success', {
          message: deleteResponse.message
        })

        onChangeTable('reset')
      } catch (_) {
        //
      }
    },
    [project_delete, onChangeTable]
  )

  /**
   * @description Submit
   *
   * @param {IProjectForm} form
   *
   * @return {Promise<void>} Promise<void>
   */
  const onSubmit = useCallback(
    async (form: IProjectForm): Promise<void> => {
      const projectId = project_detail?.results?.id
      const activeProjectTransaction =
        project_detail?.results?.active_project_transaction

      appBaseModalConfirm({
        title: t(
          `project.ask.${
            activeProjectTransaction
              ? 'onGoingTransaction'
              : projectId
              ? 'edit'
              : 'submit'
          }`
        ),
        async onOk() {
          try {
            let response: IProjectResponseDetail

            if (projectId) {
              response = await project_update({
                params: { id: projectId },
                body: form
              }).unwrap()
            } else {
              response = await project_create({
                body: form
              }).unwrap()
            }

            handleModal('isCreateEditOpen', false)

            notificationUtils_open('success', {
              message: response.message
            })

            onChangeTable('reset')
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
      project_create,
      project_update,
      handleModal,
      project_detail?.results?.active_project_transaction,
      project_detail?.results?.id,
      onChangeTable,
      t
    ]
  )

  return (
    <StyledWrapper>
      {/* Table */}
      <Table
        loading={project_isListLoading}
        fetching={project_isListFetching}
        data={project_list?.results}
        authenticatedUserId={auth_authenticatedUserId!}
        onChange={onChangeTable}
        onCreate={() => handleModal('isCreateEditOpen', true)}
        onShow={id => handleShowEdit(id, false)}
        onEdit={id => handleShowEdit(id, true)}
        onDelete={onDelete}
      />

      {/* Modal */}
      <Modal
        form={form}
        title={modalTitle}
        open={modal.isCreateEditOpen}
        onCancel={() => handleModal('isCreateEditOpen', false)}
        confirmLoading={project_isCreateLoading || project_isUpdateLoading}
        onSubmit={onSubmit}
        isFormEditable={isFormEditable}
        footer={!isFormEditable ? null : undefined}
      />
    </StyledWrapper>
  )
})

ProjectIndex.displayName = 'ProjectIndex'

export { ProjectIndex }
