import React from 'react';
import { BsChevronLeft } from "react-icons/bs";
import { Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import unhealthy from "../assets/unhealthygoose.png"
import { allCards } from '../Components/pmDisplay';

function LxBuilding() {
    const { Lx_Building } = useParams();

    const selectedCard = allCards.find(card => card.buildingRoom === Lx_Building);

    const borderStyle = (pm) => {
        if (pm >= 251) {
            return "#A07684";
        } else if (pm >= 151) {
            return "#A37DB8";
        } else if (pm >= 66) {
            return "#F6676B";
        } else if (pm >= 41) {
            return "#FC9956";
        } else if (pm >= 16) {
            return "#F7D460";
        } else {
            return "#ABD162";
        }
    };

    const check_Picture = (pm) => {
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

    const check_AQI_Catagory = (pm) => {
        if (pm >= 251) {
            return "Hazadous";
        } else if (pm >= 151) {
            return "Very Unhealthy";
        } else if (pm >= 66) {
            return "Unhealthy";
        } else if (pm >= 41) {
            return "Unhealthy for sensitive group";
        } else if (pm >= 16) {
            return "Moderate";
        } else {
            return "Good";
        }
    }

    return (
        <>
            <Navbar/>
            <Box>
                <Link to="/" className="flex mt-[2%] mb-[2%] ml-[2%] w-[60px]">
                    <BsChevronLeft className='mt-[3px] stroke-1'/> 
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
                    flexDirection: {xs: "column", md: "row", lg: "row"},
                    px: {xs: "0px", md: "20px", lg: "40px"},
                    gap: {xs: "0px", md: "20px", lg: "30px"},
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '70%',
                        mb: "50px",
                        py: "30px",
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        borderRadius: '20px'
                    }}>
                        <Typography sx={{
                            fontSize: '30px'
                        }}>
                            Room: {Lx_Building}
                        </Typography>
                        <Typography sx={{
                            fontSize: '20px'
                        }}>
                            Lx Building
                        </Typography>
                        <Box sx={{
                            border: '7px solid',
                            borderColor: borderStyle(selectedCard.Pm),
                            borderRadius: "100%",
                            my: '20px',
                            mx: "40px"
                        }}>
                            <img src={check_Picture(selectedCard.Pm)} alt="" className='py-[20px] px-[20px]'/>
                        </Box>
                        <Typography sx={{
                            fontSize: "50px",
                            fontWeight: 500
                        }}>
                            {selectedCard.Pm}
                        </Typography>
                        <Typography sx={{
                            fontSize: "20px"
                        }}>
                            {check_AQI_Catagory(selectedCard.Pm)}
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '70%',
                        maxWidth: "1200px",
                        hight: '1200px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        borderRadius: '20px',
                        mb: "50px",
                        py: "30px",
                    }}>
                        embed
                    </Box>
                </Box>
            </Box>
            <Footer/>
        </>
    );
}

export default LxBuilding