import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (err) {
        console.warn("⚠️ Invalid user in localStorage:", err);
        setUser(null);
        setIsLoggedIn(false);
      }
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
  }, [location.pathname]); // Re-run on route change

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/');
  };

  const isActive = (path) => location.pathname.startsWith(path);
  const username = user?.name || user?.email?.split("@")[0] || "";

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Feed", path: "/feed" },
    { name: "Messages", path: "/messages" },
    { name: "Sessions", path: "/sessions" },
  ];

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-600">
        <Link to="/">SkillSwap</Link>
      </div>

      <div className="space-x-4 flex items-center">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`text-sm font-medium ${
              isActive(item.path) ? 'text-blue-600' : 'text-gray-700'
            } hover:text-blue-500`}
          >
            {item.name}
          </Link>
        ))}

        {!isLoggedIn ? (
          <>
            <Link to="/login?mode=signin" className="ml-4 text-sm text-blue-600 hover:underline">
              Sign In
            </Link>
            <Link to="/login?mode=signup" className="ml-2 text-sm text-blue-600 hover:underline">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <span className="text-sm text-gray-500 hidden sm:inline">Hi, {username}</span>
            <button
              onClick={handleLogout}
              className="ml-4 text-sm text-red-500 hover:underline"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
