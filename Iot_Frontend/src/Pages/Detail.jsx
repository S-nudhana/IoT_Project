import React, { useState, useEffect, useCallback } from 'react';
import { BsChevronLeft } from "react-icons/bs";
import { Typography, Box } from '@mui/material'
import { Link, useParams, ScrollRestoration } from 'react-router-dom';
import axios from 'axios';

import { allCards } from '../Components/pmDisplay';
import { check_Picture, check_AQI_Catagory, pm25_aqi } from '../utils/Calculation';
import Navbar from '../Components/Navbar';
import Table from '../Components/Table'
import Footer from '../Components/Footer';

export default function Detail() {
    const { Building } = useParams();
    const [pmData, setPmData] = useState();
    const fetchData = useCallback(async (key) => {
        try {
            const response = await axios.get(
                `http://localhost:3000/pm/getPm?id=${key}`
            );
            setPmData(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    useEffect(() => {
        fetchData(selectedCard.key);
    }, [fetchData]);

    const selectedCard = allCards.find(card => card.buildingRoom === Building);

    return (
        <>
            <ScrollRestoration />
            <Navbar />
            <Box sx={{
                pt: '90px'
            }}>
                <Link to="/" className="flex mt-[20px] ml-[25px] mb-[10px] md:ml-[55px] w-[60px]">
                    <BsChevronLeft className='mt-[3px] stroke-1' />
                    <Typography sx={{
                        ":hover": {
                            textDecoration: 'underline',
                            textUnderlineOffset: '3px'
                        }
                    }}>
                        Back
                    </Typography>
                </Link>
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: "column", md: "row", lg: "row" },
                    px: { xs: "0px", md: "20px", lg: "40px" },
                    gap: { xs: "0px", md: "20px", lg: "30px" },
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: { xs: "85%", md: "45%", lg: '50%' },
                        maxWidth: "1200px",
                        height: { xs: "auto", md: "500px", lg: "570px", xl: "700px" },
                        mb: "50px",
                        py: "30px",
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        borderRadius: '20px'
                    }}>
                        <Typography sx={{
                            fontSize: { xs: "25px", md: '30px' },
                            fontWeight: '500'
                        }}>
                            {Building}
                        </Typography>
                        <Typography sx={{
                            fontSize: '20px'
                        }}>
                            {selectedCard.building} Building
                        </Typography>
                        <Box sx={{
                            width: "46%",
                        }}>
                            <img src={check_Picture(pm25_aqi(pmData))} alt="" className='p-[12px] rounded-[100%]' />
                        </Box>
                        <Typography sx={{
                            fontSize: "50px",
                            fontWeight: 500
                        }}>
                            {pm25_aqi(pmData)}<span className="pl-[10px] text-[20px] font-normal text-[#919191]"> AQI</span>
                        </Typography>
                        <Typography sx={{
                            fontSize: "20px"
                        }}>
                            {check_AQI_Catagory(pm25_aqi(pmData))}
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: { xs: "85%", md: "45%", lg: '50%' },
                        maxWidth: "1200px",
                        height: { xs: "auto", md: "500px", lg: "570px", xl: "700px" },
                        hight: '100%',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        borderRadius: '20px',
                        mb: "50px",
                        py: "30px",
                    }}>
                        <Typography sx={{
                            fontSize: "25px",
                            pt: "5px",
                            pb: "20px",
                            fontWeight: '500'
                        }}>
                            History (μg/m³)
                        </Typography>
                        {selectedCard.chart}
                    </Box>
                </Box>
            </Box>
            <Table />
            <Footer />
        </>
    );
}