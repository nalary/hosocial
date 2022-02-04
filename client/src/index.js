import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/authContext/AuthContext';
import { SocketContextProvider } from './context/socketContext/SocketContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SocketContextProvider>
        <App />       
      </SocketContextProvider>  
    </AuthContextProvider> 
  </React.StrictMode>,
  document.getElementById('root')
);
