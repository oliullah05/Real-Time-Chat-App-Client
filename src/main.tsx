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
import AuthGate from './routes/AuthGate';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
  <AuthGate> <RouterProvider router={router} /></AuthGate>
    <Toaster />
    </Provider>
  </React.StrictMode>,
)
