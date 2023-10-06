import React, { useEffect } from 'react'
import { useState } from 'react'
import ReactQuill from 'react-quill'
import { Navigate, useParams } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css'


const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

const EditPost = () => {

    const base_url=process.env.REACT_APP_BASE_URL

    const {id}=useParams()
    const [title,setTitle]=useState('')
    const [summary,setSummary]=useState('')
    const [content,setContent]=useState('')
    const [files,setFiles]=useState('')
    const [redirect,setRedirect]=useState(false)

    //we are fetching the post with a particular id and setting the data so it can be shown on the screen
    //later when we make changes the data will be updated.
    useEffect(()=>{
        fetch(`${base_url}/post/`+id).then(response=>{
            response.json().then(postInfo=>{
                setTitle(postInfo.title)
                setSummary(postInfo.summary)
                setContent(postInfo.content)

            })
        })
    },[])


    async function updatePost(e){
        e.preventDefault();
        const data=new FormData()
        data.set('title',title)
        data.set('summary',summary)
        data.set('content',content)
        data.set('id',id)
        if(files?.[0]){
            data.set('files',files?.[0])
        }
        
        const response=await fetch(`${base_url}/post`,{
            method:'PUT',
            body:data,
            // credentials:'include',
        })
        if(response.ok){
            alert('This post is editted !')
            setRedirect(true)
        }
        
    }

    if(redirect){
        return <Navigate to={'/post/'+id} />
      }
  
    return (
      <form onSubmit={updatePost}>
          <input type="title" 
          placeholder='Title'
          value={title}
          onChange={e=>setTitle(e.target.value)}
           />
          <input type="summary" 
          placeholder='Summary'
          value={summary}
          onChange={e=>setSummary(e.target.value)}
           />
          <input type="file" placeholder='Upload image' onChange={e=>setFiles(e.target.files)} />
          <ReactQuill value={content} 
          modules={modules} 
          formats={formats}
          onChange={newValue=>setContent(newValue)}
           /> 
          {/* editor */}
          <button style={{marginTop:'10px'}} >Update Post</button>
          
      </form>
    )
}

export default EditPost