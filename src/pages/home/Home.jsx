import React from 'react'
import './home.scss'
 
import Trending from './trending/Trending'
import Popular from './trending/Popular'
import Toprated from './trending/Toprated'
import Herobanner from './trending/Herobanner'
 




const Home = () => {
  return (
    <div className='homepage'>
        <Herobanner/>
        <Trending/>
        <Popular/>
        <Toprated/>
        
    </div>
  )
}

export default Home