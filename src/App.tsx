import React from 'react';
import Nav from './components/nav';
import Hero from './components/hero';
import CsvTable from './components/table';
// import CSVReader from './components/maintable';

const App = () =>{
  return (
    <>
    <Nav/>
    <Hero/>
    <CsvTable/>
    {/* <CSVReader/> */}
    </>
    

  )
}

export default App;