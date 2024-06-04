import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import App from './App.jsx';
import SITBuilding from './Pages/SITBuilding.jsx';
import CB2Building from './Pages/CB2Building.jsx';
import LxBuilding from './Pages/LxBuilding.jsx';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Noto Sans Thai',
      'sans-serif',
    ].join(','),
  },
});


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/SIT/:SIT_Building",
    element: <SITBuilding />,
  },
  {
    path: "/CB2/:CB2_Building",
    element: <CB2Building />,
  },
  {
    path: "/Lx/:Lx_Building",
    element: <LxBuilding />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
