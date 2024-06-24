import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
} from "react-router-dom";
import './index.css';
import router from './routes/routes';

import { Provider } from 'react-redux';
import { Toaster } from 'sonner';
import { store } from './redux/store';
import AuthPersist from './routes/AuthPersist';


import TimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en';
import ru from 'javascript-time-ago/locale/ru';
import SocketConnection from './component/socket/SocketConnection';

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)
ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <>
    <Provider store={store}>
      <AuthPersist>
        {/* <SocketConnection></SocketConnection> */}
        <RouterProvider router={router} />
        
      </AuthPersist>
      <Toaster duration={2000}/>
    </Provider>
  </>,
)
