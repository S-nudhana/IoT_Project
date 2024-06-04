import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

import nodata from "../assets/NoData.jpg"
import good from '../assets/01-good.png';
import moderate from '../assets/02-moderate.png';
import unhealthyForSensitiveGroup from '../assets/03-unhealthy-for-sensitive.png';
import unhealthy from '../assets/04-unhealthy.png';
import veryUnhealthy from '../assets/05-very-unhealthy.png';
import hazardous from '../assets/06-hazardous.png';

export const allCards = [
    {
        buildingRoom: "SIT CommonLab 1, 2",
        building: "SIT",
        key: "Mi-CommonLab1-1_FL1",
        chart: <iframe src="https://pm25.sit.kmutt.ac.th/d-solo/wZjkjfa4k/pm2-5_with_esp32?orgId=1&theme=light&panelId=5" className='w-[90%] h-[440px] xl:h-[600px]'></iframe>,
    },
    {
        buildingRoom: "SIT Learning Space",
        building: "SIT",
        key: "Mi-LearningSpace01_FL2",
        chart: <iframe src="https://pm25.sit.kmutt.ac.th/d-solo/wZjkjfa4k/pm2-5_with_esp32?orgId=1&theme=light&panelId=40" className='w-[90%] h-[440px] xl:h-[600px]'></iframe>,
    },
    {
        buildingRoom: "SIT Floor 3",
        building: "SIT",
        key: "CenterHall3_Xiaomi_4_Pro_2",
        chart: <iframe src="https://pm25.sit.kmutt.ac.th/d-solo/wZjkjfa4k/pm2-5_with_esp32?orgId=1&theme=light&panelId=14" className='w-[90%] h-[440px] xl:h-[600px]'></iframe>,
    },
    {
        buildingRoom: "SIT Infra & Software Room",
        building: "SIT",
        key: "Infra_mi4pro-1",
        chart: <iframe src="https://pm25.sit.kmutt.ac.th/d-solo/wZjkjfa4k/pm2-5_with_esp32?orgId=1&theme=light&panelId=17" className='w-[90%] h-[440px] xl:h-[600px]'></iframe>,
    },
    {
        buildingRoom: "CB 2303",
        building: "CB2",
        key: "CB2303",
        chart: <iframe src="https://pm25.sit.kmutt.ac.th/d-solo/wZjkjfa4k/pm2-5_with_esp32?orgId=1&theme=light&panelId=57" className='w-[90%] h-[440px] xl:h-[600px]'></iframe>,
    },
    {
        buildingRoom: "CB 2304",
        building: "CB2",
        key: "CB2304",
        chart: <iframe src="https://pm25.sit.kmutt.ac.th/d-solo/wZjkjfa4k/pm2-5_with_esp32?orgId=1&theme=light&panelId=60" className='w-[90%] h-[440px] xl:h-[600px]'></iframe>,
    },
    {
        buildingRoom: "CB 2305",
        building: "CB2",
        key: "CB2305",
        chart: <iframe src="https://pm25.sit.kmutt.ac.th/d-solo/wZjkjfa4k/pm2-5_with_esp32?orgId=1&theme=light&panelId=61" className='w-[90%] h-[440px] xl:h-[600px]'></iframe>,
    },
    {
        buildingRoom: "CB 2306",
        building: "CB2",
        key: "CB2306-1",
        chart: <iframe src="https://pm25.sit.kmutt.ac.th/d-solo/wZjkjfa4k/pm2-5_with_esp32?orgId=1&theme=light&panelId=63" className='w-[90%] h-[440px] xl:h-[600px]'></iframe>,
    },
    {
        buildingRoom: "CB 2308",
        building: "CB2",
        key: "CB2308-1",
        chart: <iframe src="https://pm25.sit.kmutt.ac.th/d-solo/wZjkjfa4k/pm2-5_with_esp32?orgId=1&theme=light&panelId=12" className='w-[90%] h-[440px] xl:h-[600px]'></iframe>,
    },
    {
        buildingRoom: "CB 2310",
        building: "CB2",
        key: "CB2310",
        chart: <iframe src="https://pm25.sit.kmutt.ac.th/d-solo/wZjkjfa4k/pm2-5_with_esp32?orgId=1&theme=light&panelId=69" className='w-[90%] h-[440px] xl:h-[600px]'></iframe>,
    },
    {
        buildingRoom: "Lx-10/1",
        building: "Lx",
        key: "null",
        chart: <iframe src="https://pm25.sit.kmutt.ac.th/d-solo/wZjkjfa4k/pm2-5_with_esp32?orgId=1&theme=light&panelId=10" className='w-[90%] h-[440px] xl:h-[600px]'></iframe>,
    },
    {
        buildingRoom: "Lx-11/1",
        building: "Lx",
        key: "null",
        chart: <iframe src="https://pm25.sit.kmutt.ac.th/d-solo/wZjkjfa4k/pm2-5_with_esp32?orgId=1&theme=light&panelId=19" className='w-[90%] h-[440px] xl:h-[600px]'></iframe>,
    },
    {
        buildingRoom: "Lx-12/1",
        building: "Lx",
        key: "null",
        chart: <iframe src="https://pm25.sit.kmutt.ac.th/d-solo/wZjkjfa4k/pm2-5_with_esp32?orgId=1&theme=light&panelId=21" className='w-[90%] h-[440px] xl:h-[600px]'></iframe>,
    },
    {
        buildingRoom: "Lx-13/2",
        building: "Lx",
        key: "null",
        chart: <iframe src="https://pm25.sit.kmutt.ac.th/d-solo/wZjkjfa4k/pm2-5_with_esp32?orgId=1&theme=light&panelId=22" className='w-[90%] h-[440px] xl:h-[600px]'></iframe>,
    }
];

