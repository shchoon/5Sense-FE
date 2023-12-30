const IP_ADDRESS = process.env.NEXT_PUBLIC_IP_ADDRESS
export const fetchApi = async (url: string, method: string, data?: any) => {
  let accessToken = localStorage.getItem('accessToken')
  //console.log('acceccToken', accessToken)
  if (accessToken == null) {
    const res = await fetch(IP_ADDRESS + url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    console.log(res)
    return res.json()
  } else {
    /* accessToken의 유효시간이 얼마 남지 않았으면 refreshToken을 통해 새로운 accessToken을 
        받아와 header에 새로 받아온 acceccToken을 담아 요청 */

    const res = await fetch(IP_ADDRESS + url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authhorization: '<type> <credentials>',
        type: 'Bearer type',
        credentials: `${accessToken}`
      },
      body: JSON.stringify(data)
    })
    console.log(res)
    return res.json()
  }
}
