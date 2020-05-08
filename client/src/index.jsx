import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import App from './App';
import resetPage from './actions/resetPage';

const Index = () => {
  useEffect(() => {    
    store.dispatch(resetPage());
  });

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
