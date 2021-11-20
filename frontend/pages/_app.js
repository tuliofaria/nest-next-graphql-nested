import { createClient, Provider } from 'urql'
import 'tailwindcss/tailwind.css'
import Header from '../components/Header'

const client = createClient({
  url: 'http://localhost:3000/graphql',
  requestPolicy: 'network-only'
})

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <>
        <Header />
        <Component {...pageProps} />
      </>
    </Provider>
  )
}
