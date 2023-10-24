import React, { useState } from 'react'
import './cast.scss'
import ContentWrapper, { Playbtn, Videopop } from '../../../component/ContentWrapper/ContentWrapper';
import Img from '../../../component/lazyloadimg/Img';

const VideoSection = ({data,loading}) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
  return (
     <div className="videosection">
        
            { data?.results.length >0 &&(
                <ContentWrapper>
                <div className="heading">Offivial Videos</div>
                {!loading?(
                    <div className="videos">
                        {data?.results?.map((e)=>(
                             
                                <div className="videoItem" key={e.id} onClick={()=>{
                                    setShow(true)
                                    setVideoId(e.key)
                                }}
                                 >
                                    <div className="thumb">
                                        <Img src={`https://img.youtube.com/vi/${e.key}/mqdefault.jpg`}/>
                                        <Playbtn/>
                                    </div>
                                    <div className="name">{e.name}</div>
                                </div>
                            )
                        )}
                    </div>
                ):(
                    <div className="skel">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
                </ContentWrapper>
            )}
        
        <Videopop 
        setVideoId={setVideoId}
        show={show}
        setshow={setShow}
        videoId={videoId}
        />
     </div>
  )
}

export default VideoSection