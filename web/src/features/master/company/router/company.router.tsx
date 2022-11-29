// React Lazily
import { AppRouteGuard } from '@/features/app/components'
import { lazily } from 'react-lazily'

// React Router DOM
import { RouteObject } from 'react-router-dom'

// UI
const { CompanyIndex } = lazily(() => import('@/features/master/company/ui'))

const useCompanyRouter = (): RouteObject[] => {
  return [
    {
      path: 'companies',
      children: [
        {
          path: '',
          element: (
            <AppRouteGuard>
              <CompanyIndex />
            </AppRouteGuard>
          )
        }
      ]
    }
  ]
}

export { useCompanyRouter }
