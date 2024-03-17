import React from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Main_pmDisplay from './Components/pmDisplay'
import Footer from "./Components/Footer"
import Table from './Components/Table'

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Main_pmDisplay />
      <Table/>
      <Footer/>
    </div>
  )
}

export default App
