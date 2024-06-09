import { Flowbite } from 'flowbite-react'
import localFont from 'next/font/local'

import customTheme from '@/theme/customTheme'
import './globals.css'
import RecoilContextProvider from './recoilContextProvider'

export const pretendard = localFont({
  src: [
    {
      path: '../../public/font/Pretendard-Regular.otf',
      weight: '400'
    },
    {
      path: '../../public/font/Pretendard-Medium.otf',
      weight: '500'
    },
    {
      path: '../../public/font/Pretendard-SemiBold.otf',
      weight: '600'
    },
    {
      path: '../../public/font/Pretendard-Bold.otf',
      weight: '700'
    },
    {
      path: '../../public/font/Pretendard-ExtraBold.otf',
      weight: '800'
    }
  ],
  variable: '--font-pretendard'
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${pretendard.variable}`}>
      {/* 처음 화면에 보이는 크기로만 가져가는것이 아닌 안에 내용물이 채워지는 값을 가져가기 위해 크기값을 설정하지 않음 */}
      <body id="root" className={`${pretendard.className} font-pretendard bg-gray-50 w-screen`}>
        <RecoilContextProvider>
          <Flowbite theme={{ theme: customTheme }}>{children}</Flowbite>
        </RecoilContextProvider>
      </body>
    </html>
  )
}
