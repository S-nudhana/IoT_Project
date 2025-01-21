import { Box, Typography } from '@mui/material';
import HeaderPic from '/assets/image/Header.png';

function Header() {
  return (
    <Box sx={{ position: 'relative', mt: "50px" }}>
      <Box
        component="img"
        src={HeaderPic}
        alt="Header Image"
        sx={{
          width: '100%',
          height: { xs: '350px', sm: '400px', md: '450px', lg: '500px' },
          objectFit: 'cover',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(0.39deg, #FFFFFF 6.62%, rgba(214, 214, 214, 0.5) 43.62%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 2,
          p: { xs: "15% 5%", sm: "14% 5%", md: "12% 5%", lg: "10% 7%" },
        }}
      >
        <Typography sx={{ fontWeight: "700", fontSize: ['1.5rem', '1.7rem', '2rem', '2.7rem'] }}>
          Air Quality (AQI), SIT@KMUTT
        </Typography>
        <Typography sx={{ fontSize: ['0.8rem', '0.8rem', '1rem', '1.2rem'] }}>
          Stay informed about air quality conditions.
        </Typography>
      </Box>
    </Box>
  );
}

export default Header;
