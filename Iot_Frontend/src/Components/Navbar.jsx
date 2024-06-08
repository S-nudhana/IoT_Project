import React from 'react'
import { Link } from "react-router-dom"
import logo from '../assets/picture/SITKMUTT_logo.png'
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
        <Box className="container mx-auto px-7 lg:px-8 xl:px-0 py-5 flex justify-start items-cesnter">
          <Link to="https://www.sit.kmutt.ac.th">
            <img src={logo} alt="" className="h-auto w-[200px]" />
          </Link>
        </Box>
      </AppBar>
    </HideOnScroll>
  )
}
