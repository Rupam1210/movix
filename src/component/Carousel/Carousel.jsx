import React, { useRef } from 'react'
import './carousel.scss'
import {BsFillArrowLeftCircleFill,BsFillArrowRightCircleFill}from 'react-icons/bs'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PosterFallback from "../../assets/no-poster.png";
import Img from '../lazyloadimg/Img'
import dayjs from 'dayjs';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
 

const Carousel = ({data,loading,endpoint,title}) => {
    const carouselContainer=useRef();
    const{url,genres}=useSelector((state)=>state.home);
    const navigate=useNavigate();
    const skiitem=()=>{
        return (
            <div className="skeltonItem">
                <div className="posterBlock"></div>
                <div className="textBlock">
                    <div className="title"></div>
                    <div className="date"></div>

                </div>
            </div>
        )
         
    }
    const navigation = (dir) => {
        const container = carouselContainer.current;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };
    const Genre=({data})=>(
        <div className="genres">
            {data?.map((g)=>{
                if(!genres[g]?.name)return;
                return(

                    <div key={g} className="genre">
                        {genres[g]?.name}
                    </div>
                )
            })}

        </div>
        )
  return (
    <div className="carousel">
        <div className="wrapper">
            {title && <div className="title">{title}</div>
            }
            <BsFillArrowLeftCircleFill 
            className='leftnav arrow'
            onClick={()=>navigation("left")}
            />
            <BsFillArrowRightCircleFill 
            className='rightnav arrow'
            onClick={()=>navigation("right")}/>
            {!loading?(
                <div className="Items" ref={carouselContainer}>
                    {data?.map((e)=>{
                        const posterurl=e.poster_path?url.poster+e.poster_path:PosterFallback;
                         
                        return(
                           
                            <div key={e.id} className="Item" onClick={()=>
                            navigate(`/${e.media_type||endpoint}/${e.id}`)
                            }>
                                <div className="posterBlock">
                                    <Img src={posterurl} />
                                    <Circlerating rating={e.vote_average.toFixed(1)}/>
                                    <Genre data={e.genre_ids.slice(0,2)} />
                                </div>
                                <div className="textblock">
                                    <span className="title">
                                        {e.title||e.name}
                                    </span>
                                    <span className="date">
                                        {dayjs(e.release_date || e.first_air_date).format("MMM D, YYYY")}
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ):(
                <div className="skeleton">
                    {skiitem()}
                    {skiitem()}
                    {skiitem()}
                    {skiitem()}
                    {skiitem()}
                </div>
            )}

        </div>
    </div>
  )
}
const Circlerating=({rating})=>(
    <div className="Rating">
        <CircularProgressbar
        value={rating}
        maxValue={10}
        text={rating}
        styles={buildStyles({
            pathColor:rating<5?"red":rating<7?"orange":"green",
        })}
        >

        </CircularProgressbar>
    </div>
)


export default Carousel