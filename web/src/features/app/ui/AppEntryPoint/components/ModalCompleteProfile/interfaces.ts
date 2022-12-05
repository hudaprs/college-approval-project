// Antd
import { FormInstance, ModalProps } from 'antd'

// Interfaces
import { IAuthCompleteProfileForm } from '@/features/auth/interfaces/auth.interface'
import { IAuthResponseCompanyList } from '@/features/auth/interfaces/auth-response.interface'

export interface IModalCompleteProfileProps extends ModalProps {
  form: FormInstance<IAuthCompleteProfileForm>
  selectList: {
    companyList: IAuthResponseCompanyList['results']
  }
  selectLoading: { isCompanyListLoading: boolean }
  isCompanyNotExists: boolean
  onSubmit: (form: IAuthCompleteProfileForm) => void
}
