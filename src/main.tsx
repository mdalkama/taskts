import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App/App.tsx'
import { BrowserRouter } from 'react-router'
import store from './App/store';
import { Provider } from 'react-redux';


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
