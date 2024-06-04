import React, {useState,useEffect, useCallback} from 'react';
import { BsChevronLeft } from "react-icons/bs";
import { Typography, Box } from '@mui/material'
import { Link, useParams, ScrollRestoration } from 'react-router-dom';
import axios from 'axios';

import { allCards } from '../Components/pmDisplay';
import Navbar from '../Components/Navbar';
import Table from '../Components/Table'
import Footer from '../Components/Footer';

import nodata from "../assets/NoData.jpg"
import good from "../assets/01-good.png"
import moderate from "../assets/02-moderate.png"
import unhealthyForSensitiveGroup from "../assets/03-unhealthy-for-sensitive.png"
import unhealthy from "../assets/04-unhealthy.png"
import veryUnhealthy from "../assets/05-very-unhealthy.png"
import hazadous from "../assets/06-hazardous.png"

export default function CB2Building() {
    const { CB2_Building } = useParams();
    const[pmData, setPmData] = useState();
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

    const selectedCard = allCards.find(card => card.buildingRoom === CB2_Building);

    const check_Picture = (pm) => {
        if (pm == null || pm == 0) {
            return nodata;
        } else if (pm >= 301) {
            return hazadous;
        } else if (pm >= 201) {
            return veryUnhealthy;
        } else if (pm >= 151) {
            return unhealthy;
        } else if (pm >= 101) {
            return unhealthyForSensitiveGroup;
        } else if (pm >= 51) {
            return moderate;
        } else {
            return good;
        }
    }

    const check_AQI_Catagory = (pm) => {
        if(pm == 0 || pm == null){
            return "No Data";
        }else if (pm >= 301) {
            return "Hazadous";
        } else if (pm >= 201) {
            return "Very Unhealthy";
        } else if (pm >= 151) {
            return "Unhealthy";
        } else if (pm >= 101) {
            return "Unhealthy for sensitive group";
        } else if (pm >= 51) {
            return "Moderate";
        } else {
            return "Good";
        }
    }

    const pm25_aqi = (pm25) => {
        const c = Math.floor(10 * pm25) / 10;
        const a = c < 0 ? 0
            : c < 12.1 ? lerp(0, 50, 0.0, 12.0, c)
                : c < 35.5 ? lerp(51, 100, 12.1, 35.4, c)
                    : c < 55.5 ? lerp(101, 150, 35.5, 55.4, c)
                        : c < 150.5 ? lerp(151, 200, 55.5, 150.4, c)
                            : c < 250.5 ? lerp(201, 300, 150.5, 250.4, c)
                                : c < 350.5 ? lerp(301, 400, 250.5, 350.4, c)
                                    : c < 500.5 ? lerp(401, 500, 350.5, 500.4, c)
                                        : 500;
        return Math.round(a);
    }

    const lerp = (ylo, yhi, xlo, xhi, x) => {
        return ((x - xlo) / (xhi - xlo)) * (yhi - ylo) + ylo;
    }

    return (
        <>
        <ScrollRestoration/>
            <Navbar />
            <Box>
                <Link to="/" className="flex mt-[20px] ml-[25px] mb-[5px] md:ml-[55px] w-[60px]">
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
                            fontSize: { xs: "25px", md: '30px' }
                        }}>
                            Room: {CB2_Building}
                        </Typography>
                        <Typography sx={{
                            fontSize: '20px'
                        }}>
                            CB2 Building
                        </Typography>
                        <Box sx={{
                            width: "46%",
                        }}>
                            <img src={check_Picture(pm25_aqi(pmData))} alt="" className='p-[12px] rounded-[100%]' />
                        </Box>
                        <Typography sx={{
                            fontSize: "70px",
                            fontWeight: 500
                        }}>
                            {pm25_aqi(pmData)}
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
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        borderRadius: '20px',
                        mb: "50px",
                        py: "30px",
                    }}>
                        <Typography sx={{
                            fontSize: "25px",
                            pt: "5px",
                            pb: "20px",
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