// Interfaces
import { IAppDocument } from '@/features/app/interfaces/app-file.interface'

export interface IProject {
  id: number
  name: string
  budget: number
  documents: IAppDocument[]
  description: string
  start_date: string
  end_date: string
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
