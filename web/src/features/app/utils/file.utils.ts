// Antd
import { UploadFile, UploadProps } from 'antd'

// Interfaces
import { IAppDocument } from '@/features/app/interfaces/app-file.interface'

/**
 * @description Convert file to base64
 *
 * @param {File} file
 *
 * @return {Promise<string|void>} Promise<string|void>
 */
export const fileUtils_convertBase64 = (file: File): Promise<string | void> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = () => {
      if (typeof reader.result === 'string') resolve(reader.result)
    }

    reader.onerror = error => reject(error)
  })
}

/**
 * @description Handle get value from event
 *
 * @param {any} e
 *
 * @return {any} any
 */
export const fileUtils_normFile = (e: any): any => {
  if (Array.isArray(e)) {
    return e
  }
  return e?.fileList
}

/**
 * @description Handle file upload
 *
 * @param {UploadProps['fileList']} fileList
 *
 * @return {IAppDocument[]} documents
 */
export const fileUtils_handleFileUpload = (
  fileList: UploadProps['fileList']
): IAppDocument[] => {
  if (fileList && fileList.length > 0) {
    return fileList.map(list => ({
      uid: list.uid!,
      url: list.url!,
      name: list.name!,
      type: list.type!,
      size: list.size!
    }))
  } else {
    return []
  }
}

/**
 * @description Download base64 file
 *
 * @param {UploadFile} file
 *
 * @return {void} void
 */
export const fileUtils_downloadBase64 = (file: UploadFile): void => {
  const a = document.createElement('a') //Create <a>
  a.href = file.url! //Image Base64 Goes here
  a.download = file.name //File name Here
  a.click() //Downloaded file
}
