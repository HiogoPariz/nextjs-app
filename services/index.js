import { api } from '../utils/api'

export async function getClientByName(name) {
  const res = await api.get(`/${name}`)
  return res.data
}

export async function getClientsList() {
  const res = await api.get('/clientList')
  return res.data
}
