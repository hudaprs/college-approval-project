// React
import { memo, useCallback, useState, useMemo } from 'react'

// Components
import {
  AppBaseAvatar,
  AppBaseButton,
  AppBaseDivider,
  AppBaseFormItem,
  AppBaseInputTextArea,
  AppBaseLabel,
  AppBaseModal,
  appBaseModalConfirm,
  AppBaseSelect,
  AppBaseUpload
} from '@/features/app/components'
import { ProjectTransactionStatusTag } from '@/features/project-transaction/components'
import { ModalReject } from './components'

// Interfaces
import { IModalProps } from './interfaces'

// i18n
import { useTranslation } from 'react-i18next'

// Antd
import { Alert, Col, Divider, Form, List, message, Row } from 'antd'

// Constants
import { PROJECT_TRANSACTION_STATUS } from '@/features/project-transaction/constant/project-transaction-status.constant'
import { APP_COLOR_LIGHT } from '@/features/app/constant/app-style.constant'

// Utils
import { currencyUtils_idr } from '@/features/app/utils/currency.utils'
import { dateUtils_formatDate } from '@/features/app/utils/date.utils'
import { AUTH_ROLE } from '@/features/auth/constant/auth-role.constant'
import { IProjectTransactionUserRejectForm } from '@/features/project-transaction/interfaces/project-transaction.interface'
import { CloudDownloadOutlined } from '@ant-design/icons'

// PDF Make
import * as pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'
;(pdfMake as any).vfs = pdfFonts.pdfMake.vfs

