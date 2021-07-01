import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
  console.log('token set', token)
}

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.get(baseUrl, config)
  console.log('getAll')
  return request.then((response) => response.data)
}

const addBlog = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.put(`${baseUrl}/${id}`, newObject, config)

  return request.then((response) => response.data)
}

const deleteBlog = (id) => {
  const config = {
    headers: { Authorization: token },
  }

  axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, setToken, addBlog, update, deleteBlog }
