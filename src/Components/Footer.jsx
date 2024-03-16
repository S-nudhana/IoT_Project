import React from "react";
import logo from "../assets/SIT_logo.png";
import {
    BsFillTelephoneFill,
    BsFillEnvelopeFill,
    BsLine,
    BsFacebook,
} from "react-icons/bs";
import { Typography, Box } from '@mui/material';

function Footer() {
    return (
        <Box sx={{
            backgroundColor: '#3F6593',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: {xs: "column", md: "row", lg: "row"},
                alignItems: "center",
                justifyContent: "space-evenly"
            }}>
                <Box>
                    <a href="https://www.sit.kmutt.ac.th/">
                        <img src={logo} alt="Logo" className="w-[300px] lg:w-[500px] h-[auto]" />
                    </a>
                </Box>
                <Box sx={{
                    color:'whitesmoke',
                    fontSize: {xs: "12px", md: "14px", lg: '16px'},
                }}>
                    <a href="" className="hover:text-white flex pt-[28px] md: pt-[40px] lg: pt-[40px] ">
                        <BsFillTelephoneFill /> &nbsp;&nbsp; +66 2470 9850
                    </a>
                    <a href="mailto:webadmin@sit.kmutt.ac.th" className="hover:text-white flex pt-[10px]">
                        <BsFillEnvelopeFill />&nbsp;&nbsp; webadmin@sit.kmutt.ac.th
                    </a>
                    <a href="https://www.facebook.com/SIT.Family" className="hover:text-white flex pt-[10px]">
                        <BsFacebook />&nbsp;&nbsp; SIT.Family
                    </a>
                    <a href="https://page.line.me/olt5471s?openQrModal=true" className="hover:text-white flex pt-[10px] pb-[20px]">
                        <BsLine />&nbsp;&nbsp; @sit.kmutt
                    </a>
                </Box>
            </Box>
            <hr className="mt-[1%] ml-[10%] mr-[10%] bg-[#3F6593]"></hr>
            <Typography sx={{
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'center',
                mt: '1%',
                pb: '2%',
                color: '#E0E5E5',
                fontSize: {lg:"14px", md:"12px", xs: "10px"},
                fontWeight: 400
            }}>
                © 2018 School of Information Technology, King Mongkut's University of Technology Thonburi.
            </Typography>
        </Box>
    )
}

export default Footer