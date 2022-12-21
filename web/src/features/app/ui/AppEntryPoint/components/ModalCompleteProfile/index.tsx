// React
import { memo, useCallback } from 'react'

// Components
import {
  AppBaseCheckbox,
  AppBaseDivider,
  AppBaseFormItem,
  AppBaseInput,
  AppBaseInputTextArea,
  AppBaseModal,
  AppBaseSelect
} from '@/features/app/components'

// Interfaces
import { IModalCompleteProfileProps } from './interfaces'

// i18n
import { useTranslation } from 'react-i18next'

// Antd
import { Form } from 'antd'

const ModalCompleteProfile = memo(
  ({
    onSubmit,
    form,
    selectList,
    selectLoading,
    isCompanyNotExists,
    ...rest
  }: IModalCompleteProfileProps) => {
    // Hook
    const { t } = useTranslation()

    /**
     * @description Submit the form
     *
     * @return {void} void
     */
    const onOk = useCallback(async (): Promise<void> => {
      try {
        const response = await form.validateFields()

        onSubmit(response)
      } catch (_) {
        //
      }
    }, [form, onSubmit])

    return (
      <AppBaseModal {...rest} onOk={onOk} forceRender>
        <Form
          form={form}
          layout='vertical'
          initialValues={{ is_company_not_exists: false }}
          requiredMark={false}
        >
          {/* Phone Number */}
          <AppBaseFormItem
            name='phone_number'
            label={t('auth.form.phoneNumber')}
            rules={[{ required: true, type: 'string' }]}
          >
            <AppBaseInput
              placeholder={`${t('auth.formPlaceholder.phoneNumber')}`}
              maxLength={15}
            />
          </AppBaseFormItem>

          {/* Company */}
          {!isCompanyNotExists && (
            <AppBaseFormItem
              name='company'
              label={t('auth.form.company')}
              rules={[{ required: true }]}
            >
              <AppBaseSelect
                placeholder={`${t('auth.formPlaceholder.company')}`}
                options={selectList.companyList.map(company => ({
                  label: company.name,
                  value: company.id
                }))}
                loading={selectLoading.isCompanyListLoading}
                style={{ width: '100%' }}
                showSearch
              />
            </AppBaseFormItem>
          )}

          {/* Is Company Not Exists Checkbox */}
          <AppBaseFormItem name='is_company_not_exists' valuePropName='checked'>
            <AppBaseCheckbox>{t('auth.form.companyNotExists')}</AppBaseCheckbox>
          </AppBaseFormItem>

          {isCompanyNotExists && (
            <>
              <AppBaseDivider />

              <h5>{t('company.title.data')}</h5>

              {/* Name */}
              <AppBaseFormItem
                name='company_name'
                label={t('company.form.name')}
                rules={[{ required: true, type: 'string' }]}
              >
                <AppBaseInput
                  placeholder={`${t('company.formPlaceholder.name')}`}
                  maxLength={100}
                />
              </AppBaseFormItem>

              {/* Address */}
              <AppBaseFormItem
                name='company_address'
                label={t('company.form.address')}
                rules={[{ required: true, type: 'string' }]}
              >
                <AppBaseInputTextArea
                  placeholder={`${t('company.formPlaceholder.address')}`}
                  maxLength={255}
                />
              </AppBaseFormItem>

              {/* Phone */}
              <AppBaseFormItem
                name='company_phone'
                label={t('company.form.phone')}
                rules={[{ required: true, type: 'string' }]}
              >
                <AppBaseInput
                  placeholder={`${t('company.formPlaceholder.phone')}`}
                  maxLength={15}
                />
              </AppBaseFormItem>

              {/* Mobile */}
              <AppBaseFormItem
                name='company_mobile'
                label={t('company.form.mobile')}
              >
                <AppBaseInput
                  placeholder={`${t('company.formPlaceholder.mobile')}`}
                  maxLength={15}
                />
              </AppBaseFormItem>
            </>
          )}
        </Form>
      </AppBaseModal>
    )
  }
)

ModalCompleteProfile.displayName = 'ModalCompleteProfile'

export { ModalCompleteProfile }
