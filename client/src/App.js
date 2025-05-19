import './App.css';
import { BrowserRouter as Router, Routes, Route,Navigate  } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from './components/HomePage/homePage.jsx';
import Register from './components/userLoginSignup/signup.jsx';
import UserSignIn from './components/userLoginSignup/login.jsx';
import Navbar from './components/Navbar/Navbar.jsx';

function App() {
  const user=useSelector((state)=>state.auth.user)
  return (
    <div className="App">
      <Router>
       { user && <Navbar /> }
        <Routes>
          <Route path="/register" element={user? <Navigate to="/" />:<Register />} />
          <Route path="/" element={user ?<HomePage /> :<UserSignIn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
