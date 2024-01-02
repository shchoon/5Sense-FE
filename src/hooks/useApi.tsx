import local from 'next/font/local'

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

//console.log(checkExpiredToken())

export const fetchApi = async (url: string, method: string, data?: any) => {
  if (isLoginType(data)) {
    const res = await fetch(IP_ADDRESS + url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    return res.json()
  } else {
    if (!checkExpiredToken()) {
      let refreshToken = localStorage.getItem('refreshToken')
      fetch(IP_ADDRESS + '/auth/reissue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${refreshToken}`
        }
      })
        .then(res => {
          return res.json()
        })
        .then(result => {
          localStorage.setItem('accessToken', result.data.accessToken)
          localStorage.setItem('refreshToken', result.data.refreshToken)
          localStorage.setItem('accessTokenExp', result.data.accessTokenExp)
        })
      let newAccessToken = localStorage.getItem('accessToken')
      const res = await fetch(IP_ADDRESS + url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${newAccessToken}`
        },
        body: JSON.stringify(data)
      })
      return res.json()
    } else {
      let accessToken = localStorage.getItem('accessToken')
      const res = await fetch(IP_ADDRESS + url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(data)
      })
      console.log(res)
      return res.json()
    }
  }

  //보내는 데이터가 인가코드일 경우 (로그인만 해당)
  /*
  토큰 없이 전달 가능
  토큰 전달 받으면 스토리지에 저장 
   */

  //보내는 데이커가 인가코드가 아닐 경우(로그인 외 모든 경우)
  /* 
  일단 토큰이 만료 되었는지 체크하고 만료 되었으면 리프레시 토큰을 이용해 새로운 토큰 값 받아와서 헤더에 담기
  헤더에 bear, type 등등 필요한 거 담기
  요청에 따른 데이터 담아서 보내기
  
  */
}
