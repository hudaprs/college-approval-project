export enum AUTH_ROLE {
  CLIENT = 'Client',
  MARKETING = 'Marketing',
  CFO = 'CFO',
  CEO = 'CEO',
  CTO = 'CTO',
  ADMIN = 'Admin'
}

export const AUTH_ROLE_LIST: AUTH_ROLE[] = Object.values(AUTH_ROLE)
