// Constant
import { APP_LANGUAGE } from '@/features/app/constant/app.constant'

// App
import appEn from '@/features/app/locale/app.en.locale.json'
import appId from '@/features/app/locale/app.id.locale.json'

// Auth
import authEn from '@/features/auth/locale/auth.en.locale.json'
import authId from '@/features/auth/locale/auth.id.locale.json'

// Company
import companyEn from '@/features/master/company/locale/company.en.locale.json'
import companyId from '@/features/master/company/locale/company.id.locale.json'

// Project
import projectEn from '@/features/project-management/project/locale/project.en.locale.json'
import projectId from '@/features/project-management/project/locale/project.id.locale.json'

const language = {
  [APP_LANGUAGE.EN]: {
    translation: {
      ...appEn,
      ...authEn,
      ...companyEn,
      ...projectEn
    }
  },
  [APP_LANGUAGE.ID]: {
    translation: {
      ...appId,
      ...authId,
      ...companyId,
      ...projectId
    }
  }
}

export { language }
