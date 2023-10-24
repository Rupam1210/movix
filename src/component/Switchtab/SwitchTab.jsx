import React, { useState } from 'react'
import './style.scss'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Img from '../lazyloadimg/Img';
import { Circlerating, Genre } from '../ContentWrapper/ContentWrapper';
import dayjs from 'dayjs';

const SwitchTab = ({data,onTabChange}) => {
    const [left,setleft]=useState(0);
    const [selected,setselect]=useState(0);
    const activeTab=(tab,index)=>{
        setleft(index*100);
        setTimeout(()=>{
            setselect(index);
        },300)
        onTabChange(tab,index);
    }
  return (
    <div className="switch">
        <div className="tabItems">
            {data.map((tab,index)=>(
                <span className={`tabItem ${selected===index?"active":""}`}
                key={index} onClick={()=> activeTab(tab,index)}
                 >{tab}
                </span>
            ))}
            <span className='movingbg' style={{left}}/>
        </div>
    </div>

  )
}
export const Spinner=({initial})=>{
    <div className={`loadingSpinner ${initial?"initial":""}`}>
        <svg className='spinner' viewBox='0 0 50 50'>
            <circle
            className='path'
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="5">
                

            </circle>
        </svg>
    </div>
}
export const Moviecard=({data,fromSearch,mediatype})=>{
    const {url}=useSelector((state)=>state.home);
    const navigate=useNavigate();
    const posterUrl = data.poster_path
        ? url.poster + data.poster_path
        : PosterFallback;
    return(
        <>
        <div className="movieCard"
        onClick={()=>navigate(`/${data.media_type||mediatype}/${data.id}`)}>

            <div className="posterBlock">
            <Img src={posterUrl} className="posterImg"/>
                {!fromSearch&&(
                    <React.Fragment>
                         <Circlerating rating={data.vote_average.toFixed(1)} />
                         <Genre data={data.genre_ids.slice(0, 2)} />
                    </React.Fragment>
                   
                )}
                
            </div>
            <div className="textBlock">
                <span className="title">{data.title||data.name}</span>
                <span className="date">{dayjs(data.release_date).format("MMM D YYYY")}</span>
            </div>
        </div>
        </>
    )    
}

export default SwitchTab