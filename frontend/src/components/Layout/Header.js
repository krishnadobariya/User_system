import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/login');
  };

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        {currentUser ? (
          <>
            <button onClick={handleLogout}>Logout</button>
            {currentUser.role === 'admin' && <Link to="/admin">Admin</Link>}
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
