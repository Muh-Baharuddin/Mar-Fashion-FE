import Head from 'next/head'
import { useRouter } from 'next/router'
import { PropsWithChildren, useContext, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import MarFashionProvider from 'src/context/MarFashionProvider'

export default function BaseLayout({ children }: PropsWithChildren) {
  const router = useRouter()
  const [cookies] = useCookies(['user'])

  useEffect(() => {
    if (cookies.user === undefined) {
      router.push('/login', undefined, { shallow: true })
    }
    if (cookies.user !== undefined) {
      router.push('/dashboard', undefined, { shallow: true })
    }
  }, [])

  return (
    <>
      <Head>
        <title>Mar Fashion Web</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MarFashionProvider>{children}</MarFashionProvider>
    </>
  )
}
