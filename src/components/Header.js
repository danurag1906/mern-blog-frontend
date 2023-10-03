import React, { useEffect, useState,useContext } from 'react'
import { Link, Navigate, redirect } from 'react-router-dom'
import { UserContext } from '../UserContext'

//when a user is logged in we need not show login and register links.
const Header = () => {
  const base_url=process.env.REACT_APP_BASE_URL
  // console.log(base_url);
  // const [username,setUserName]=useState(null)
  const {userInfo,setUserInfo} = useContext(UserContext)

  //the useEffect() is called every time when we reload the browser or click on '/' link.
  //it will then check if user is logged in or not and will show him respective header.
  //you can use await instead of .then
  useEffect(()=>{
    fetch(`${base_url}/profile`,{
      //here credentials are grabbed from the browser and sent to the backend.
      //If backend responds ok , then here userInfo will be set and we can display particular user's data.
      credentials:'include',
    }).then(response=>{
      response.json().then(userInfo=>{
        setUserInfo(userInfo)
      })
    })
  },[])


  function logout(){
    fetch(`${base_url}/logout`,{
      credentials:'include',
      method:'POST'
    })
    setUserInfo(null)
    
  }

  //if logged out reload the page.
  if(!userInfo){
    window.location.reload(true)
  }

  // const username=userInfo?.username //check if userInfo is not null

  return (
    <header>
      {/* <p>Welcome {username}</p> */}
    <Link to="/" className="logo">Anurag's Blog</Link>
    <nav>
      {username && (
        <>
          
          <Link to='/create' >Create new post</Link>
          <Link onClick={logout} >Logout</Link>
        </>
      )}
      {!username && (
        <>
          <Link to="login">Login</Link>
          <Link to="register">Register</Link>
        </>
      )}
    </nav>
    </header>
  )
}

export default Header
