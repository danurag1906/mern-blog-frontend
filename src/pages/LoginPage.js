import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext'

const LoginPage = () => {


  const base_url=process.env.REACT_APP_BASE_URL

  //here we are again grabbing username and password and sending it to backend using fetch call.

  const [username,setUserName]=useState('')
  const [password,setPassword]=useState('')
  const [redirect,setRedirect]=useState(false)

  //we are saving the username and id in the UserContext to acces the data across the app and change the header when the user is logged in and logged out.
  const {setUserInfo}=useContext(UserContext)

  async function login(e){
    e.preventDefault()
    const response= await fetch(`${base_url}/login`,{
      method:'POST',
      body:JSON.stringify({username,password}),
      headers:{'Content-Type':'application/json'},
      credentials:'include', //we need to include crederntials in the headers to allow it cookies to be used anywhere in the app
    })
    if(response.ok){
      //if the login is successful we need to redirect it to home page i.e, '/'.
      response.json().then(userInfo=>{
        setUserInfo(userInfo)
        setRedirect(true)
      })
    }
    else{
      alert('Wrong credentials . Or user not registered.')
    }
  }

  

  if(redirect){
    return <Navigate to={'/'} />
  }

  return (
    <form className='login' onSubmit={login}>
        <h2>Login</h2>
        <input type="text" 
        placeholder="username"
        value={username}
        onChange={e=>setUserName(e.target.value)}
        />
        <input type="password" 
        placeholder="password"
        value={password}
        onChange={e=>setPassword(e.target.value)}  
        />
        <button>Login</button>
    </form>
  )
}

export default LoginPage