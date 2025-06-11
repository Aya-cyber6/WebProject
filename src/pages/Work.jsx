import React from 'react';
import AllWorks from '../components/AllWorks';
import Altbar from '../components/Altbar';
import SumWorkDayComp from '../components/SumWorkDayComp';

function Work() {
  const tc = localStorage.getItem("tc"); // veya context/token'dan da alabilirsin

  return (
    <div className="container mt-5" style={{ paddingTop: '30px' }}>
      <AllWorks tc={tc} />
      <SumWorkDayComp tc={tc} />
      <Altbar />
    </div>
  );
}
export default Work;
