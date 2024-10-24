import { UserCircle, LogOut, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const Navbar = () => {
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              Teacher Management
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className="text-gray-600 hover:text-gray-900"
              >
                <Settings className="h-5 w-5" />
              </Link>
            )}
            
            <Link
              to="/profile"
              className="text-gray-600 hover:text-gray-900"
            >
              <UserCircle className="h-5 w-5" />
            </Link>
            
            <button
              onClick={logout}
              className="text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};