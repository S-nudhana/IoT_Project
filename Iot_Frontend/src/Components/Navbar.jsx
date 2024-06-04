import React from 'react'
import { Link } from "react-router-dom"
import { Box } from '@mui/material';
import logo from '../assets/picture/SITKMUTT_logo.png'

export default function Navbar() {
  return (
    <>
      <Box sx={{
        backgroundColor: "#3f6593",
      }}>
        <Box sx={{
          width: '23%',
        }}>
          <Link to="https://www.sit.kmutt.ac.th">
            <img src={logo} alt="" className="lg:w-[310px] md:w-[450px] w-[300px] h-[auto] lg:py-[15px] md:py-[20px] py-[20px]  pl-[60px]" />
          </Link>
        </Box>
      </Box>
    </>
  )
}