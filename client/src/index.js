import React from 'react'; // import libraries
import ReactDOM from 'react-dom/client'; // library
import './index.css'; // import the file
import App from './App';
import authReducer from "./state"; // import the file
import { configureStore } from '@reduxjs/toolkit'; // import library
import { Provider } from 'react-redux'; // library
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist"; // library
import storage from 'redux-persist/lib/storage'; // library for storing the data local state storage
import { PersistGate } from 'redux-persist/integration/react'; // library
// session storage is an alternative if you want to save the data for a particular session but lost when tab is closed

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
}); // info from reduxjs/toolkit, redux-persist

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* for local sate data */}
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        {/* main app */}
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

