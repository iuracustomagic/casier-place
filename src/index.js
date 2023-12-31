import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { store } from "./redux/index";

import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/js/bootstrap";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <App />
  </Provider>
);


reportWebVitals();
