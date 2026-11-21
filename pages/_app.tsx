import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { Fraunces, Rubik } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Analytics } from '@vercel/analytics/react'

import '@/styles/globals.css'

const Cursor = dynamic(() => import('@/components/Cursor'), { ssr: false })

const body = Rubik({ subsets: ['latin'], variable: '--font-body', display: 'swap' })
const display = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <div className={`${body.variable} ${display.variable} font-sans`}>
        <Cursor />
        <Component {...pageProps} />
        <Analytics />
      </div>
    </ThemeProvider>
  )
}
