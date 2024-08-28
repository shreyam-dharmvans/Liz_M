import './App.css'
import { Header } from './components/Header'
import { Routes, Route } from "react-router-dom";
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { VideoPage } from './pages/VideoPage';
import { useState } from 'react';
import { Upload } from './pages/Upload';


function App() {
  let [user, setUser] = useState({});

  return (
    <>
      <Header />
      <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route path='/' element={<LoginPage setUser={setUser} />} />
        <Route path='/signup' element={<SignupPage setUser={setUser} />} />
        <Route path='/video' element={<VideoPage user={user} setUser={setUser} />} />
        <Route path='/upload' element={<Upload />} />
      </Routes>
    </>
  )
}

export default App
