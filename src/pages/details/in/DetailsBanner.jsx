import React, { useState } from 'react'
import useFetch from '../../../hooks/Usefetch';
import dayjs from 'dayjs';
import PosterFallback from "../../../assets/no-poster.png";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
 
import './banner.scss'
import ContentWrapper, { Genre , Circlerating,Playbtn, Videopop } from '../../../component/ContentWrapper/ContentWrapper';
import Img from '../../../component/lazyloadimg/Img';


const DetailsBanner = ({crew,video}) => {
    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`);
    const [videoId, setVideoId] = useState(null);
    const [show,setshow]=useState(false)


    const {url}=useSelector((state)=>state.home)
    const tohourand=(tm)=>{
        const hour=Math.floor(tm/60);
        const min=tm%60;
        return `${hour}h${min>0?`${min}m`:""}`
    }
    const director = crew?.filter((f) => f.job === "Director");
    const writer = crew?.filter(
        (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
    );
    
    const _genres = data?.genres?.map((g) => g.id);
  return (
    <div className='detailsbanner'>
        {!loading ?(
        <>
        {!!data &&(
            <React.Fragment>
                <div className='backdrop-img'>
            <Img src={url.backdrop+data?.backdrop_path}/>
        </div>
        <div className="opacity-layer"></div>
        <ContentWrapper>
            <div className="content">
                <div className="left">
                    {data.poster_path ?
                    <Img  className="posterImg"
                    src={url.backdrop+data.poster_path}
                    />
                    :(<Img  className="posterImg"
                    src={PosterFallback}
                    />)
                    }
                    
                </div>
                <div className="right">
                    <div className="title">
                        {`${data.name||data.title} (${dayjs(data?.release_date).format("YYYY")})`}
                    </div>
                    <div className="subtitle">
                        {data.tagline}
                    </div>
                    <Genre data={_genres}/>
                    <div className="row">
                        <Circlerating rating={data.vote_average.toFixed(1)}/>
                       
                        <div className="playBtn" onClick={()=>{
                            setshow(true)
                            setVideoId(video?.key);
                        }}>
                        <Playbtn/>
                        <span className="text">Watch Trailer</span>
                        </div> 
                    </div>
                    <div className="overview">
                            <div className="heading">
                                Overview
                            </div>
                            <div className="description">
                                {data.overview }
                            </div>
                    </div>
                    <div className="info">
                        {data.status && (
                            <div className="infoItem">
                                <span className="text bold">
                                    Status:{""}
                                </span>
                                <span className="text">
                                    {data.status}
                                </span>
                            </div>
                        )}
                        {data.release_date && (
                            <div className="infoItem">
                                <span className="text bold">
                                    Release Date:{""}
                                </span>
                                <span className="text">
                                    {dayjs(data.release_date).format("MMM D YYYY")}
                                </span>
                            </div>
                        )}
                        {data.runtime && (
                            <div className="infoItem">
                                <span className="text bold">
                                    Runtime:{""}
                                </span>
                                <span className="text">
                                    {tohourand(data.runtime)}
                                </span>
                            </div>
                        )}
                    </div>
                    {director?.length>0 &&(
                        <div className="info">
                            <span className="text bold">
                                Director:{""}
                            </span>
                            <span className="text">
                                {director?.map((d,i)=>(
                                    
                                    <span key={i} >
                                        {d.name}
                                        {director.length-1 !==i &&", "}
                                    </span>
                                ))}
                            </span>
                        </div>
                    )}
                     {director?.length>0 &&(
                        <div className="info">
                            <span className="text bold">
                                Writer:{""}
                            </span>
                            <span className="text">
                                {writer?.map((d,i)=>(
                                    
                                    <span key={i} >
                                        {d.name}
                                        {writer.length-1 !==i &&", "}
                                    </span>
                                ))}
                            </span>
                        </div>
                    )}
                     {data?.created_by?.length>0 &&(
                        <div className="info">
                            <span className="text bold">
                                Creator:{""}
                            </span>
                            <span className="text">
                                {data?.created_by?.map((d,i)=>(
                                    
                                    <span key={i} >
                                        {d.name}
                                        {data?.created_by?.length-1 !==i &&", "}
                                    </span>
                                ))}
                            </span>
                        </div>
                    )}
                </div>
            </div>
            <Videopop
            show={show}
            setshow={setshow}
            videoId={videoId}
            setVideoId={setVideoId}
            /> 
        </ContentWrapper>
            </React.Fragment>
        )}
        
        </>):
        (
            <div className="detailsBannerSkeleton">
                     
                        <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                        </ContentWrapper>
                    
                </div>
        )}
        <Genre/>
         
        
    </div>
  )
}

export default DetailsBanner