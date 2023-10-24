import React, { useState } from 'react'
import useFetch from '../../../hooks/Usefetch';
import SwitchTab from '../../../component/Switchtab/SwitchTab';
import Carousel from '../../../component/Carousel/Carousel';


const Trending = () => {
    const [endpoint,setendpoint]=useState("day");
    const {data,loading}=useFetch(`/trending/all/${endpoint}`);
    const onTabChange=(tab)=>{
        setendpoint(tab==="day"?"day":"week")
    }
  return (
     <>
      <div className="courselSection">
        <div className="contentwrapper">
            <span className="title">Trending</span>
            <SwitchTab data={["day","week"]}  onTabChange={onTabChange} />
        </div>
        <Carousel data={data?.results} loading={loading}/>
      </div>
     </>
  )
}

export default Trending