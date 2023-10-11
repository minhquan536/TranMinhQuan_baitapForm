import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';

// connect redux
import {Provider} from "react-redux"
import {store} from "./redux/config.store"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  //! chỉ cho phép 1 (đối tượng(bject JSX)) như là 1 thẻ HTML
  // <h1>dự án react dn09</h1>  
  // <HeaderRCC></HeaderRCC>
  // <CardProduct></CardProduct> 
  <Provider store={store}>
    <App/>
  </Provider>
  
);