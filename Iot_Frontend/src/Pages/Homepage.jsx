import Navbar from "../Components/Navbar";
import Main_pmDisplay from "../Components/pmDisplay";
import Footer from "../Components/Footer";
import Table from "../Components/Table";
import Header from "../Components/Header";
import { Box } from "@mui/material";

export default function App() {
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
