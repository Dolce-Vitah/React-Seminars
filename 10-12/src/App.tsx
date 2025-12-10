import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import UserManager from './components/UserManager';
import AxiosDemo from './components/AxiosDemo';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>React + TS + RTK Query + Axios App</h1>
        
        <UserManager />
        
        <AxiosDemo />
      </div>
    </Provider>
  );
};

export default App;