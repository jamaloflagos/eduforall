import { Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import { useAuth } from './hooks/useAuth';
import TutorDashboard from './pages/TutorDashboard';

function App() {
  const { user } = useAuth();
  return (
    <div className="app">
        <Routes>
          <Route path='*' element={user ? <Dashboard /> : <Navigate to='/login' />}/>
          <Route path='/register' element={!user ? <RegisterPage /> : <Navigate to='/' />}/>
          <Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />}/>
          <Route path='/dashboard' element={!user ? <Dashboard /> : <Navigate to='/' />}/>
          <Route path='/tutor/dashboard' element={<TutorDashboard />} />
        </Routes>
    </div>
  );
}

export default App;
