import '../styles/mystyles.css';
import Layout from '../components/layout';

import App, { AppContext, AppInitialProps, AppProps } from 'next/app'
 
type AppOwnProps = { example: string }
 
export default function MyApp({
  Component,
  pageProps,
  example,
}: AppProps & AppOwnProps) {
  return (
    <>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </>
  )
}
 
