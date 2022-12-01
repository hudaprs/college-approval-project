// React Router DOM
import { useRoutes } from 'react-router-dom'

// UI
import { AppNotFound } from '@/features/app/ui'

// Components
import { AppLayoutAuth, AppLayoutBackOffice } from '@/features/app/components'

// Routes General
import { useAppRouter } from '@/features/app/router/app.router'

// Routes Auth
import { useAuthRouter } from '@/features/auth/router/auth.router'

// Routes Back Office
import { useDashboardRouter } from '@/features/dashboard/router/dashboard.router'
import { useMasterRouter } from '@/features/master/router/master.router'
import { useProjectManagementRouter } from '@/features/project-management/router/project-management.router'
import { useProjectTransactionRouter } from '@/features/project-transaction/router/project-transaction.router'

const useRouter = () => {
  // Router
  const app = useAppRouter()
  const auth = useAuthRouter()
  const dashboard = useDashboardRouter()
  const master = useMasterRouter()
  const projectManagement = useProjectManagementRouter()
  const projectTransaction = useProjectTransactionRouter()

  const routes = useRoutes([
    ...app,
    {
      path: 'auth',
      element: <AppLayoutAuth />,
      children: [...auth]
    },
    {
      path: 'back-office',
      element: <AppLayoutBackOffice />,
      children: [
        ...dashboard,
        ...master,
        ...projectManagement,
        ...projectTransaction
      ]
    },
    { path: '*', element: <AppNotFound /> }
  ])

  return routes
}

export { useRouter }
