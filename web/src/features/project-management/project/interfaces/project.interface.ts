// Interfaces
import { IAppDocument } from '@/features/app/interfaces/app-file.interface'
import { IProjectTransaction } from '@/features/project-transaction/interfaces/project-transaction.interface'

export interface IProject {
  id: number
  name: string
  budget: number
  documents: IAppDocument[]
  description: string
  start_date: string
  end_date: string
  project_transactions: IProjectTransaction[]
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