export default function PmDisplay() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [pmData, setPmData] = useState({});

    const fetchData = useCallback(async (key) => {
        try {
            const response = await axios.get(
                `http://localhost:3000/pm/getPm?id=${key}`
            );
            setPmData(prevData => ({ ...prevData, [key]: response.data.data }));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    useEffect(() => {
        allCards.forEach((card) => {
            fetchData(card.key);
        });
    }, [fetchData]);

    const handleCategoryClick = (category) => {
        setSelectedCategory((prevCategory) =>
            prevCategory === category ? null : category
        );
    };

    const buildingStyle = (building) => {
        switch (building) {
            case 'SIT':
                return '#ecbd4d';
            case 'CB2':
                return '#498bb9';
            case 'Lx':
                return '#DF5935';
            default:
                return '';
        }
    };

    const check = (pm) => {
        if(pm == null || pm == 0){
            return nodata
        }else if (pm >= 301) {
            return hazardous;
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
    };

    const pm25_aqi = (pm25) => {
        if (pm25 == 0 || pm25 == null) {
            return "No data"
        }
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
        <Box>
            <Box sx={{ padding: { xs: "4% 0 2% 2%", lg: "2% 0 2% 2%" } }}>
                <button onClick={() => handleCategoryClick(null)} className='text-sm mx-[7px] bg-[#406695] rounded-[15px] w-[70px] text-white border-2 border-solid border-transparent duration-300 hover:border-[#406695] hover:bg-white hover:text-[#406695] hover:duration-300 shadow-md'>All</button>
                <button onClick={() => handleCategoryClick('SIT')} className='text-sm mx-[7px] bg-[#ecbd4d] rounded-[15px] w-[70px] text-white border-2 border-solid border-transparent duration-300 hover:border-[#ecbd4d] hover:bg-white hover:text-[#ecbd4d] hover:duration-300 shadow-md'>SIT</button>
                <button onClick={() => handleCategoryClick('CB2')} className='text-sm mx-[7px] bg-[#498bb9] rounded-[15px] w-[70px] text-white border-2 border-solid border-transparent duration-300 hover:border-[#498bb9] hover:bg-white hover:text-[#498bb9] hover:duration-300 shadow-md'>CB2</button>
                <button onClick={() => handleCategoryClick('Lx')} className='text-sm mx-[7px] bg-[#DF5935] rounded-[15px] w-[70px] text-white border-2 border-solid border-transparent duration-300 hover:border-[#DF5935] hover:bg-white hover:text-[#DF5935] hover:duration-300 shadow-md'>Lx</button>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '25px',
                }}
            >
                {allCards
                    .filter((card) =>
                        selectedCategory ? card.building === selectedCategory : true
                    )
                    .map((data, index) => (
                        <Link
                            to={{
                                pathname: `/${data.building}/${encodeURIComponent(data.buildingRoom)}`,
                            }}
                            key={index}
                        >
                            <Box
                                sx={{
                                    width: { xs: '370px', sm: '350px', md: '430px', lg: '450px' },
                                    height: '190px',
                                    background: 'white',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                    borderRadius: '20px',
                                    p: '20px',
                                    alignContent: 'center',
                                    transition: '.3s',
                                    border: '2px solid transparent',
                                    cursor: 'pointer',
                                    ':hover': {
                                        borderColor: '#3f6593',
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                    }}
                                >
                                    <img
                                        src={check(pmData[data.key])}
                                        className="w-[auto] h-[130px] rounded-[13px]"
                                        alt="AQI Level"
                                    />
                                    <Box sx={{ pl: '30px' }}>
                                        <Typography
                                            variant="h3"
                                            sx={{
                                                fontSize: '20px',
                                            }}
                                        >
                                            {data.buildingRoom}
                                        </Typography>
                                        <Typography
                                            variant="h4"
                                            sx={{
                                                width: '60px',
                                                backgroundColor: buildingStyle(data.building),
                                                borderRadius: '12px',
                                                color: 'white',
                                                textAlign: 'center',
                                                fontWeight: 300,
                                                fontSize: '16px',
                                                py: '1px',
                                                my: '7px',
                                            }}
                                        >
                                            {data.building}
                                        </Typography>
                                        <Typography
                                            variant="h1"
                                            sx={{
                                                fontSize: '50px',
                                                fontWeight: 400,
                                                color: 'black',
                                            }}
                                        >
                                            {pm25_aqi(pmData[data.key])}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Link>
                    ))}
            </Box>
        </Box>
    );
}
