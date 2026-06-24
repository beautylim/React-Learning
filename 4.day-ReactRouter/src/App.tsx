import { RouterProvider } from 'react-router-dom'
import { BookkeepingRouter } from './Router/5.bookkeeping'
import './theme.css'
import { Provider } from 'react-redux'
import store from './store'
function App() {

  return (
    <Provider store={store}>
      <RouterProvider router={BookkeepingRouter} />
    </Provider>
  )
}

export default App
