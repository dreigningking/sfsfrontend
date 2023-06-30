import { store } from '@/lib/redux/store'
import 'bootstrap/dist/css/bootstrap.css'
import '@/styles/globals.css'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
