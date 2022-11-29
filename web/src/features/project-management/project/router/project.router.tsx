// React Lazily
import { AppRouteGuard } from '@/features/app/components'
import { lazily } from 'react-lazily'

// React Router DOM
import { RouteObject } from 'react-router-dom'

// UI
const { ProjectIndex } = lazily(
  () => import('@/features/project-management/project/ui')
)

const useProjectRouter = (): RouteObject[] => {
  return [
    {
      path: 'projects',
      children: [
        {
          path: '',
          element: (
            <AppRouteGuard>
              <ProjectIndex />
            </AppRouteGuard>
          )
        }
      ]
    }
  ]
}

export { useProjectRouter }
