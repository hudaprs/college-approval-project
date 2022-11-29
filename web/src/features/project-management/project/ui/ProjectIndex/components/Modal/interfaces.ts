// Antd
import { FormInstance, ModalProps } from 'antd'

// Interfaces
import { IProjectForm } from '@/features/project-management/project/interfaces/project.interface'

export interface IModalProps extends ModalProps {
  form: FormInstance<IProjectForm>
  isFormEditable?: boolean
  onSubmit: (form: IProjectForm) => void
}
