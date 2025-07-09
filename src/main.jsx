// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import configureAppStore from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import App from './App.jsx'

const initialState = {};
const store = configureAppStore(initialState);
const persistor = persistStore(store);
createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HelmetProvider>
          <BrowserRouter>
            <Suspense>
              <App />
            </Suspense>
          </BrowserRouter>
        </HelmetProvider>
      </PersistGate>
    </Provider>
  // </StrictMode>,
)
