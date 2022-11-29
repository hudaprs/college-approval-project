// React
import { memo, useCallback } from 'react'

// Components
import {
  AppBaseFormItem,
  AppBaseInput,
  AppBaseInputTextArea,
  AppBaseModal
} from '@/features/app/components'
import { ICompanyForm } from '@/features/master/company/interfaces/company.interface'

// Interfaces
import { IModalProps } from './interfaces'

// i18n
import { useTranslation } from 'react-i18next'

// Antd
import { Form } from 'antd'

const Modal = memo(
  ({ onSubmit, form, isFormEditable, ...rest }: IModalProps) => {
    // Hook
    const { t } = useTranslation()

    /**
     * @description Submit the form
     *
     * @return {void} void
     */
    const onOk = useCallback(async (): Promise<void> => {
      try {
        const response = (await form.validateFields()) as ICompanyForm

        onSubmit(response)
      } catch (_) {
        //
      }
    }, [form, onSubmit])

    return (
      <AppBaseModal {...rest} onOk={onOk} forceRender>
        <Form form={form} layout='vertical' requiredMark={false}>
          {/* Name */}
          <AppBaseFormItem
            name='name'
            label={t('company.form.name')}
            rules={[{ required: true, type: 'string' }]}
          >
            <AppBaseInput
              placeholder={`${t('company.formPlaceholder.name')}`}
              maxLength={100}
              disabled={!isFormEditable}
            />
          </AppBaseFormItem>

          {/* Address */}
          <AppBaseFormItem
            name='address'
            label={t('company.form.address')}
            rules={[{ required: true, type: 'string' }]}
          >
            <AppBaseInputTextArea
              placeholder={`${t('company.formPlaceholder.address')}`}
              maxLength={255}
              disabled={!isFormEditable}
            />
          </AppBaseFormItem>

          {/* Phone */}
          <AppBaseFormItem
            name='phone'
            label={t('company.form.phone')}
            rules={[{ required: true, type: 'string' }]}
          >
            <AppBaseInput
              placeholder={`${t('company.formPlaceholder.phone')}`}
              maxLength={15}
              disabled={!isFormEditable}
            />
          </AppBaseFormItem>

          {/* Mobile */}
          <AppBaseFormItem name='mobile' label={t('company.form.mobile')}>
            <AppBaseInput
              placeholder={`${t('company.formPlaceholder.mobile')}`}
              maxLength={15}
              disabled={!isFormEditable}
            />
          </AppBaseFormItem>
        </Form>
      </AppBaseModal>
    )
  }
)

Modal.displayName = 'Modal'

export { Modal }
