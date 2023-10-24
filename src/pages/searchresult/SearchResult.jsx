import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import './search.scss'
import { useParams } from 'react-router-dom'
import { fetchDataFromApi } from '../../utils/api'
import ContentWrapper from '../../component/ContentWrapper/ContentWrapper'
import { Moviecard, Spinner } from '../../component/Switchtab/SwitchTab'

const SearchResult = () => {
  const [data,setdata]=useState(null)
  const [pg,setpg]=useState(1)
  const [loading,setloading]=useState(false)
  const {query}=useParams();
  const fetch=()=>{
    setloading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pg}`).then(
      (res)=>{
        setdata(res);
        setpg((prev)=>prev+1);
        setloading(false)
      }
    )
  }
  const fetchNextpage=()=>{
    fetchDataFromApi(`/search/multi?query=${query}&page=${pg}`).then((res)=>{
      if(data.results){
        setdata({
          ...data,results:[...data.results,...res.results]
        })
      }else{
        setdata(res)
      }
      setpg((prev)=>prev+1);
    })
  }
  useEffect(()=>{
    setpg(1)
    fetch();
  },[query])
  return (
     <>
     <div className="resultpage">
      {loading && <Spinner initial={true}/> }
      {!loading &&(
        <ContentWrapper>
          {data?.results?.length >0?(
            <>
            <div className="title">
              {`Search ${data?.results?.length >1?"results":"result"} of '${query}' `}
            </div>
            <InfiniteScroll
            className='content'
            dataLength={data?.results?.length || []}
            next={fetchNextpage}
            hasMore={pg <= data?.total_pages}
            loader={<Spinner />}
            >
              {data?.results.map((i,index)=>{
                if(i.media_type==="person")return
                return (
                  <Moviecard
                  data={i}
                  key={index}
                  fromSearch={true}
                  />
                )
              })}
            </InfiniteScroll>
            </>
          ):(
            <span className='resultnotfound'>
              Sorry ,Result not found
            </span>
          )}
        </ContentWrapper>
      )}
     </div>

     </>
  )
}

export default SearchResult