
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import './globals.css'
import { Providers } from './providers'
import { Box } from '@chakra-ui/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Đồ án quản lí vật tư',
  description: 'Đồ án quản lí vật tư',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Box minHeight={'1080px'}>
          {children}
        </Box>
      </Providers>
    </body>
    </html >
  )
}
