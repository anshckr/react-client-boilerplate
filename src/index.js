import React from 'react';
import ReactDOM from 'react-dom';

import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';

import './index.scss';

const App = () => {
  return (
    <ErrorBoundary>
      <Layout />
    </ErrorBoundary>
  );
};

export default App;

const wrapper = document.getElementById('root');
wrapper ? ReactDOM.render(<App />, wrapper) : false;
