import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/system';

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


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
