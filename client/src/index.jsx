import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { authr } from './actions/auth';
import './index.css';
import App from './App';
import Cookies from 'js-cookie';

const Index = () => {
  useEffect(() => {
    if (Cookies.get('userToken')) {
      store.dispatch(authr());
    }
  }, []);
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </React.StrictMode>
  );
};

ReactDOM.render(
  <Index />,
  document.getElementById('root'),

);
