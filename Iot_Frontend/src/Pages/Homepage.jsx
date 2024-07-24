import Navbar from "../Components/Navbar";
import Main_pmDisplay from "../Components/pmDisplay";
import Footer from "../Components/Footer";
import Table from "../Components/Table";
import Header from "../Components/Header";
import { Box } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";

export default function App() {
  const fetch = async () => {
    const response = await axios.get(
      `http://pm25project.sit.kmutt.ac.th:3000/`
    );
    console.log(response);
  }

  useEffect(() => {
    fetch();
  },[]);

  return (
    <>
      <Navbar />
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Header />
      </Box>
      <Box sx={{ position: "relative", zIndex: 2, mt: "-200px" }}>
        <Main_pmDisplay />
      </Box>
      <Box sx={{ zIndex: 3 }}>
        <Table />
        <Footer />
      </Box>
    </>
  );
}
