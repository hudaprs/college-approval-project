// React Router DOM
import { RouteObject } from 'react-router-dom'

// Router
import { useProjectRouter } from '@/features/project-management/project/router/project.router'

const useProjectManagementRouter = (): RouteObject[] => {
  // Router
  const project = useProjectRouter()

  return [
    {
      path: 'project-management',
      children: [...project]
    }
  ]
}

export { useProjectManagementRouter }
