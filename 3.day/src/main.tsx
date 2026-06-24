import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from "react-redux"
import store from "./store"
import RestaurantDetail from './component/2.meituan/index.tsx'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RestaurantDetail />
  </Provider>
)
