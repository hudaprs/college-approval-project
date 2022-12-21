// React
import { memo, useCallback, useState } from 'react'

// Components
import {
  AppBaseAvatar,
  AppBaseButton,
  AppBaseDatePicker,
  AppBaseDivider,
  AppBaseFormItem,
  AppBaseInput,
  AppBaseInputCurrency,
  AppBaseInputTextArea,
  AppBaseLabel,
  AppBaseModal,
  AppBaseUpload
} from '@/features/app/components'

// Interfaces
import { IModalProps } from './interfaces'

// i18n
import { useTranslation } from 'react-i18next'

// Antd
import { Form, UploadProps, message, Collapse, Row, Col, List } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

// Utils
import {
  fileUtils_convertBase64,
  fileUtils_handleFileUpload,
  fileUtils_normFile
} from '@/features/app/utils/file.utils'
import { dateUtils_formatDate } from '@/features/app/utils/date.utils'
import { ProjectTransactionStatusTag } from '@/features/project-transaction/components'
import { currencyUtils_idr } from '@/features/app/utils/currency.utils'
import { PROJECT_TRANSACTION_STATUS } from '@/features/project-transaction/constant/project-transaction-status.constant'
import { APP_COLOR_LIGHT } from '@/features/app/constant/app-style.constant'

