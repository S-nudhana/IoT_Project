; import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Box } from '@mui/material';
import { Link, ScrollRestoration } from 'react-router-dom';
import axios from 'axios';

import { check_Picture, pm25_aqi } from './Calculation';

export default function PmDisplay() {
    const [pmData, setPmData] = useState({});
    const fetchData = useCallback(async (keys) => {
        try {
            const keyString = Array.isArray(keys) ? keys.join(",") : keys;
            const response = await axios.get(
                `http://localhost:3000/pm/getPm?id=${keyString}`
            );
            setPmData((prevData) => ({
                ...prevData,
                [keyString]: response.data.data,
            }));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, []);

    useEffect(() => {
        allCards.forEach((card) => {
            const keys = Array.isArray(card.key) ? card.key : [card.key];
            fetchData(keys);
        });
    }, [fetchData]);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const handleCategoryClick = (category) => {
        setSelectedCategory((prevCategory) =>
            prevCategory === category ? null : category
        );
    };

    const category = () => {
        if (selectedCategory === null) return "All Building";
        return `${selectedCategory} Building`;
    };

    const buildingStyle = (building) => {
        switch (building) {
            case "SIT":
                return "#ecbd4d";
            case "CB2":
                return "#498bb9";
            case "Lx":
                return "#DF5935";
            default:
                return "";
        }
    };

    return (
        <Box>
            <ScrollRestoration />
            <Box
                sx={{
                    padding: { xs: "2% 2% 2% 5%", lg: "2% 4% 2% 4%" },
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                }}
            >
                <Typography
                    sx={{
                        color: "#406695",
                        fontSize: { xs: "20px", lg: "22px" },
                        textDecoration: "underline",
                        textUnderlineOffset: "2px",
                        fontWeight: 800,
                    }}
                >
                    {category()}
                </Typography>
                <Box sx={{ py: { xs: "10px", sm: "0" } }}>
                    <button onClick={() => handleCategoryClick(null)} className="text-sm mx-[7px] py-[3px] bg-[#6BAB6E] rounded-[15px] w-[70px] text-white duration-300 hover:bg-[#558858] hover:duration-300 shadow-md"> All </button>
                    <button onClick={() => handleCategoryClick("SIT")} className="text-sm mx-[7px] py-[3px] bg-[#ecbd4d] rounded-[15px] w-[70px] text-white duration-300 hover:bg-[#BC973D] hover:duration-300 shadow-md"> SIT </button>
                    <button onClick={() => handleCategoryClick("CB2")} className="text-sm mx-[7px] py-[3px] bg-[#498bb9] rounded-[15px] w-[70px] text-white duration-300 hover:bg-[#3A6F94] hover:duration-300 shadow-md"> CB2 </button>
                    <button onClick={() => handleCategoryClick("Lx")} className="text-sm mx-[7px] py-[3px] bg-[#DF5935] rounded-[15px] w-[70px] text-white duration-300 hover:bg-[#B2472A] hover:duration-300 shadow-md"> Lx </button>
                </Box>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "25px",
                }}
            >
                {allCards
                    .filter((card) =>
                        selectedCategory ? card.building === selectedCategory : true
                    )
                    .map((data, index) => {
                        const keyString = Array.isArray(data.key)
                            ? data.key.join(",")
                            : data.key;
                        return (
                            <Link
                                to={`/detail/${encodeURIComponent(data.buildingRoom)}`}
                                key={index}
                            >
                                <Box
                                    sx={{
                                        width: {
                                            xs: "370px",
                                            sm: "350px",
                                            md: "430px",
                                            lg: "450px",
                                        },
                                        height: "auto",
                                        background: "white",
                                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                        borderRadius: "20px",
                                        p: "20px",
                                        alignContent: "center",
                                        transition: ".3s",
                                        border: "2px solid transparent",
                                        cursor: "pointer",
                                        ":hover": { borderColor: "#3f6593" },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "flex-start",
                                        }}
                                    >
                                        <img
                                            src={check_Picture(pmData[keyString])}
                                            className="w-[auto] h-[130px] rounded-[13px]"
                                            alt="AQI Level"
                                        />
                                        <Box sx={{ pl: "30px", alignContent: "center" }}>
                                            <Typography variant="h3" sx={{ fontSize: "20px" }}>
                                                {data.buildingRoom}
                                            </Typography>
                                            <Typography
                                                variant="h4"
                                                sx={{
                                                    width: "60px",
                                                    backgroundColor: buildingStyle(data.building),
                                                    borderRadius: "12px",
                                                    color: "white",
                                                    textAlign: "center",
                                                    fontWeight: 300,
                                                    fontSize: "16px",
                                                    py: "1px",
                                                    my: "7px",
                                                }}
                                            >
                                                {data.building}
                                            </Typography>
                                            <Typography
                                                variant="h1"
                                                sx={{
                                                    fontSize: { xs: "38px", lg: "50px" },
                                                    fontWeight: 400,
                                                    color: "black",
                                                }}
                                            >
                                                {pm25_aqi(pmData[keyString])}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Link>
                        );
                    })}
            </Box>
        </Box>
    );
}

export const allCards = [
    {
        buildingRoom: "SIT common Lab 1, 2",
        building: "SIT",
        key: ["Mi-CommonLab1-1_FL1", "Mi-CommonLab2-1_FL1"],
        chart: <iframe src="https://pm25.sit.kmutt.ac.th/d-solo/wZjkjfa4k/pm2-5_with_esp32?orgId=1&theme=light&panelId=49" className='w-[90%] h-[440px] xl:h-[600px]'></iframe>,
    },
    {
        buildingRoom: "SIT Learning Space",
        building: "SIT",
        key: ["Mi-LearningSpace01_FL2"],
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
    // {
    //     buildingRoom: "Lx-10/1",
    //     building: "Lx",
    //     key: "null",
    //     chart: <iframe src="https://pm25.sit.kmutt.ac.th/d-solo/wZjkjfa4k/pm2-5_with_esp32?orgId=1&theme=light&panelId=10" className='w-[90%] h-[440px] xl:h-[600px]'></iframe>,
    // },
    // {
    //     buildingRoom: "Lx-11/1",
    //     building: "Lx",
    //     key: "null",
    //     chart: <iframe src="https://pm25.sit.kmutt.ac.th/d-solo/wZjkjfa4k/pm2-5_with_esp32?orgId=1&theme=light&panelId=19" className='w-[90%] h-[440px] xl:h-[600px]'></iframe>,
    // },
    // {
    //     buildingRoom: "Lx-12/1",
    //     building: "Lx",
    //     key: "null",
    //     chart: <iframe src="https://pm25.sit.kmutt.ac.th/d-solo/wZjkjfa4k/pm2-5_with_esp32?orgId=1&theme=light&panelId=21" className='w-[90%] h-[440px] xl:h-[600px]'></iframe>,
    // },
    // {
    //     buildingRoom: "Lx-13/2",
    //     building: "Lx",
    //     key: "null",
    //     chart: <iframe src="https://pm25.sit.kmutt.ac.th/d-solo/wZjkjfa4k/pm2-5_with_esp32?orgId=1&theme=light&panelId=22" className='w-[90%] h-[440px] xl:h-[600px]'></iframe>,
    // }
];