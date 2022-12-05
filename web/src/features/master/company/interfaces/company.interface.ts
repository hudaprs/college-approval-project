export interface ICompany {
  id: number
  name: string
  address: string
  mobile: string
  created_at: string
  updated_at: string
}

export interface ICompanyForm {
  name: string
  address: string
  phone: string
  mobile: string
}

export type ICompanyList = Omit<
  ICompany,
  'address' | 'mobile' | 'created_at' | 'updated_at'
>
