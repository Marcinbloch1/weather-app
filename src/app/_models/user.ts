import { City } from './city'

export interface User {
  id?: number
  firstname?: string
  lastname?: string
  email?: string
  country?: string
  city?: City
  role?: string
  token?: string
}
