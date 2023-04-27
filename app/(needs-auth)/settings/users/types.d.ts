export interface User {
  id: number
  nickname: string
  email: string
  name: string
  lastname: any
  isAdmin: boolean
}

export type UserFormValues = User
