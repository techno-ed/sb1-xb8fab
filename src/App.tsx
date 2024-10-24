import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { Admin } from './pages/Admin';
import { Profile } from './pages/Profile';
import { AuthGuard } from './components/AuthGuard';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <AuthGuard>
                <>
                  <Navbar />
                  <Home />
                </>
              </AuthGuard>
            }
          />
          <Route
            path="/admin"
            element={
              <AuthGuard requireAdmin>
                <>
                  <Navbar />
                  <Admin />
                </>
              </AuthGuard>
            }
          />
          <Route
            path="/profile"
            element={
              <AuthGuard>
                <>
                  <Navbar />
                  <Profile />
                </>
              </AuthGuard>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;