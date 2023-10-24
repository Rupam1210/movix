import React from 'react'
import './details.scss'
import useFetch from '../../hooks/Usefetch';
import { useParams } from 'react-router-dom';
import DetailsBanner from './in/DetailsBanner';
import Cast from './in/Cast';
import VideoSection from './in/VideoSection';
import Carousel from '../../component/Carousel/Carousel';
const Details = () => {
  const {mediaType,id}=useParams();
  const {data,loading}=useFetch(`/${mediaType}/${id}/videos`);
  const {data:credits,loading:creditsloading}=useFetch(`/${mediaType}/${id}/credits`);
  const Recomed=({mediaType,id})=>{
    const {data,loading,error} =useFetch(`/${mediaType}/${id}/recommendations`);
    console.log(data)
    return (
      <>
     {data?.results.length >0 && (
      <Carousel data={data?.results}
      endpoint={mediaType}
      loading={loading}
      title="Recommendation"
      />
     )}
     </>
    )
  }
  const Similar=({mediaType,id})=>{
    const {data,loading,error} =useFetch(`/${mediaType}/${id}/similar`);
    const title=mediaType ==="tv"?"Similar Tv Show":"Similiar Movies"
    
    return (
      <Carousel data={data?.results}
      endpoint={mediaType}
      loading={loading}
      title={title}
      />
    )
  }
  return (

    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsloading}/>
      <VideoSection data={data} loading={loading}/>
      
      <Similar mediaType={mediaType} id={id} />
      <Recomed mediaType={mediaType} id={id} />
      
    </div>
  )
}


export default Details