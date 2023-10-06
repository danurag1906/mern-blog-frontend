import React from 'react'
import { useState } from 'react'
import ReactQuill from 'react-quill'
import { Navigate } from 'react-router-dom'
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

const CreatePost = () => {

  const base_url=process.env.REACT_APP_BASE_URL

    //all this data is sent to the backend as form data.
    const [title,setTitle]=useState('')
    const [summary,setSummary]=useState('')
    const [content,setContent]=useState('')
    const [files,setFiles]=useState('')
    const [redirect,setRedirect]=useState(false)

    async function createNewPost(e){
        const data=new FormData()
        data.set('title',title)
        data.set('summary',summary)
        data.set('content',content)
        data.set('files',files[0])
        e.preventDefault()
        // console.log(files);
        const response=await fetch(`${base_url}/post`,{
            method:'POST',
            body:data,
            // enctype:'multipart/form-data',
            // credentials:'include',
        })
        if(response.ok){

          //if post is created successfully we will redirect the user to home page.
          alert('New post created!')
          setRedirect(true)
        }
    }

    if(redirect){
      return <Navigate to={'/'} />
    }

  return (
    <form onSubmit={createNewPost}>
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
        <input type="file" name='files' placeholder='Upload image' onChange={e=>setFiles(e.target.files)} />
        <ReactQuill value={content} 
        modules={modules} 
        formats={formats}
        onChange={newValue=>setContent(newValue)}
         /> 
        {/* editor */}
        <button style={{marginTop:'10px'}} >Create Post</button>
    </form>
  )
}

export default CreatePost