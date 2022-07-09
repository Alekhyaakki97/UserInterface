import './App.css';
import Nav from './coponents/Nav';
import { Navigate, BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './coponents/pages/Profile';
import Login from './coponents/pages/Login';
import Register from './coponents/pages/Register';
import Home from './coponents/pages/Home';
import { UserProvider } from './context/userContext';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Nav />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="profile" element={<Profile />} />
              <Route path="home" element={<Home />} />
              <Route path="/" element={<Navigate to="/home" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
