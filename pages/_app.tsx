import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <header>
    <h1>heelo</h1>
    <Component {...pageProps} />
  </header>
}

export default MyApp
