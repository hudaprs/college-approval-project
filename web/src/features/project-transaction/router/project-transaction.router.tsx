// React Lazily
import { AppRouteGuard } from '@/features/app/components'
import { lazily } from 'react-lazily'

// React Router DOM
import { RouteObject } from 'react-router-dom'

// UI
const { ProjectTransactionIndex } = lazily(
  () => import('@/features/project-transaction/ui')
)

const useProjectTransactionRouter = (): RouteObject[] => {
  return [
    {
      path: 'project-transaction',
      children: [
        {
          path: '',
          element: (
            <AppRouteGuard>
              <ProjectTransactionIndex />
            </AppRouteGuard>
          )
        }
      ]
    }
  ]
}

export { useProjectTransactionRouter }
