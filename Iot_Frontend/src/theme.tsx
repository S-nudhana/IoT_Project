import { createTheme } from '@mui/material/styles';
import { GlobalStyles } from '@mui/material';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xxl: true;
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: ['Inter', 'Noto Sans Thai', 'sans-serif'].join(','),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1500,
      xxl: 1800,
    },
  },
});


export const globalStyles = (
  <GlobalStyles
    styles={{
      "::-moz-selection": {
        background: "#336699",
        color: "#ffffff",
      },
      "::selection": {
        background: "#336699",
        color: "#ffffff",
      },
    }}
  />
);