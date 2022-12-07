// Antd
import { FormInstance, ModalProps } from 'antd'

// Interfaces
import { IProjectForm } from '@/features/project-management/project/interfaces/project.interface'
import { IProjectResponseDetail } from '@/features/project-management/project/interfaces/project-response.interface'

export interface IModalProps extends ModalProps {
  form: FormInstance<IProjectForm>
  project?: IProjectResponseDetail['results'] | undefined
  isFormEditable?: boolean
  onSubmit: (form: IProjectForm, isReorder?: boolean) => void
}
