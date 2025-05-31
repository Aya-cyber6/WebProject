import React from 'react'
import AllWorks from '../components/AllWorks'
import Altbar from '../components/Altbar'
import SumWorkDayComp from '../components/SumWorkDayComp'

function Work() {

  return (
    <div className="container mt-5" style={{ paddingTop: '30px' }}>

    <AllWorks/>
    <SumWorkDayComp/>
    <Altbar/>
      
    </div>
  )
}export default Work
