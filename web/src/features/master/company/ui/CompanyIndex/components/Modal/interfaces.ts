// Antd
import { FormInstance, ModalProps } from 'antd'

// Interfaces
import { ICompanyForm } from '@/features/master/company/interfaces/company.interface'

export interface IModalProps extends ModalProps {
  form: FormInstance<ICompanyForm>
  isFormEditable?: boolean
  onSubmit: (form: ICompanyForm) => void
}
