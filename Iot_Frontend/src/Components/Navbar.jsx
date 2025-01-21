import { Link } from "react-router-dom"
import logo from '/assets/image/SITKMUTT_logo.png'
import { Box, AppBar, Slide, useScrollTrigger } from '@mui/material';

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Navbar() {
  return (
    <HideOnScroll>
      <AppBar sx={{
        width: 'full',
        backgroundColor: '#3F6593'
      }}>
        <Box sx={{
          width: '100%',
          margin: '0 auto',
          px: { xs: 5, lg: 8 },
          py: 2.5,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}>
          <Link to="https://www.sit.kmutt.ac.th">
            <img src={logo} alt="" className="h-auto w-[200px]" />
          </Link>
        </Box>
      </AppBar>
    </HideOnScroll>
  )
}
