import { Box, Typography } from '@mui/material';
import HeaderPic from '/image/Header.png';

function Header() {
  return (
    <Box sx={{ position: 'relative', mt: "40px" }}>
      <Box
        component="img"
        src={HeaderPic}
        alt="Header Image"
        sx={{
          width: '100%',
          height: { xs: '330px', sm: '370px', md: '400px', lg: '450px' },
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
          background: 'linear-gradient(0.39deg, #F8F8FA 6.62%, rgba(255, 255, 255, 0.7) 43.62%)',
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
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography 
          sx={{
            color: "#ffffff",
            bgcolor: "#336699",
            borderRadius: "50px",
            textAlign: "center",
            padding: "7px 17px",
            fontSize: "14px",
            width: "fit-content",
            fontWeight: "600",
            letterSpacing: "1px",
          }}
        >
          SIT KMUTT
        </Typography>
        <Typography
          sx={{
            color: "#373E44",
            mt: "10px",
            fontSize: {xs: "38px", sm: "60px", lg: "65px"},
            fontWeight: "600",
            letterSpacing: "1px",
          }}
        >
          <span className="bg-gradient-to-b from-[#4B79AE] to-[#04356C] bg-clip-text text-transparent">
            Air Quality
          </span>{" "}
          Monitor
        </Typography>
        <Typography sx={{
          color: "#7B7B7B",
          mt: "10px",
          fontSize: {xs: "14px", sm: "16px", lg:"18px"},
        }}>
          ติดตามข้อมูลเกี่ยวกับคุณภาพอากาศของ SIT
        </Typography>
      </Box>
    </Box>
  );
}

export default Header;
