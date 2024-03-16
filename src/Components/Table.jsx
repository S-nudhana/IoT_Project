import React from 'react'
import { Typography, Box } from '@mui/material'
import table from '../assets/pm.png'

function Table() {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Typography variant='h2' sx={{
                textDecoration: 'underline',
                textUnderlineOffset: "3px",
                fontSize: "24px",
                pt: '20px'
            }}>
                Air Quality Index (AQI) Overview
            </Typography>
            <img src={table} alt="" className='w-[100%] max-w-[1100px] pb-[20px]'/>
        </Box>
    )
}

export default Table