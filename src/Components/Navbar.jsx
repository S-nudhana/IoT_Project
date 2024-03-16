import React from 'react'
import logo from '../assets/SITKMUTT_logo.png'
import { Box } from '@mui/material';

function Navbar() {
  return (
    <Box sx={{
        backgroundColor: "#3f6593",
    }}>
        <a href="https://www.sit.kmutt.ac.th">
            <img src={logo} alt="" className = "lg:w-[310px] md:w-[450px] w-[300px] h-[auto] lg:py-[15px] md:py-[20px] py-[20px]  pl-[60px] cursor-pointer"/>
        </a>
    </Box>
  )
}

export default Navbar