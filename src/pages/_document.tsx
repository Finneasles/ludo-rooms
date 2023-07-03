import { GAnalytics } from '@/components/ga'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <GAnalytics/>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
