import { Link } from "react-router-dom";
import {
  BsFillTelephoneFill,
  BsFillEnvelopeFill,
  BsLine,
  BsFacebook,
} from "react-icons/bs";
import { Typography, Box } from "@mui/material";
import logo from "/assets/image/SIT_logo.png";

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#3F6593",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Box>
          <Link to="https://www.sit.kmutt.ac.th/">
            <img
              src={logo}
              alt="Logo"
              className="w-[300px] lg:w-[500px] h-[auto]"
            />
          </Link>
        </Box>
        <Box
          sx={{
            color: "whitesmoke",
            fontSize: { xs: "12px", md: "14px", lg: "16px" },
          }}
        >
          <Link
            to=""
            className="hover:text-white flex pt-[28px] md:pt-[40px] lg:pt-[40px]"
          >
            <BsFillTelephoneFill className="mt-[3px]" /> &nbsp;&nbsp; +66 2470
            9850
          </Link>
          <Link
            to="mailto:webadmin@sit.kmutt.ac.th"
            className="hover:text-white flex pt-[10px]"
          >
            <BsFillEnvelopeFill className="mt-[3px]" />
            &nbsp;&nbsp; webadmin@sit.kmutt.ac.th
          </Link>
          <Link
            to="https://www.facebook.com/SIT.Family"
            className="hover:text-white flex pt-[10px]"
          >
            <BsFacebook className="mt-[3px]" />
            &nbsp;&nbsp; SIT.Family
          </Link>
          <Link
            to="https://page.line.me/olt5471s?openQrModal=true"
            className="hover:text-white flex pt-[10px] pb-[20px]"
          >
            <BsLine className="mt-[3px]" />
            &nbsp;&nbsp; @sit.kmutt
          </Link>
        </Box>
      </Box>
      <hr className="mt-[1%] ml-[10%] mr-[10%] bg-[#3F6593]"></hr>
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          mt: "1%",
          pb: "2%",
          color: "#E0E5E5",
          fontSize: { lg: "14px", md: "12px", xs: "9px" },
          fontWeight: 400,
        }}
      >
        © 2018 School of Information Technology, King Mongkut's University of
        Technology Thonburi.
      </Typography>
    </Box>
  );
}