const Modal = memo(
  ({ onSubmit, form, isFormEditable, project, ...rest }: IModalProps) => {
    // Hook
    const { t } = useTranslation()
    const [loading, setLoading] = useState<{ isConvertBase64Loading: boolean }>(
      {
        isConvertBase64Loading: false
      }
    )

    /**
     * @description Handle loading
     *
     * @param {'isConvertBase64Loading'} type
     * @param {boolean} value
     *
     * @return {void} void
     */
    const handleLoading = useCallback(
      (type: 'isConvertBase64Loading', value: boolean): void => {
        setLoading(previousLoading => ({ ...previousLoading, [type]: value }))
      },
      []
    )

    /**
     * @description Watch any change in file upload
     *
     * @param {string} uid
     * @param {UploadProps['fileList']} fileList
     *
     * @return {Promise<void>} Promise<void>
     */
    const onChangeFiles = useCallback(
      async (uid: string, fileList: UploadProps['fileList']): Promise<void> => {
        handleLoading('isConvertBase64Loading', true)
        try {
          if (fileList) {
            for (const file of fileList) {
              if (file.uid === uid && file.originFileObj) {
                const base64 = (await fileUtils_convertBase64(
                  file.originFileObj
                )) as string
                file.url = base64
              }
            }
          }

          form.setFieldsValue({
            ...form.getFieldsValue(),
            documents: fileUtils_handleFileUpload(fileList)
          })
        } catch (err) {
          if (err instanceof Error) message.error(err.message)
        } finally {
          handleLoading('isConvertBase64Loading', false)
        }
      },
      [handleLoading, form]
    )

    /**
     * @description Submit the form
     *
     * @param {boolean} isReorder
     *
     * @return {Promise<void>} Promise<void>
     */
    const onOk = useCallback(
      async (isReorder?: boolean): Promise<void> => {
        handleLoading('isConvertBase64Loading', true)
        try {
          const response = await form.validateFields()

          onSubmit(response, isReorder)
        } catch (err) {
          if (err instanceof Error) message.error(err.message)
        } finally {
          handleLoading('isConvertBase64Loading', false)
        }
      },
      [form, onSubmit, handleLoading]
    )

    return (
      <AppBaseModal
        {...rest}
        width={1024}
        confirmLoading={rest.confirmLoading || loading.isConvertBase64Loading}
        onOk={() => onOk()}
        title={
          <div className='flex items-center text-center gap-5 mb-4'>
            {/* Title */}
            <AppBaseLabel fontSize={16} isBold>
              {rest.title}
            </AppBaseLabel>

            {/* Reorder Project Button */}
            {!isFormEditable &&
              project &&
              !project?.active_project_transaction &&
              project?.project_transactions?.length === 1 &&
              project?.project_transactions?.some(
                projectTransaction =>
                  projectTransaction.status ===
                  PROJECT_TRANSACTION_STATUS.REJECTED
              ) && (
                <AppBaseButton type='primary' onClick={() => onOk(true)} danger>
                  {t('app.reorder')}
                </AppBaseButton>
              )}
          </div>
        }
        forceRender
      >
        {/* Form */}
        <Form form={form} layout='vertical' requiredMark={false}>
          {/* Name */}
          <AppBaseFormItem
            name='name'
            label={t('project.form.name')}
            rules={[{ required: true, type: 'string' }]}
          >
            <AppBaseInput
              placeholder={`${t('project.formPlaceholder.name')}`}
              maxLength={100}
              disabled={!isFormEditable}
            />
          </AppBaseFormItem>

          {/* Budget */}
          <AppBaseFormItem
            name='budget'
            label={t('project.form.budget')}
            rules={[{ required: true }]}
            trigger='onValueChange'
          >
            <AppBaseInputCurrency
              prefix='Rp'
              intlConfig={{ locale: 'id-ID', currency: 'IDR' }}
              disabled={!isFormEditable}
              placeholder={`${t('project.formPlaceholder.budget')}`}
            />
          </AppBaseFormItem>

          {/*  Documents */}
          <AppBaseFormItem
            name='documents'
            label={t('project.form.documents')}
            valuePropName='fileList'
            getValueFromEvent={fileUtils_normFile}
            rules={[{ required: true }]}
          >
            <AppBaseUpload
              beforeUpload={() => false}
              onChange={event => onChangeFiles(event.file.uid, event.fileList)}
              disabled={!isFormEditable}
              multiple
            >
              {isFormEditable && (
                <AppBaseButton icon={<UploadOutlined />}>
                  Upload Documents
                </AppBaseButton>
              )}
            </AppBaseUpload>
          </AppBaseFormItem>

          {/* Description */}
          <AppBaseFormItem
            name='description'
            label={t('project.form.description')}
            rules={[{ required: true, type: 'string' }]}
          >
            <AppBaseInputTextArea
              placeholder={`${t('project.formPlaceholder.description')}`}
              maxLength={255}
              disabled={!isFormEditable}
            />
          </AppBaseFormItem>

          {/* Start Date */}
          <AppBaseFormItem
            name='start_date'
            label={t('project.form.startDate')}
            rules={[{ required: true }]}
          >
            <AppBaseDatePicker
              placeholder={`${t('project.formPlaceholder.startDate')}`}
              disabled={!isFormEditable}
            />
          </AppBaseFormItem>
          {/* End Date */}
          <AppBaseFormItem
            name='end_date'
            label={t('project.form.endDate')}
            rules={[{ required: true }]}
          >
            <AppBaseDatePicker
              placeholder={`${t('project.formPlaceholder.endDate')}`}
              disabled={!isFormEditable}
            />
          </AppBaseFormItem>
        </Form>
        {/* End Form */}

        {/* Project Transaction */}
        {!isFormEditable &&
          project &&
          project?.project_transactions?.length > 0 && (
            <>
              <AppBaseDivider />

              {/* Todo: Change To Locale */}
              <AppBaseLabel isBold fontSize={16} marginBottom={12}>
                Project Transactions
              </AppBaseLabel>

              <Collapse>
                {project?.project_transactions?.map(projectTransaction => (
                  <Collapse.Panel
                    header={
                      <div className='flex items-center gap-5'>
                        <AppBaseLabel isBold fontSize={14}>
                          {dateUtils_formatDate(projectTransaction.created_at)}
                        </AppBaseLabel>
                        <ProjectTransactionStatusTag
                          status={projectTransaction.status}
                        />
                      </div>
                    }
                    key={projectTransaction.id}
                  >
                    <Row gutter={24} className='mb-4'>
                      {/* Name */}
                      <Col span={12}>
                        <AppBaseLabel fontSize={14} isBold>
                          {t('project.form.name')}
                        </AppBaseLabel>
                        <AppBaseLabel fontSize={14}>
                          {projectTransaction
                            ? projectTransaction.active_project.name
                            : '-'}
                        </AppBaseLabel>
                      </Col>
                      {/* Budget */}
                      <Col span={12}>
                        <AppBaseLabel fontSize={14} isBold>
                          {t('project.form.budget')}
                        </AppBaseLabel>
                        <AppBaseLabel fontSize={14}>
                          {projectTransaction
                            ? currencyUtils_idr(
                                projectTransaction.active_project.budget
                              )
                            : '-'}
                        </AppBaseLabel>
                      </Col>
                    </Row>

                    {/*  Documents */}
                    <Row className='mb-4'>
                      <Col span={24}>
                        <AppBaseLabel fontSize={14} isBold>
                          {t('project.form.documents')}
                        </AppBaseLabel>
                        {projectTransaction?.active_project.documents && (
                          <AppBaseUpload
                            fileList={
                              projectTransaction?.active_project.documents
                            }
                            disabled
                          ></AppBaseUpload>
                        )}
                      </Col>
                    </Row>

                    {/* Description */}
                    <Row className='mb-4'>
                      <Col span={24}>
                        <AppBaseLabel fontSize={14} isBold>
                          {t('project.form.description')}
                        </AppBaseLabel>
                        <AppBaseLabel fontSize={14}>
                          {projectTransaction
                            ? projectTransaction.active_project.description
                            : '-'}
                        </AppBaseLabel>
                      </Col>
                    </Row>

                    <Row gutter={24} className='mb-4'>
                      {/* Start Date */}
                      <Col span={12}>
                        <AppBaseLabel fontSize={14} isBold>
                          {t('project.form.startDate')}
                        </AppBaseLabel>
                        <AppBaseLabel fontSize={14}>
                          {projectTransaction
                            ? dateUtils_formatDate(
                                projectTransaction.active_project.start_date,
                                {
                                  noTime: true
                                }
                              )
                            : '-'}
                        </AppBaseLabel>
                      </Col>
                      {/* End Date */}
                      <Col span={12}>
                        <AppBaseLabel fontSize={14} isBold>
                          {t('project.form.endDate')}
                        </AppBaseLabel>
                        <AppBaseLabel fontSize={14}>
                          {projectTransaction
                            ? dateUtils_formatDate(
                                projectTransaction.active_project.end_date,
                                {
                                  noTime: true
                                }
                              )
                            : '-'}
                        </AppBaseLabel>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={24}>
                        <AppBaseDivider />

                        <AppBaseLabel isBold fontSize={14}>
                          {t('projectTransaction.form.users')}
                        </AppBaseLabel>
                        <List
                          itemLayout='horizontal'
                          dataSource={projectTransaction?.users || []}
                          renderItem={user => {
                            return (
                              <>
                                <List.Item style={{ paddingLeft: 0 }}>
                                  <List.Item.Meta
                                    avatar={
                                      <AppBaseAvatar
                                        style={{
                                          backgroundColor:
                                            APP_COLOR_LIGHT.PRIMARY
                                        }}
                                      >
                                        {user.name?.[0]}
                                      </AppBaseAvatar>
                                    }
                                    title={
                                      <div className='flex items-center gap-5 mb-2'>
                                        <AppBaseLabel fontSize={14} isBold>
                                          {user.name} - {user.email}
                                        </AppBaseLabel>
                                        <ProjectTransactionStatusTag
                                          status={
                                            user.approval.approved_date
                                              ? PROJECT_TRANSACTION_STATUS.APPROVED
                                              : user.approval.rejected_date
                                              ? PROJECT_TRANSACTION_STATUS.REJECTED
                                              : PROJECT_TRANSACTION_STATUS.PENDING
                                          }
                                        />
                                      </div>
                                    }
                                    description={`${
                                      user.approval.approved_date ||
                                      user.approval.rejected_date
                                        ? `${t(
                                            `projectTransaction.approval.${
                                              user.approval.approved_date
                                                ? 'approvedAt'
                                                : 'rejectedAt'
                                            }`
                                          )} ${dateUtils_formatDate(
                                            user.approval.approved_date ||
                                              user.approval.rejected_date
                                          )}`
                                        : t('app.alert.waitingConfirmation')
                                    }`}
                                  />
                                  {user.approval.rejected_date && (
                                    <div>{user.approval.reject_reason}</div>
                                  )}
                                </List.Item>
                              </>
                            )
                          }}
                        />
                      </Col>
                    </Row>
                  </Collapse.Panel>
                ))}
              </Collapse>
            </>
          )}

        {/* End Project Transaction */}
      </AppBaseModal>
    )
  }
)

Modal.displayName = 'Modal'

export { Modal }
