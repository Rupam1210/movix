import React from "react";

import "./style.scss";
import { useSelector } from "react-redux";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ReactPlayer from "react-player/youtube";

const ContentWrapper = ({ children }) => {
    return <div className="contentWrapper">{children}</div>;
};

export default ContentWrapper;
export  const Genre=({data})=>{
    const{genres}=useSelector((state)=>state.home);
    return(
    <div className="genres">
        {data?.map((g)=>{
            if(!genres[g]?.name)return;
            return(

                <div key={g} className="genre">
                    {genres[g]?.name}
                </div>
            )
        })}

    </div>)
}
export const Circlerating=({rating})=>{
    return (
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
}
export const Playbtn=()=>{
    return (
        <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="80px"
            height="80px"
            viewBox="0 0 213.7 213.7"
            enableBackground="new 0 0 213.7 213.7"
            xmlSpace="preserve"
        >
            <polygon
                className="triangle"
                fill="none"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                points="73.5,62.5 148.5,105.8 73.5,149.1 "
            ></polygon>
            <circle
                className="circle"
                fill="none"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                cx="106.8"
                cy="106.8"
                r="103.3"
            ></circle>
        </svg>
    );
}
export const Videopop=({videoId,show,setshow,setVideoId})=>{
    const hidepop=()=>{
        setshow(false)
        setVideoId(null)
    }
return (
    <div className={`videopop ${show? "visible":""}`}>
        <div className="opacity" onClick={hidepop}></div>
        <div className="videoplayer">
            <span className="closeBtn"onClick={hidepop} >
                close
            </span>
            <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoId}`}
            controls
            width="100%"
            height="100%"
            >
            </ReactPlayer>
        </div>
    </div>
)
}