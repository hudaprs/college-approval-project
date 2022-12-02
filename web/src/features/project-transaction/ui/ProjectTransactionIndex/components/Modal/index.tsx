// React
import { memo, useCallback } from 'react'

// Components
import {
  AppBaseAvatar,
  AppBaseButton,
  AppBaseFormItem,
  AppBaseLabel,
  AppBaseModal,
  appBaseModalConfirm,
  AppBaseSelect,
  AppBaseUpload
} from '@/features/app/components'

// Interfaces
import { IModalProps } from './interfaces'

// i18n
import { useTranslation } from 'react-i18next'

// Antd
import { Col, Form, List, message, Row } from 'antd'

// Constants
import { PROJECT_TRANSACTION_STATUS } from '@/features/project-transaction/constant/project-transaction-status.constant'
import { currencyUtils_idr } from '@/features/app/utils/currency.utils'
import { dateUtils_formatDate } from '@/features/app/utils/date.utils'
import { ProjectTransactionStatusTag } from '@/features/project-transaction/components'
import { APP_COLOR_LIGHT } from '@/features/app/constant/app-style.constant'

const Modal = memo(
  ({
    onSubmit,
    form,
    projectTransaction,
    isFormEditable,
    authenticatedUserId,
    selectLoading,
    selectList,
    ...rest
  }: IModalProps) => {
    // Hook
    const { t } = useTranslation()

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
                  ? currencyUtils_idr(projectTransaction.active_project.budget)
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
                    options={selectList.statusList.map(status => ({
                      label: status,
                      value: status
                    }))}
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
          </Row>

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
                  <List
                    itemLayout='horizontal'
                    dataSource={projectTransaction?.users || []}
                    renderItem={user => {
                      return (
                        <>
                          <AppBaseLabel fontSize={14} isBold marginBottom={10}>
                            {t('projectTransaction.form.users')}
                          </AppBaseLabel>

                          <List.Item
                            actions={
                              user.id === authenticatedUserId
                                ? [
                                    <AppBaseButton
                                      key='approve-button'
                                      type='primary'
                                    >
                                      {t('projectTransaction.approval.approve')}
                                    </AppBaseButton>,
                                    <AppBaseButton
                                      key='reject-button'
                                      type='primary'
                                      danger
                                      block
                                    >
                                      {t('projectTransaction.approval.reject')}
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
                                <>
                                  <AppBaseLabel fontSize={14} isBold>
                                    {user.name} - {user.email}
                                  </AppBaseLabel>
                                </>
                              }
                              description={`${t(
                                'projectTransaction.approval.assignedAt'
                              )} ${dateUtils_formatDate(user.created_at)} `}
                            />
                            {user.approval.rejected_date && (
                              <div>{user.approval.reject_reason}</div>
                            )}
                          </List.Item>
                        </>
                      )
                    }}
                  />
                )}
              </Col>
            </Row>
          )}
        </Form>
      </AppBaseModal>
    )
  }
)

Modal.displayName = 'Modal'

export { Modal }
