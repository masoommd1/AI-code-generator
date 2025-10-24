import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import NoPage from './Pages/NoPage';

const App = () => {
  return (
    <>
    <BrowserRouter>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="*" element={<NoPage/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App