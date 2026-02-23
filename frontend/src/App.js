import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './Components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { UseAuthorizationContext } from './hooks/UseAuthorizationContext';
import Visitors from './pages/Visitors';
import Appointments from './pages/Appointments';
import Pass from './pages/Pass';
import Footer from './Components/Footer';

function App() {

  const {user} = UseAuthorizationContext();

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <main>
        <div className='container'>
          <Routes>
          <Route path='/' element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path='/signup' element={!user ? <Signup /> : <Navigate to="/" />} />
          <Route path='/visitors' element={!user ? <Navigate to="/" /> : <Visitors />} />
          <Route path='/appointments' element={!user ? <Navigate to="/" /> : <Appointments />} />
          <Route path="/pass" element={!user ? <Navigate to="/" /> : <Pass />}></Route>
        </Routes>
        </div>
      </main>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
