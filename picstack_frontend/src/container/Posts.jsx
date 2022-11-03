import React, { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import { Addpost, Feed, Navbar, Postdetails, Search } from '../components'


const Posts = ({user}) => {
  const [searchterm, setsearchterm] = useState('')

  return (
    <div className='flex flex-col   bg-slate-100 min-h-[100vh] '>
      <div><Navbar  term={searchterm} setterm={setsearchterm} user={user}/></div>
      <div className='px-5 w-[100%] md:mx-0 mx-auto'>
           <Routes>
            <Route  path='/' element={<Feed />}/>
            <Route path='/addpost' element={<Addpost/>}/>
            <Route path='/category/:categoryId' element={<Feed/>}/>
            <Route path='/search' element={<Search term={searchterm} setterm={setsearchterm}/>}/>
            <Route path='/postdetails/:postId' element={<Postdetails/>}/>
            </Routes>    
      </div>
    </div>
  )
}

export default Posts