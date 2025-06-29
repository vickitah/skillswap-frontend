import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Feed from './pages/Feed';
import Login from './pages/Login';
import Messages from './pages/Messages';
import TestToken from './components/TestToken';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import SessionsPage from './pages/SessionsPage'; // ✅ NEW import

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/sessions" element={<SessionsPage />} /> {/* ✅ NEW route */}
        <Route path="/test" element={<TestToken />} />
      </Routes>
    </>
  );
}

export default App;
