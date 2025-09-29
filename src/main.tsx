
import { createRoot } from 'react-dom/client'
import { PersistGate } from "redux-persist/integration/react";
import App from './App.tsx'
import { Provider } from 'react-redux'
import { persistor, store } from './Store/StoreConfig.ts'
import { SidebarProvider } from './Context/SidebarContext.tsx';
import { BrowserRouter } from 'react-router-dom';
// import { HelmetProvider } from 'react-helmet-async';
import { HelmetProvider } from "@dr.pogodin/react-helmet";

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HelmetProvider>
      <SidebarProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SidebarProvider>
      </HelmetProvider>
    </PersistGate>
  </Provider>,
)
