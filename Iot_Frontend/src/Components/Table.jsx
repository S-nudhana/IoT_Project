import * as React from 'react'
import { Typography, Box} from '@mui/material'
import table from '../assets/picture/pm.png'

export default function Table() {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            pt: "20px"
        }}>
            <Typography  sx={{
                textDecoration: 'underline',
                textUnderlineOffset: "3px",
                fontSize: {xs: "20px", md:"24px", lg:"30px"},
                pt: '20px'
            }}>
                Air Quality Index (AQI) Overview
            </Typography>
            <img src={table} alt="" className='w-[100%] max-w-[1100px] pb-[20px]'/>
        </Box>
    )
}