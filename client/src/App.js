import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
import Settings from "./pages/settings/Settings";

function App() {
  const { user } = useContext(AuthContext);
  return (
    // all for router-react-dom v6
    // no use Switch
    // change Redirect to Navigate
    <Router>
      <Routes>
          <Route path="/" element={ user ? <Home /> : <Login /> }/>
          <Route path="/login" element={ user ? <Navigate replace to="/" /> : <Login /> }/>
          <Route path="/register" element={ user ? <Navigate replace to="/" /> : <Register /> }/>
          <Route path="/messenger" element={ !user ? <Navigate replace to="/" /> : <Messenger /> }/>             
          <Route path="/profile/:username" element={ <Profile /> } />
          <Route path="/settings" element={user ? <Settings /> : <Login /> } />
        </Routes>
    </Router>    
  );
}

export default App;
