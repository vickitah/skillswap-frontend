// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Feed from './pages/Feed';
import Login from './pages/Login';
import Messages from './pages/Messages';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import SessionsPage from './pages/SessionsPage';
import ProfilePage from './pages/ProfilePage'; // ✅ Import this

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
        <Route path="/sessions" element={<SessionsPage />} />
        <Route path="/profile/:username" element={<ProfilePage />} /> {/* ✅ Add this */}
      </Routes>
    </>
  );
}

export default App;
