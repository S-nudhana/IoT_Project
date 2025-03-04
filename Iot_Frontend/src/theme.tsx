import { createTheme } from '@mui/material/styles';

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
      },
    },
  });