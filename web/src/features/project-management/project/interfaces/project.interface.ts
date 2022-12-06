// Interfaces
import { IAppDocument } from '@/features/app/interfaces/app-file.interface'
import { IAuthAuthenticatedUser } from '@/features/auth/interfaces/auth.interface'
import { IProjectTransaction } from '@/features/project-transaction/interfaces/project-transaction.interface'

export interface IProject {
  id: number
  user_id: number
  user: IAuthAuthenticatedUser
  name: string
  budget: number
  documents: IAppDocument[]
  description: string
  start_date: string
  end_date: string
  project_transactions: IProjectTransaction[]
  active_project_transaction: IProjectTransaction | null
  created_at: string
  updated_at: string
}

export interface IProjectForm {
  name: string
  budget: number
  documents: IAppDocument[]
  description: string
  start_date: string
  end_date: string
}
