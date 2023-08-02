import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageNotFound, PageStart, PageLogin } from './Components/Pages.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageStart />} />
        <Route path="/login" element={<PageLogin />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;