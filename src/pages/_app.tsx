import '@styles/globals.scss'
import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { SSRProvider } from 'react-bootstrap'
import MarFashionProvider from 'src/context/MarFashionProvider'
import { CookiesProvider } from "react-cookie";
import { BaseLayout } from '@layouts/BaseLayout'

config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <CookiesProvider>
      <BaseLayout>
        <SSRProvider>
          <Component {...pageProps} />
        </SSRProvider>
      </BaseLayout>
    </CookiesProvider>
    
  )
}

export default MyApp
