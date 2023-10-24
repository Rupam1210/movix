import React, { useState } from 'react'
import useFetch from '../../../hooks/Usefetch';
import SwitchTab from '../../../component/Switchtab/SwitchTab';
import Carousel from '../../../component/Carousel/Carousel';


const Toprated = () => {
    const [endpoint,setendpoint]=useState("movie");
    const {data,loading}=useFetch(`/${endpoint}/top_rated`);
    const onTabChange=(tab)=>{
        setendpoint(tab==="Movies"?"movie":"tv")
    }
  return (
     <>
      <div className="courselSection">
        <div className="contentwrapper">
            <span className="title">Top Rated</span>
            <SwitchTab data={["Movies","Tv show"]}  onTabChange={onTabChange} />
        </div>
        <Carousel data={data?.results} loading={loading}
        endpoint={endpoint}
        />
      </div>
     </>
  )
}

export default Toprated