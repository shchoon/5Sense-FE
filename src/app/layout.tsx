import type { Metadata } from 'next'
import './globals.css'
import RecoilContextProvider from './recoilContextProvider'
import localFont from 'next/font/local'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

const myFont = localFont({ src: '../../public/font/PretendardVariable.ttf' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* 처음 화면에 보이는 크기로만 가져가는것이 아닌 안에 내용물이 채워지는 값을 가져가기 위해 크기값을 설정하지 않음 */}
      <body id="root" className={`${myFont.className} bg-gray-50`}>
        <RecoilContextProvider>{children}</RecoilContextProvider>
      </body>
    </html>
  )
}