const Modal = memo(
  ({
    onSubmit,
    form,
    projectTransaction,
    isFormEditable,
    authenticatedUserId,
    authenticatedUserRole,
    selectLoading,
    selectList,
    actionLoading,
    onUserApprove,
    onUserReject,
    onUserResetDecision,
    ...rest
  }: IModalProps) => {
    // Hook
    const { t } = useTranslation()
    const [modal, setModal] = useState<{ isRejectOpen: boolean }>({
      isRejectOpen: false
    })
    const [rejectForm] = Form.useForm()
    const isCeoRejected = useMemo((): boolean => {
      return Boolean(
        projectTransaction?.users.find(user => user.role === AUTH_ROLE.CEO)
          ?.approval.rejected_date
      )
    }, [projectTransaction?.users])
    const isMoreThanTwoCLevelRejected = useMemo((): boolean => {
      if (projectTransaction?.users) {
        return (
          projectTransaction.users?.filter(user => user.approval.rejected_date)
            ?.length > 1
        )
      } else {
        return false
      }
    }, [projectTransaction?.users])

    /**
     * @description Handle modal
     *
     * @param {string} type
     * @param {boolean} value
     *
     * @return {void} void
     */
    const handleModal = useCallback(
      (type: 'isRejectOpen', value: boolean): void => {
        setModal(previousModal => ({ ...previousModal, [type]: value }))

        if (!value) {
          if (type === 'isRejectOpen') {
            rejectForm.resetFields()
          }
        }
      },
      [rejectForm]
    )

    /**
     * @description Download receipt
     *
     * @return {Promise<void>} Promise<void>
     */
    const onDownloadReceipt = useCallback(async (): Promise<void> => {
      if (projectTransaction) {
        pdfMake
          .createPdf({
            content: [
              { text: 'Project Transaction', style: 'header' },
              {
                text: 'Here are the detail of your project, thank you for your cooperation',
                style: 'text'
              },
              {
                table: {
                  widths: ['*', '*'],
                  body: [
                    ['Name', 'Budget'],
                    [
                      projectTransaction.active_project.name,
                      currencyUtils_idr(
                        projectTransaction.active_project.budget
                      )
                    ]
                  ]
                },
                layout: 'noBorders',
                style: 'marginBottomLow'
              },
              {
                table: {
                  widths: ['*'],
                  body: [
                    ['Description'],
                    [projectTransaction.active_project.description]
                  ]
                },
                layout: 'noBorders',
                style: 'marginBottomLow'
              },
              {
                table: {
                  widths: ['*', '*'],
                  body: [
                    ['Start Date', 'End Date'],
                    [
                      projectTransaction.active_project.start_date,
                      projectTransaction.active_project.end_date
                    ]
                  ]
                },
                layout: 'noBorders',
                style: 'marginBottomLow'
              },
              {
                table: {
                  widths: ['*'],
                  body: [['Status'], [projectTransaction.status]]
                },
                layout: 'noBorders',
                style: 'marginBottomLow'
              },
              {
                table: {
                  widths: ['*', '*', '*'],
                  body: [
                    ['Approved Date', 'Reject Reason', 'Rejected Date'],
                    [
                      projectTransaction.approved_date,
                      projectTransaction.reject_reason,
                      projectTransaction.rejected_date
                    ]
                  ]
                },
                layout: 'noBorders',
                style: 'marginBottomLow'
              }
            ],
            styles: {
              header: {
                fontSize: 18,
                bold: true
              },
              subheader: {
                fontSize: 15,
                bold: true
              },
              quote: {
                italics: true
              },
              small: {
                fontSize: 8
              },
              text: {
                marginBottom: 10
              },
              marginBottomLow: {
                marginBottom: 10
              }
            }
          })
          .download(
            `${projectTransaction?.active_project.name}-${dateUtils_formatDate(
              projectTransaction.created_at
            )}`
          )
      }
    }, [projectTransaction])

    /**
     * @description Reject project
     *
     * @param {IProjectTransactionUserRejectForm} form
     *
     * @return {Promise<void>} Promise<void>
     */
    const _rejectProject = useCallback(
      async (form: IProjectTransactionUserRejectForm): Promise<void> => {
        try {
          await onUserReject(form)

          handleModal('isRejectOpen', false)
        } catch (_) {
          //
        }
      },
      [onUserReject, handleModal]
    )

    /**
     * @description Submit the form
     *
     * @return {Promise<void>} Promise<void>
     */
    const onOk = useCallback(async (): Promise<void> => {
      try {
        const response = await form.validateFields()

        appBaseModalConfirm({
          title: t('projectTransaction.ask.submit'),
          onOk() {
            onSubmit(response)
          },
          onCancel() {
            //
          }
        })
      } catch (err) {
        if (err instanceof Error) message.error(err.message)
      }
    }, [form, onSubmit, t])

    return (
      <>
        {/* Detail Form */}
        <AppBaseModal
          {...rest}
          confirmLoading={
            rest.confirmLoading ||
            selectLoading.isStatusListLoading ||
            selectLoading.isUserListLoading
          }
          onOk={onOk}
          width={1024}
          forceRender
        >
          <Form form={form} layout='vertical' requiredMark={false}>
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
                    fileList={projectTransaction?.active_project.documents}
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

            {/* Status */}
            {[AUTH_ROLE.MARKETING].includes(authenticatedUserRole) && (
              <Row className='mb-4'>
                <Col span={24}>
                  <AppBaseLabel fontSize={14} isBold marginBottom={10}>
                    {t('app.form.status')}
                  </AppBaseLabel>

                  {isFormEditable ? (
                    <AppBaseFormItem
                      name='status'
                      label={t('app.form.status')}
                      rules={[{ required: true }]}
                      noStyle
                    >
                      <AppBaseSelect
                        placeholder={`${t('app.formPlaceholder.status')}`}
                        options={selectList.statusList
                          .map(status => ({
                            label: status,
                            value: status
                          }))
                          .filter(status =>
                            isCeoRejected || isMoreThanTwoCLevelRejected
                              ? status.value ===
                                PROJECT_TRANSACTION_STATUS.REJECTED
                              : status
                          )}
                        disabled={!isFormEditable}
                        loading={selectLoading.isStatusListLoading}
                        style={{ width: '100%' }}
                        showSearch
                      />
                    </AppBaseFormItem>
                  ) : projectTransaction ? (
                    <ProjectTransactionStatusTag
                      status={projectTransaction.status}
                    />
                  ) : (
                    <>-</>
                  )}
                </Col>
                {(isCeoRejected || isMoreThanTwoCLevelRejected) &&
                  isFormEditable && (
                    <Col span={24} className='pt-4'>
                      <Alert
                        type='warning'
                        showIcon
                        message={`${t(
                          `projectTransaction.alert.${
                            isMoreThanTwoCLevelRejected
                              ? 'twoCLevelRejected'
                              : 'ceoRejected'
                          }`
                        )}`}
                      />
                    </Col>
                  )}
              </Row>
            )}

            {/* Reject Reason */}
            {[PROJECT_TRANSACTION_STATUS.REJECTED].includes(
              form.getFieldValue('status')
            ) && (
              <Row>
                <Col span={isFormEditable ? 24 : 12}>
                  {isFormEditable ? (
                    <AppBaseFormItem
                      name='reject_reason'
                      label={`${t('app.form.rejectReason')}`}
                      rules={[{ required: true }]}
                    >
                      <AppBaseInputTextArea
                        placeholder={`${t('app.formPlaceholder.rejectReason')}`}
                      />
                    </AppBaseFormItem>
                  ) : projectTransaction ? (
                    <>
                      <AppBaseLabel fontSize={14} isBold marginBottom={10}>
                        {t('app.form.rejectReason')}
                      </AppBaseLabel>

                      <AppBaseLabel fontSize={14}>
                        {projectTransaction.reject_reason || '-'}
                      </AppBaseLabel>
                    </>
                  ) : (
                    <>-</>
                  )}
                </Col>
                {!isFormEditable && (
                  <Col span={12}>
                    <AppBaseLabel fontSize={14} isBold marginBottom={10}>
                      {t('app.form.rejectedDate')}
                    </AppBaseLabel>

                    <AppBaseLabel fontSize={14}>
                      {projectTransaction
                        ? dateUtils_formatDate(projectTransaction.rejected_date)
                        : '-'}
                    </AppBaseLabel>
                  </Col>
                )}
              </Row>
            )}

            {/* Users */}
            {(form.getFieldValue('status') ===
              PROJECT_TRANSACTION_STATUS.INTERNAL_AGREEMENT_PROCESS ||
              (form.getFieldValue('users') as number[])?.length > 0) && (
              <Row>
                <Col span={24}>
                  {isFormEditable ? (
                    <AppBaseFormItem noStyle shouldUpdate>
                      {({ getFieldValue }) => {
                        return (
                          <AppBaseFormItem
                            name='users'
                            label={t('projectTransaction.form.users')}
                            rules={[{ required: true }]}
                          >
                            <AppBaseSelect
                              placeholder={`${t(
                                'projectTransaction.formPlaceholder.users'
                              )}`}
                              options={selectList.userList.map(user => ({
                                label: user.name,
                                value: user.id
                              }))}
                              disabled={
                                !isFormEditable ||
                                getFieldValue('status') !==
                                  PROJECT_TRANSACTION_STATUS.INTERNAL_AGREEMENT_PROCESS
                              }
                              loading={selectLoading.isUserListLoading}
                              mode='multiple'
                              style={{ width: '100%' }}
                              showSearch
                            />
                          </AppBaseFormItem>
                        )
                      }}
                    </AppBaseFormItem>
                  ) : (
                    <>
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
                              <List.Item
                                style={{ paddingLeft: 0 }}
                                actions={
                                  user.id === authenticatedUserId &&
                                  !user.approval.approved_date &&
                                  !user.approval.rejected_date
                                    ? [
                                        <AppBaseButton
                                          key='approve-button'
                                          type='primary'
                                          onClick={onUserApprove}
                                        >
                                          {t(
                                            'projectTransaction.approval.approve'
                                          )}
                                        </AppBaseButton>,
                                        <AppBaseButton
                                          key='reject-button'
                                          type='primary'
                                          onClick={() =>
                                            handleModal('isRejectOpen', true)
                                          }
                                          danger
                                          block
                                        >
                                          {t(
                                            'projectTransaction.approval.reject'
                                          )}
                                        </AppBaseButton>
                                      ]
                                    : user.id === authenticatedUserId &&
                                      (user.approval.approved_date ||
                                        user.approval.rejected_date)
                                    ? [
                                        <AppBaseButton
                                          key='reset-decision-button'
                                          type='primary'
                                          onClick={onUserResetDecision}
                                          danger
                                        >
                                          {t(
                                            'projectTransaction.resetDecision'
                                          )}
                                        </AppBaseButton>
                                      ]
                                    : undefined
                                }
                              >
                                <List.Item.Meta
                                  avatar={
                                    <AppBaseAvatar
                                      style={{
                                        backgroundColor: APP_COLOR_LIGHT.PRIMARY
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
                                  <div className='flex flex-col'>
                                    <AppBaseLabel isBold fontSize={14}>
                                      Reject Reason:
                                    </AppBaseLabel>
                                    <AppBaseLabel fontSize={12}>
                                      {user.approval.reject_reason}
                                    </AppBaseLabel>
                                  </div>
                                )}
                              </List.Item>
                            </>
                          )
                        }}
                      />
                    </>
                  )}
                </Col>
              </Row>
            )}

            {/* Download Receipt */}
            {projectTransaction &&
              [
                PROJECT_TRANSACTION_STATUS.APPROVED,
                PROJECT_TRANSACTION_STATUS.REJECTED
              ].includes(projectTransaction.status) && (
                <>
                  <Divider />

                  <Row className='mb-4 mt-8'>
                    <Col span={24}>
                      <div
                        className='flex items-center flex-row gap-5 cursor-pointer'
                        onClick={onDownloadReceipt}
                      >
                        <CloudDownloadOutlined size={24} />

                        <AppBaseLabel
                          fontSize={14}
                          isBold
                          style={{ color: '#1677ff' }}
                        >
                          {t('app.transaction.download.receipt')}
                        </AppBaseLabel>
                      </div>
                    </Col>
                  </Row>
                </>
              )}
          </Form>
        </AppBaseModal>
        {/* End Detail Form */}

        {/* Reject Modal */}
        <ModalReject
          open={modal.isRejectOpen}
          confirmLoading={actionLoading.projectTransaction_isUserRejectLoading}
          form={rejectForm}
          onSubmit={_rejectProject}
          onCancel={() => handleModal('isRejectOpen', false)}
        />
        {/* End Reject Modal */}
      </>
    )
  }
)

Modal.displayName = 'Modal'

export { Modal }
