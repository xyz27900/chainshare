import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { MetamaskStateProvider } from 'use-metamask';
import { App } from '@/App';
import { DAppProvider } from '@/providers/dapp';
import { NotificationsProvider } from '@/providers/notifications';
import { store } from '@/store';
import '@/styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MetamaskStateProvider>
        <DAppProvider>
          <NotificationsProvider limit={1}>
            <HashRouter>
              <App />
            </HashRouter>
          </NotificationsProvider>
        </DAppProvider>
      </MetamaskStateProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
