import React, { useEffect, useState } from "react";
import Post from "../components/Post";


const AllPosts = () => {
  const [posts,setPosts]=useState([])
  const base_url=process.env.REACT_APP_BASE_URL

  //we will fetch all the posts from db and store them in posts variable.
  //then we will iterate through all the posts and display them.
  useEffect(()=>{
    fetch(`${base_url}/posts`).then((response)=>{
      response.json().then((posts)=>{
        // console.log(posts);
        setPosts(posts)
      })
    })
  },[])

  if(posts.length===0){
    return(
      <>
        <div className="loading" >Loading...</div>
      </>
    )
  }

  return (
    <>
    
    {/* we are passing post as props to <Post/> and then displaying the data */}
      {posts.length>0 && posts.map(post=>(
        <Post key={post._id} {...post} />
      ))}
    </>
  );
};

export default AllPosts;
