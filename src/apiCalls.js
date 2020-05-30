import axios from 'axios'

const api = process.env.REACT_APP_API_URL;

axios.interceptors.request.use((config) => {
  const token = (() => window.localStorage.getItem('token'))();
  return Object.assign({}, config, { headers: { 'authorization': token } });
}, error => Promise.reject(error));


export const login = async (email, password, isAdmin) => {
  try {
    const { data: { token, role, firstName, lastName } } = await axios.post(`${api}/signin`, {
      email,
      password,
      isAdmin,
    })
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
  } catch (error) {
    throw error
  }
}

export const getStories = async () => {
  try {
    const { data } = await axios.get(`${api}/stories`)
    return data
  } catch (error) {
    throw error
  }
}

export const createStory = async (storyDetails) => {
  try {
    const { data } = await axios.post(`${api}/stories`, storyDetails)
    return data
  } catch (error) {
    throw error
  }
}
