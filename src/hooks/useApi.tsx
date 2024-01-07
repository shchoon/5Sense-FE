const IP_ADDRESS = process.env.NEXT_PUBLIC_IP_ADDRESS

const checkExpiredToken = () => {
  const currentDate = new Date()
  const currentDateUTC = Date.parse(currentDate.toISOString()) / 1000
  const accessTokenExp =
    Date.parse(`${localStorage.getItem('accessTokenExp')}`) / 1000

  if ((accessTokenExp - currentDateUTC) / 60 < 5) {
    return false
  } else {
    return true
  }
}

export const fetchApi = async (url: string, method: string, data?: any) => {
  const accessToken = localStorage.getItem('accessToken')
  const refreshToken = localStorage.getItem('refreshToken')

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
      const res1 = await fetch(IP_ADDRESS + url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(data)
      })

      if (!res1.ok) {
        throw new Error('error')
      }

      const res2 = await fetch(IP_ADDRESS + '/auth/reissue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${refreshToken}`
        }
      })

      const tokenData = res2.json()

      return tokenData
    } catch (error) {
      alert('센터정보를 모두 입력해주세요.')
    }

    //alert(JSON.stringify(requestCenterRegister, null, 2))

    //const data1 = await requestCenterRegister

    /* const requestReissueToken = await fetch(IP_ADDRESS + '/auth/reissue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${refreshToken}`
        }
      }) */

    //const data2 = await requestReissueToken

    //return { data1, data2 }
    /* try {
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')
      const requestCenterRegister = await fetch(IP_ADDRESS + url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(data)
      })

      //alert(JSON.stringify(requestCenterRegister, null, 2))

      const data1 = await requestCenterRegister

      const requestReissueToken = await fetch(IP_ADDRESS + '/auth/reissue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${refreshToken}`
        }
      })

      const data2 = await requestReissueToken

      return { data1, data2 }
    } catch (error) {
      console.log(error)
      alert('error')
    } */
  } else {
    if (!checkExpiredToken()) {
      /* accessToken is expired */
      try {
        const requestReissueToken = await fetch(IP_ADDRESS + '/auth/reissue', {
          method: 'POST',
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
