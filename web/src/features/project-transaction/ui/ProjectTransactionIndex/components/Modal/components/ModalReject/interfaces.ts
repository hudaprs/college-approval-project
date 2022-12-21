// Antd
import { FormInstance, ModalProps } from 'antd'

// Interfaces
import { IProjectTransactionUserRejectForm } from '@/features/project-transaction/interfaces/project-transaction.interface'

export interface IModalRejectProps extends ModalProps {
  form: FormInstance<IProjectTransactionUserRejectForm>
  onSubmit: (form: IProjectTransactionUserRejectForm) => void
}
