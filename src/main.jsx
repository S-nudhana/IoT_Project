import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import { createTheme, ThemeProvider } from '@mui/system';
import App from './App.jsx'
import SITBuilding from './Routes/SIT_Building.jsx';
import CB2Building from './Routes/CB2Building.jsx';
import LxBuilding from './Routes/LxBuilding.jsx';

// Create a custom MUI theme
const theme = createTheme({
  typography: {
    fontFamily: [
      'Noto Sans Thai', // Specify "Noto Sans Thai" as the default font
      'sans-serif',
    ].join(','),
    // You can also customize other typography options here
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "SIT",
    element: <SITBuilding/>,
  },
  {
    path: "CB2",
    element: <CB2Building/>,
  },
  {
    path: "Lx",
    element: <LxBuilding/>,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
      {/* <App /> */}
    </ThemeProvider>
  </React.StrictMode>,
)
