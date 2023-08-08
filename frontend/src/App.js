import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import LoginPage from './Components/LoginPages.jsx';
import PageNotFound from './Components/PageNotFound.jsx';
import StartPage from './Components/StartPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Navbar bg="light" expand="lg">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Start page</Nav.Link>
          <Nav.Link as={Link} to="/private">Private page</Nav.Link>
        </Nav>
      </Navbar>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;