import '@fontsource/raleway/400.css';
import '@fontsource/open-sans/700.css';

import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

import theme from './theme';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Subscribe from './pages/Subscribe';
import Landing from './pages/Landing';
import About from './pages/About';
import Explore from './pages/Explore';
import Link from './pages/Link';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='dashboard' element={<App />} />
          <Route path='about' element={<About />} />
          <Route path='explore' element={<Explore />} />
          <Route path='subscribe' element={<Subscribe />} />
          <Route path='link' element={<Link />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </ChakraProvider>
);
