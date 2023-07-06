// import { header } from 'express/lib/request';
import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

const RegisterPage = () => {

  const base_url=process.env.REACT_APP_BASE_URL

  //grab the username and password from the form and store it in the useState()
  const [username,setUserName]=useState('')
  const [password,setPassword]=useState('')
  const [success,setSuccess]=useState(false)

  async function register(e){
    e.preventDefault();
    const response=await fetch(`${base_url}/register`,{ 
      method:'POST',
      body:JSON.stringify({username,password}), 
      headers:{'Content-Type':'application/json'},
      //this fetch call will grab the data i.e, username, password and send it to db.
      //this data will go in the 'req' parameter and is destuctured in the index.js file.
    })

    if(response.status===200){
      alert('Registration successful. Please login')
      setSuccess(true)
    }
    else{
      alert('registration failed. Try unique username maybe.')
    }

  }


  //extra feature by me
  if(success){
    return <Navigate to={'/login'} />
  }

  return (
    <form className='register' onSubmit={register}>

        <h2>Register</h2>

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

        <button>Register</button>
    </form>
  )
}

export default RegisterPage