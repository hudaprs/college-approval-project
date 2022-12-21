// React
import { memo, useCallback } from 'react'

// Components
import { AppBaseInputTextArea, AppBaseModal } from '@/features/app/components'
// Interfaces
import { IModalRejectProps } from './interfaces'

// i18n
import { useTranslation } from 'react-i18next'

// Antd
import { Form, message } from 'antd'

const ModalReject = memo(({ onSubmit, form, ...rest }: IModalRejectProps) => {
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

      onSubmit(response)
    } catch (err) {
      if (err instanceof Error) message.error(err.message)
    }
  }, [form, onSubmit])

  return (
    <AppBaseModal
      {...rest}
      confirmLoading={rest.confirmLoading}
      onOk={onOk}
      forceRender
    >
      <Form form={form} layout='vertical' requiredMark={false}>
        <Form.Item
          name='reject_reason'
          label={`${t('projectTransaction.form.rejectReason')}`}
          rules={[{ required: true }]}
        >
          <AppBaseInputTextArea
            placeholder={`${t(
              'projectTransaction.formPlaceholder.rejectReason'
            )}`}
          />
        </Form.Item>
      </Form>
    </AppBaseModal>
  )
})

ModalReject.displayName = 'ModalReject'

export { ModalReject }
