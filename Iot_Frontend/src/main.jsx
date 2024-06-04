import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Homepage from "./Pages/Homepage.jsx"
import Detail from './Pages/Detail.jsx';

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
    element: <Homepage/>,
  },
  {
    path: "/detail/:Building",
    element: <Detail />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
