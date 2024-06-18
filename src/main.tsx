import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import router from './routes/routes';

import { Provider } from 'react-redux'
import { store } from './redux/store';
import { Toaster } from 'sonner';
import AuthPersist from './routes/AuthPersist';


import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthPersist>
        <RouterProvider router={router} />
      </AuthPersist>
      <Toaster duration={2000}/>
    </Provider>
  </React.StrictMode>,
)
