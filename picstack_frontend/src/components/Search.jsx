import React, { useEffect, useState } from 'react'
import { client } from '../client'
import { postQuery, searchQuery } from '../utils/datafromsanity'
import Masonrylayout from './Masonrylayout'

const Search = ({term,setterm}) => {
const [searchedpost, setsearchedpost] = useState([])

useEffect(() => {
  if(term.length == 1){
  client.fetch(searchQuery(term)).then((res)=>{
    // console.log(res);
    setsearchedpost(res)
  })}
  else{
    client.fetch(postQuery).then((res)=>{
      // console.log(res);
      setsearchedpost(res)
    })}
}, [term])


  return (
    <div>
      {searchedpost && <Masonrylayout postsdata={searchedpost} />}
    </div>
  )
}

export default Search