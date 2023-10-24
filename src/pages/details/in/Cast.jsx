import React from 'react'
import'./cast.scss'
import ContentWrapper from '../../../component/ContentWrapper/ContentWrapper'
import { useSelector } from 'react-redux';
import avatar from '../../../assets/avatar.png'
import Img from '../../../component/lazyloadimg/Img';

const Cast = ({data,loading}) => {
    const{url}=useSelector((state)=>state.home)
    const skeleton=()=>{
        return(
            <div className="skItem">
            <div className="circle skeleton"></div>
            <div className="row skeleton"></div>
            <div className="row2 skeleton"></div>
        </div>
        )
    }
  return (
     <div className="castSection">
        <ContentWrapper>
            <div className="Heading">Top Cast</div>
            {!loading?(
                <div className="lists">
                    {data?.map((item)=>{
                        let imgurl=item.profile_path? url.profile+item.profile_path:avatar;
                        return(
                            <div key={item.id} className="list">
                                <div className="profile">
                                    <Img src={imgurl}/>
                                </div>
                                <div className="name">{item.name} </div>
                                <div className="char">{item.character}</div>
                            </div>
                        )
                    })}
                </div>
            ):(
                <div className="castSkelton">
                    {skeleton()}
                    {skeleton()}
                    {skeleton()}
                    {skeleton()}
                    {skeleton()}
                    {skeleton()}
                </div>
            ) }
        </ContentWrapper>
     </div>
  )
}

export default Cast