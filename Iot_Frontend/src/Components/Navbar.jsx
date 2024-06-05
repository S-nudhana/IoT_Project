import React from 'react'
import { Link } from "react-router-dom"
import logo from '../assets/picture/SITKMUTT_logo.png'
import { Box } from '@mui/material';

export default function Navbar() {
  return (
    <Box className="fixed top-0 left-0 w-full z-50 bg-[#3F6593] shadow-md "> 
      <Box className="container mx-auto px-4 py-5 flex justify-between items-center"> 
        <Link to="https://www.sit.kmutt.ac.th">
          <img src={logo} alt="" className="h-auto w-[200px]" />
        </Link>

      </Box>
    </Box>
  )
}
