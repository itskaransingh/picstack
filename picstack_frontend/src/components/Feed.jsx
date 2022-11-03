import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Masonrylayout from './Masonrylayout'
import { client } from '../client'
import { postQuery, searchQuery } from '../utils/datafromsanity'
import Spinner from './Spinner'

const Feed = ({}) => {
 const [postsdata, setpostsdata] = useState(null)
 const [loading, setloading] = useState(false)

 const {categoryId}=useParams()

 const fetchingposts=()=>{
  setloading(true)
  if (categoryId) {
    client.fetch(searchQuery(categoryId))
    .then((response)=>{
    console.log(response); 
    setpostsdata(response)
    })
  } else {
   client.fetch(postQuery)
   .then((response)=>{   
    console.log(response); 
   setpostsdata(response)
   })
  }
setloading(false)
 }

 useEffect(() => {
  fetchingposts()
 }, [categoryId])


 if(loading) return <Spinner message={'Loading...'}/>
 
  return (
    <div>
      <Masonrylayout postsdata={postsdata} fetchingposts={fetchingposts} />
    </div>
  )
}

export default Feed