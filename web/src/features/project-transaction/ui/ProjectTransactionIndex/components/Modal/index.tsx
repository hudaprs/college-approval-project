// React
import { memo, useCallback, useState } from 'react'

// Components
import {
  AppBaseButton,
  AppBaseDatePicker,
  AppBaseFormItem,
  AppBaseInput,
  AppBaseInputCurrency,
  AppBaseInputTextArea,
  AppBaseModal,
  AppBaseSelect,
  AppBaseUpload
} from '@/features/app/components'

// Interfaces
import { IModalProps } from './interfaces'

// i18n
import { useTranslation } from 'react-i18next'

// Antd
import { Form, UploadProps, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

// Utils
import {
  fileUtils_convertBase64,
  fileUtils_handleFileUpload,
  fileUtils_normFile
} from '@/features/app/utils/file.utils'

const Modal = memo(
  ({
    onSubmit,
    form,
    isFormEditable,
    selectLoading,
    selectList,
    ...rest
  }: IModalProps) => {
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
     * @return {Promise<void>} Promise<void>
     */
    const onOk = useCallback(async (): Promise<void> => {
      handleLoading('isConvertBase64Loading', true)
      try {
        const response = await form.validateFields()

        onSubmit(response)
      } catch (err) {
        if (err instanceof Error) message.error(err.message)
      } finally {
        handleLoading('isConvertBase64Loading', false)
      }
    }, [form, onSubmit, handleLoading])

    return (
      <AppBaseModal
        {...rest}
        confirmLoading={rest.confirmLoading || loading.isConvertBase64Loading}
        onOk={onOk}
        forceRender
      >
        <Form form={form} layout='vertical' requiredMark={false}>
          {/* Name */}
          <AppBaseFormItem name='name' label={t('project.form.name')}>
            <AppBaseInput
              placeholder={`${t('project.formPlaceholder.name')}`}
              maxLength={100}
              disabled
            />
          </AppBaseFormItem>

          {/* Budget */}
          <AppBaseFormItem
            name='budget'
            label={t('project.form.budget')}
            trigger='onValueChange'
          >
            <AppBaseInputCurrency
              prefix='Rp'
              intlConfig={{ locale: 'id-ID', currency: 'IDR' }}
              disabled
              placeholder={`${t('project.formPlaceholder.budget')}`}
            />
          </AppBaseFormItem>

          {/*  Documents */}
          <AppBaseFormItem
            name='documents'
            label={t('project.form.documents')}
            valuePropName='fileList'
            getValueFromEvent={fileUtils_normFile}
          >
            <AppBaseUpload
              beforeUpload={() => false}
              onChange={event => onChangeFiles(event.file.uid, event.fileList)}
              disabled
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
          >
            <AppBaseInputTextArea
              placeholder={`${t('project.formPlaceholder.description')}`}
              maxLength={255}
              disabled
            />
          </AppBaseFormItem>

          {/* Start Date */}
          <AppBaseFormItem
            name='start_date'
            label={t('project.form.startDate')}
          >
            <AppBaseDatePicker
              placeholder={`${t('project.formPlaceholder.startDate')}`}
              disabled
            />
          </AppBaseFormItem>

          {/* End Date */}
          <AppBaseFormItem name='end_date' label={t('project.form.endDate')}>
            <AppBaseDatePicker
              placeholder={`${t('project.formPlaceholder.endDate')}`}
              disabled
            />
          </AppBaseFormItem>

          <hr />

          {/* Status */}
          <AppBaseFormItem
            name='status'
            label={t('app.form.status')}
            rules={[{ required: true }]}
          >
            <AppBaseSelect
              placeholder={`${t('app.formPlaceholder.status')}`}
              options={selectList.statusList.map(status => ({
                label: status,
                value: status
              }))}
            />
          </AppBaseFormItem>
        </Form>
      </AppBaseModal>
    )
  }
)

Modal.displayName = 'Modal'

export { Modal }
