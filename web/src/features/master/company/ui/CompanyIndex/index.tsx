// React
import { memo, useCallback, useState, useEffect, useMemo } from 'react'

// Components
import { StyledWrapper, Table, Modal } from './components'

// i18n
import { useTranslation } from 'react-i18next'

// Interfaces
import { ICompanyForm } from '@/features/master/company/interfaces/company.interface'
import { ICompanyResponseDetail } from '@/features/master/company/interfaces/company-response.interface'
import { TEtcTablePaginationType } from '@/features/etc/interfaces/table/etc-table-type.interface'

// Utils
import { commonUtils_delay } from '@/features/app/utils/common.utils'
import { notificationUtils_open } from '@/features/app/utils/notification.utils'

// Antd
import { Form } from 'antd'

// Custom Hooks
import { useEtcTable } from '@/features/etc/hooks/table/etc-table.hook'
import { useCompany } from '@/features/master/company/hooks/company.hook'

const CompanyIndex = memo(() => {
  // Hook
  const { etcTable_find, etcTable_onChange } = useEtcTable([{ id: 1 }])
  const [form] = Form.useForm()
  const { t } = useTranslation()
  const {
    company_fetchList,
    company_isListLoading,
    company_isListFetching,
    company_list,
    company_fetchDetail,
    company_resetDetail,
    company_create,
    company_isCreateLoading,
    company_update,
    company_isUpdateLoading,
    company_delete,
    company_detail
  } = useCompany()
  const [modal, setModal] = useState<{ isCreateEditOpen: boolean }>({
    isCreateEditOpen: false
  })
  const [isFormEditable, setIsFormEditable] = useState<boolean>(true)
  const modalTitle = useMemo(() => {
    return t(
      `company.title.${
        !isFormEditable
          ? 'show'
          : company_detail?.results?.id
          ? 'edit'
          : 'create'
      }`
    )
  }, [isFormEditable, t, company_detail?.results?.id])

  useEffect(() => {
    const getCompanyList = company_fetchList({ query: etcTable_find(1) })
    getCompanyList.unwrap()

    return () => {
      /**
       * @note Abort this only in production
       * @note In development mode, because of <React.StrictMode /> it will rerender and will request will be aborted
       * @note Only cancel this if application is in production mode
       * @note It just only for useEffect
       * @note Another abort just when creating / update / delete save it in the same function
       */
      if (import.meta.env.PROD) getCompanyList.abort()
    }
  }, [company_fetchList, etcTable_find])

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
        company_resetDetail()

        // Clear the form
        form.resetFields()

        // Make form editable
        setIsFormEditable(true)
      }
    },
    [company_resetDetail, form]
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

        company_fetchList({ query: etcTable_find(1) })
      } catch (_) {
        //
      }
    },
    [etcTable_onChange, company_fetchList, etcTable_find]
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
        const response = await company_fetchDetail({
          params: {
            id
          }
        }).unwrap()

        // Set form value
        form.setFieldsValue({ ...form.getFieldsValue(), ...response.results })

        handleModal('isCreateEditOpen', true)
      } catch (_) {
        handleModal('isCreateEditOpen', false)
      }
    },
    [handleModal, company_fetchDetail, form]
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
        const deleteResponse = await company_delete({ params: { id } }).unwrap()

        notificationUtils_open('success', {
          message: deleteResponse.message
        })

        onChangeTable('reset')
      } catch (_) {
        //
      }
    },
    [company_delete, onChangeTable]
  )

  /**
   * @description Submit
   *
   * @param {ICompanyForm} form
   *
   * @return {Promise<void>} Promise<void>
   */
  const onSubmit = useCallback(
    async (form: ICompanyForm): Promise<void> => {
      try {
        let response: ICompanyResponseDetail

        if (company_detail?.results?.id) {
          response = await company_update({
            params: { id: company_detail.results.id },
            body: form
          }).unwrap()
        } else {
          response = await company_create({
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
    [
      company_create,
      company_update,
      handleModal,
      company_detail?.results?.id,
      onChangeTable
    ]
  )

  return (
    <StyledWrapper>
      {/* Table */}
      <Table
        loading={company_isListLoading}
        fetching={company_isListFetching}
        data={company_list?.results}
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
        confirmLoading={company_isCreateLoading || company_isUpdateLoading}
        onSubmit={onSubmit}
        isFormEditable={isFormEditable}
        footer={!isFormEditable ? null : undefined}
      />
    </StyledWrapper>
  )
})

CompanyIndex.displayName = 'CompanyIndex'

export { CompanyIndex }
