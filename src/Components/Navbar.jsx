import React from 'react'
import { Link } from "react-router-dom"
import logo from '../assets/SITKMUTT_logo.png'
import { Box } from '@mui/material';

function Navbar() {
  return (
    <Box sx={{
      backgroundColor: "#3f6593",
    }}>
      <Link to="https://www.sit.kmutt.ac.th">
        <img src={logo} alt="" className="lg:w-[310px] md:w-[450px] w-[300px] h-[auto] lg:py-[15px] md:py-[20px] py-[20px]  pl-[60px] cursor-pointer" />
      </Link>
    </Box>
  )
}

export default Navbar