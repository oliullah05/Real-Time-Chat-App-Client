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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthPersist>
        <RouterProvider router={router} />
      </AuthPersist>
      <Toaster />
    </Provider>
  </React.StrictMode>,
)
