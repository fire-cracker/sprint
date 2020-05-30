import axios from 'axios'

export const login = async (email, password, isAdmin) => {
  const response = await axios.post('/v1/signin', {email, password, isAdmin})
  return response
}
