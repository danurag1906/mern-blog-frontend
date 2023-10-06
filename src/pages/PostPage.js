import { formatISO9075 } from 'date-fns'
import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { UserContext } from '../UserContext'

const PostPage = () => {

    const base_url=process.env.REACT_APP_BASE_URL

    const [postInfo,setPostInfo] = useState(null)
    const {userInfo} = useContext(UserContext)
    const [redirect,setRedirect]=useState(false)
    const {id}=useParams()

    //we will fetch the post with the id=id and store the data in postInfo.
    useEffect(()=>{
        fetch(`${base_url}/post/${id}`).then(response=>{
            response.json().then(postInfo=>{
                setPostInfo(postInfo)
            })
        })
    },[])


    async function deletePost(e){
        e.preventDefault();
        const response = await fetch(`${base_url}/post/` + id, {
            method: 'DELETE',
            credentials: 'include',
        });
        if (response.ok) {
            // console.log("inside response ok");
            setRedirect(true)
        }
    }

    if(!postInfo) return (
        <>
            <div className='loading' >Loading...</div>
        </>
    );

    if(redirect){
        alert('Post deleted successfully!')
        return <Navigate to={'/'} />
    }

  return (
    <div className="post-page">
        <div className="image">
            <img src={`${base_url}/${postInfo.cover}`} />
        </div>
        <h1>{postInfo.title}</h1>
        <time> {formatISO9075(new Date(postInfo.createdAt))} </time>
        <div className="author">By : {postInfo.author.username}</div>
        {userInfo.id===postInfo.author._id &&(
            <div className='edit-row'>
                <Link to={`/edit/${postInfo._id}`} className="edit-btn">Edit this post</Link>
                <Link style={{marginLeft:'10px'}} className='edit-btn' onClick={deletePost} >Delete Post</Link>
            </div>
        )}
        <div dangerouslySetInnerHTML={{__html:postInfo.content}} ></div>
        {/* to remove the html tags we got from quill-board */}
    </div>
  )
}

export default PostPage