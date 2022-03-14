import React, {FC} from 'react';
import {hydrate, render} from 'react-dom';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

const Leung: FC = ()=>{
  return <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  </React.StrictMode>;
};

// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById('root')
// );
const rootElement = document.getElementById('root');

if (rootElement?.hasChildNodes()) {
  hydrate(<Leung />, rootElement);
} else {
  render(<Leung />, rootElement);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
