const IP_ADDRESS = process.env.NEXT_PUBLIC_IP_ADDRESS

const isLoginType = (data: any) => {
  if (data.code && data.state) {
    return true
  }
  return false
}

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

export const fetchApi = async (url: string, method: string, data?: any) => {
  if (url.includes('login')) {
    const res = await fetch(IP_ADDRESS + url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    return res.json()
  } else if (url == '/centers') {
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
  } else {
    if (!checkExpiredToken()) {
      /* accessToken is expired */
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
    } else {
      /* accessToken is not expired */
      let accessToken = localStorage.getItem('accessToken')
      console.log('not expired')
      const res = await fetch(IP_ADDRESS + url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(data)
      })
      return res.json()
    }
  }
}
