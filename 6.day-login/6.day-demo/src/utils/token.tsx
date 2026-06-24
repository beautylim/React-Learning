const TOKEN_KEY = "token"

const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token)
}

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}

export { setToken, getToken, clearToken }