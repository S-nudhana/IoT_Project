import React from 'react'
import Navbar from '../Components/Navbar'
import Main_pmDisplay from '../Components/pmDisplay'
import Footer from "../Components/Footer"
import Table from '../Components/Table'

export default function App() {
  return (
    <>
      <Navbar />
      <Main_pmDisplay/>
      <Table />
      <Footer />
    </>
  )
}