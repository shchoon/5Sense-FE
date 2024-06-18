import axios, { AxiosError, AxiosResponse } from 'axios'

const current = new Date()
const checkToken = (accessTokenExp: string) => {
  const tokenExp = Date.parse(accessTokenExp) / 60000
  const currentDate = Date.parse(current.toISOString()) / 60000

  return tokenExp - currentDate
}

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_IP_ADDRESS,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// typeof 연산자는 string을 반환하기 때문
const isBrower = typeof window !== 'undefined'

instance.interceptors.request.use(
  async config => {
    if (!isBrower) {
      return config
    }

    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    const accessTokenExp = localStorage.getItem('accessTokenExp')

    if (accessToken) {
      // 토큰 유효시간 검사
      if (accessTokenExp && checkToken(accessTokenExp) < 5) {
        try {
          const { data } = await axios.post(
            process.env.NEXT_PUBLIC_IP_ADDRESS + '/auth/reissue',
            {},
            {
              headers: {
                authorization: `Bearer ${refreshToken}`
              }
            }
          )
          localStorage.setItem('accessToken', data.data.accessToken)
          localStorage.setItem('accessTokenExp', data.data.accessTokenExp)
          config.headers.Authorization = `Bearer ${data.data.accessToken}`
        } catch (error) {
          console.log(error)
        }
      } else {
        // 탈퇴 회원 요청
        if (config.url === '/auth/cancelMembership') {
          config.headers.Authorization = `Bearer ${refreshToken}`
        }
        // 센터 등록 요청
        if (config.url === 'centers') {
          const { data } = await axios.post(
            process.env.NEXT_PUBLIC_IP_ADDRESS + '/auth/reissue',
            {},
            {
              headers: {
                authorization: `Bearer ${refreshToken}`
              }
            }
          )
          localStorage.setItem('accessToken', data.data.accessToken)
          localStorage.setItem('accessTokenExp', data.data.accessTokenExp)
        }
        config.headers.Authorization = `Bearer ${accessToken}`
      }
    }
    return config
  },
  error => {
    console.error('requestError', error)
    alert(`Request error: ${error.message}`)
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  async (response: AxiosResponse) => {
    console.log(response)
    return response
  },
  error => {
    const axiosError = error as AxiosError
    if (axiosError?.response) {
      console.error(axiosError.response)
      return Promise.reject(axiosError)
    }
  }
)

export default instance
