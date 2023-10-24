import React, { useEffect, useState } from 'react'
import './herobanner.scss'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/Usefetch';
import Img from'../../../component/lazyloadimg/Img'
import ContentWrapper from '../../../component/ContentWrapper/ContentWrapper'

import { useSelector } from 'react-redux';

const Herobanner = () => {
    const [background,setbackground]=useState("");
    const [query,setquery]=useState("");
    const navigate=useNavigate();
    const {data,loading}=useFetch("/movie/upcoming");


    const {url}=useSelector((state)=>state.home)
    useEffect(()=>{
        const bg= url.backdrop+
        data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path
        setbackground(bg);
        console.log(bg)
    },[data])
    console.log(data);
    const handlerquery=(e)=>{
        if(e.key==="Enter"&& query.length > 0){
            navigate(`/search/${query}`)
        }
    }
  return (
    <div className='herobanner'>
    {!loading && (<div className="backdrop-img">
        <Img src={background}  />
        
    </div>)}
    <div className="opacity-layer"></div>
        <ContentWrapper>
        <div className="content">
                <span className='title'> Welcome</span>
                <span className='subtitle'> Millons of Movies .Tv Shows and people to discover.</span>
                <div className="searchInput">
                    <input type="text" placeholder='Search for a movie and tv show..' onChange={(e)=>setquery(e.target.value)} onKeyUp={handlerquery} />
                    <button>Search</button>
                </div>
            </div>
        </ContentWrapper>
    </div>
  )
}

export default Herobanner