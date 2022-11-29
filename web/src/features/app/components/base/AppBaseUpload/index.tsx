// Styled Components
import styled from 'styled-components'

// Antd
import { Upload } from 'antd'

// Interfaces
import { IAppBaseUploadProps } from './interfaces'

// Utils
import { fileUtils_downloadBase64 } from '@/features/app/utils/file.utils'

export const AppBaseUpload = styled((props: IAppBaseUploadProps) => (
  <Upload {...props} onPreview={file => fileUtils_downloadBase64(file)} />
))``
