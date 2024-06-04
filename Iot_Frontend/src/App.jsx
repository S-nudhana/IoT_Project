import React, { useEffect, useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Main_pmDisplay from './Components/pmDisplay'
import Footer from "./Components/Footer"
import Table from './Components/Table'

export default function App() {
  const [pmData, setPmData] = useState();
  // const getPmData = async () => {
      // const pmDataQuery = await axios.get(``);
      // setPmData(pmDataQuery.data.data);
  // };
  useEffect(() => {
      // getPmData();
  }, []);
  return (
    <>
      <Navbar />
      <Main_pmDisplay/>
      <Table />
      <Footer />
    </>
  )
}