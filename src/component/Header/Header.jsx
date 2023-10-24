import React, { useEffect, useState } from 'react';
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import logo from "../../assets/movix-logo.svg";
import ContentWrapper from '../ContentWrapper/ContentWrapper'

import './header.scss'
import { useLocation, useNavigate } from 'react-router-dom';
const Header = () => {
  const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
      window.scrollTo(0,0);
    },[location]
    )
    const controlNav=()=>{
      if(window.scrollY>200){
        if(window.scrollY>lastScrollY &&!mobileMenu){
          setShow("hide")
        }else{
          setShow("show")
        }
        
      }else{
        setShow("top")
      }
      setLastScrollY(window.scrollY);
    }

    useEffect(()=>{
      window.addEventListener("scroll",controlNav);
      return () => {
        window.removeEventListener("scroll", controlNav);
    };
    },[lastScrollY]);

    const openSearch=()=>{
      setMobileMenu(false);
      setShowSearch(true)
    }
    const Openmenu=()=>{
      setMobileMenu(true);
      setShowSearch(false)
    }
    const handlerquery=(e)=>{
      if(e.key==="Enter"&& query.length > 0){
          navigate(`/search/${query}`);
          setTimeout(()=>{
            setShowSearch(false)
          },1000)
      }
  }
  const navigateHandler=(e)=>{
    if(e=="movie"){
      navigate("/explore/movie");
    }else{
      navigate("/explore/tv")
    }
    setMobileMenu(false)
  }


  return (
    <header className={`header ${mobileMenu ? "mobileView":""} ${show} `}>
      <ContentWrapper className="contentWrapper">
        <div className="logo" onClick={()=>navigate("/")}>
          <img src={logo} alt=""  />
        </div>
        <ul className="menuitems">
          <li className="menuItem" onClick={()=>navigateHandler("movie")} > Movies</li>
          <li className="menuItem"onClick={()=>navigateHandler("tv")}>Tvshow</li>
          <li className="menuItem"><HiOutlineSearch onClick={openSearch}/></li>
        </ul>
        
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch}/>
          {mobileMenu?(<VscChromeClose onClick={()=>setMobileMenu()}/>):(<SlMenu onClick={Openmenu} />)}
        </div>

      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
        <ContentWrapper>
        <div className="searchInput">
                    <input type="text" placeholder='Search for a movie and tv show..' onChange={(e)=>setQuery(e.target.value)} onKeyUp={handlerquery} />
                     <VscChromeClose onClick={()=>setShowSearch(false)}/>
        </div>
        </ContentWrapper>
      </div>
      )}
    </header>
  )
}

export default Header