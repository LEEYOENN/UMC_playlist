import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Cart from './components/Cart';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Navbar />
        <Routes>
          <Route path="/" element={<Cart />} />
        </Routes>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;