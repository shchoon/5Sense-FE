interface DataType {
  code: string
  state: string
  name: string
  address: string
  mainPhone: string
  phone: string
  particulars: string
}

const IP_ADDRESS = process.env.NEXT_PUBLIC_IP_ADDRESS

const checkExpiredToken = () => {
  let currentDate = new Date()
  let currentDateUTC = Date.parse(currentDate.toISOString()) / 1000
  let accessTokenExp =
    Date.parse(`${localStorage.getItem('accessTokenExp')}`) / 1000

  if ((accessTokenExp - currentDateUTC) / 60 < 5) {
    return false
  } else {
    return true
  }
}

export const fetchApi = async (
  url: string,
  method: string,
  data?: DataType
) => {
  if (url.includes('login')) {
    try {
      const res = await fetch(IP_ADDRESS + url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      return res.json()
    } catch (error) {
      alert('error')
    }
  } else if (url == '/centers') {
    try {
      let accessToken = localStorage.getItem('accessToken')
      let refreshToken = localStorage.getItem('refreshToken')
      const requestCenterRegister = await fetch(IP_ADDRESS + url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(data)
      })

      const data1 = await requestCenterRegister.json()

      const requestReissueToken = await fetch(IP_ADDRESS + '/auth/reissue', {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${refreshToken}`
        }
      })

      const data2 = await requestReissueToken.json()

      return { data1, data2 }
    } catch (error) {
      alert('error')
    }
  } else {
    if (!checkExpiredToken()) {
      /* accessToken is expired */
      try {
        let refreshToken = localStorage.getItem('refreshToken')
        const requestReissueToken = await fetch(IP_ADDRESS + '/auth/reissue', {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${refreshToken}`
          }
        })

        const data1 = await requestReissueToken.json()

        /* 받아온 토큰 데이터 담기 */
        localStorage.setItem('accessToken', data1.data.accessToken)
        localStorage.setItem('accessTokenExp', data1.data.accessTokenExp)

        /* 원하는 요청 보내기 */
        const res = await fetch(IP_ADDRESS + url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${data1.data.accessToken}`
          },
          body: JSON.stringify(data)
        })
        return res.json()
      } catch (error) {
        alert('error')
      }
    } else {
      /* accessToken is not expired */
      try {
        let accessToken = localStorage.getItem('accessToken')
        const res = await fetch(IP_ADDRESS + url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify(data)
        })
        return res.json()
      } catch (error) {
        alert('error')
      }
    }
  }
}
