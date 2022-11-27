export interface IApiPagination<T> {
  pagination: {
    total: number
    count: number
    per_page: number
    current_page: number
    total_pages: number
  }
  list: T
}

export interface IApiResponse<T> {
  message: string
  results: T
}

export interface IApiResponsePagination<T> {
  message: string
  results: IApiPagination<T>
}

export interface IApiResponseError {
  message: string
  errors?: {
    message: string
    field?: string
  }[]
}
