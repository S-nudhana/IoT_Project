import React, { useState } from 'react'
import { Typography, Box } from '@mui/material';
import unhealthy from "../assets/unhealthygoose.png"
import { Link } from "react-router-dom";

function pmDisplay() {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategoryClick = (category) => {
        setSelectedCategory((prevCategory) => (prevCategory === category ? null : category));
    };

    const allCards = [
        {
            buildingRoom: "SIT Floor 1",
            img: unhealthy,
            building: "SIT",
            Pm: 67,
        },
        {
            buildingRoom: "SIT Floor 2",
            img: unhealthy,
            building: "SIT",
            Pm: 67,
        },
        {
            buildingRoom: "SIT Floor 3",
            img: unhealthy,
            building: "SIT",
            Pm: 67,
        },
        {
            buildingRoom: "SIT Infra & Software Room",
            img: unhealthy,
            building: "SIT",
            Pm: 67,
        },
        {
            buildingRoom: "CB 2308",
            img: unhealthy,
            building: "CB2",
            Pm: 50,
        },
        {
            buildingRoom: "Lx-10/1",
            img: unhealthy,
            building: "Lx",
            Pm: 50,
        },
        {
            buildingRoom: "Lx-11/1",
            img: unhealthy,
            building: "Lx",
            Pm: 40,
        },
        {
            buildingRoom: "Lx-12/1",
            img: unhealthy,
            building: "Lx",
            Pm: 50,
        },
        {
            buildingRoom: "Lx-13/2",
            img: unhealthy,
            building: "Lx",
            Pm: 50,
        }
    ];

    const buildingStyle = (building) => {
        switch(building) {
            case "SIT":
                return "#ecbd4d";
            case "CB2":
                return "#498bb9";
            case "Lx":
                return "#DF5935";
        }
    };

    return (
        <Box>
            <Box sx={{
                padding: "2% 0 2% 2%"
            }}>
                <button onClick={() => handleCategoryClick(null)} className='text-sm mx-[7px] bg-[#406695] rounded-[15px] w-[70px] text-white border-2 border-solid border-transparent hover:border-[#406695] hover:bg-white hover:text-[#406695] hover:duration-300 shadow-md'>All</button>
                <button onClick={() => handleCategoryClick('SIT')} className='text-sm mx-[7px] bg-[#ecbd4d] rounded-[15px] w-[70px] text-white border-2 border-solid border-transparent hover:border-[#ecbd4d] hover:bg-white hover:text-[#ecbd4d] hover:duration-300 shadow-md'>SIT</button>
                <button onClick={() => handleCategoryClick('CB2')} className='text-sm mx-[7px] bg-[#498bb9] rounded-[15px] w-[70px] text-white border-2 border-solid border-transparent hover:border-[#498bb9] hover:bg-white hover:text-[#498bb9] hover:duration-300 shadow-md'>CB2</button>
                <button onClick={() => handleCategoryClick('Lx')} className='text-sm mx-[7px] bg-[#DF5935] rounded-[15px] w-[70px] text-white border-2 border-solid border-transparent hover:border-[#DF5935] hover:bg-white hover:text-[#DF5935] hover:duration-300 shadow-md'>Lx</button>
            </Box>
            <Box sx={{
                display: "flex",
                flexWrap: "wrap",
            }}>
                {allCards.filter((card) => selectedCategory ? card.building === selectedCategory : true).map(function (data) {
                    return(
                        <Link to={data.building}>
                            <Box sx={{
                                width: '450px',
                                background: "white",
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                borderRadius: "20px",
                                p: "20px",
                                margin: "0 25px 24px",
                                transition: ".3s",
                                border: "2px solid transparent",
                                cursor: 'pointer',
                                ":hover": {
                                    borderColor: "#3f6593"
                                }
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start'
                                }}>
                                    <img src={check(data.Pm)} className='w-[auto] h-[130px] border-[12px] border-white' alt={`Waiting for Image`}/>
                                    <Box sx={{
                                        pl: '30px',
                                    }}>
                                        <Typography variant='h3' sx={{
                                            fontSize: '20px',
                                        }}>
                                            {data.buildingRoom}
                                        </Typography>
                                        <Typography variant='h4' sx={{
                                            width: '60px',
                                            backgroundColor: buildingStyle(data.building),
                                            borderRadius: '12px',
                                            color: "white",
                                            textAlign: 'center',
                                            fontWeight: 300,
                                            fontSize: '16px',
                                            py: "1px"
                                        }}>
                                            {data.building}
                                        </Typography>
                                        <Typography variant='h1' sx={{
                                            fontSize: '50px',
                                            fontWeight: 400
                                        }}>
                                            {data.Pm}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Link>
                    )
                })}
            </Box>
        </Box>
    )
}

function check(pm) {

    if (pm >= 251) {
        // return hazadous;
    } else if (pm >= 151) {
        // return veryunhealthy;
    } else if (pm >= 66) {
        return unhealthy;
    } else if (pm >= 41) {
        // return unhealthyforsensitivegroup;
    } else if (pm >= 16) {
        // return moderate;
    } else {
        // return good;
    }
}

export default pmDisplay