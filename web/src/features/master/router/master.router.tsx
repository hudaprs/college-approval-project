// React Router DOM
import { RouteObject } from 'react-router-dom'

// Router
import { useCompanyRouter } from '@/features/master/company/router/company.router'

const useMasterRouter = (): RouteObject[] => {
  // Router
  const company = useCompanyRouter()

  return [
    {
      path: 'master',
      children: [...company]
    }
  ]
}

export { useMasterRouter }
