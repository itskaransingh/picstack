import React, { useState } from "react";
import { BsCardImage } from "react-icons/bs";
import {ImBin} from 'react-icons/im'
import { useNavigate } from "react-router-dom";
import { client } from "../client";
import { categories } from "../utils/datafromsanity";
import { userls } from "../utils/lsuserdata";
import Spinner from "./Spinner";


const Addpost = () => {
  const [img, setimg] = useState(null);
  const [title, settitle] = useState(null);
  const [about, setabout] = useState(null);
  const [category, setcategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allfields, setAllfields] = useState(true)
  const navigate=useNavigate();
  
  if (loading) return <Spinner message="Processing..."/> ;
  
  const userlsdata=userls()
const imageupload = (e) => {
  const { type, name } = e.target.files[0];
  setLoading(true);
  client.assets
    .upload("image", e.target.files[0], { contentType: type, filename: name })
    .then((document) => {
      
      setimg(document);
      setLoading(false);
    })
}

const createposthandler=()=>{
  if(img && title && about && category ){
    setLoading(true);
    // setAllfields(false)
    const doc={
      _type:'post',
      title,
      about,
      category,
      image:{
        _type:'image',
        asset:{
          _type:'reference',
          _ref:img._id
        }
      },
      userid:userlsdata.sub,
      postedBy:{
        _type:'postedBy',
        _ref:userlsdata.sub 
      }
      
    }
    
    client.create(doc).then(()=>{
      navigate('/')
      setInterval(()=>(window.location.reload()),2000)
      
    })
    
      setLoading(false);
    }
      else{
        setAllfields(false)
        setInterval(()=>(setAllfields(true)),3000)
  }
}


  return (
    <div className="flex justify-center items-center flex-col md:w-[90%] gap-5">
      {
        !allfields  && (
          <div className="text-red-700 font-bold">Fill All Fields Plz!!!</div>
        )
      }
      <div className="flex justify-center items-center h-96 cursor-pointer md:w-[65%] w-full bg-white">
        {" "}
        {!img ? (
          <label htmlFor="img" className="w-full cursor-pointer">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col justify-center items-center  ">
                <div className="text-gray-500">
                  <BsCardImage fontSize={100} />
                </div>
                <div className="font-semibold text-gray-500">Upload Image</div>
              </div>
              <div className="text-gray-600 font-semibold text-center">
                Upload Image Of Type JPG,PNG,SVG
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={imageupload}
                name=""
                id="img"
              />
            </div>
          </label>
        ) : (
          <div className="w-full  h-full flex justify-center items-center ">
            <div className="border-2 relative border-black h-[90%] w-auto">
            <img
              src={img?.url}
              alt=""
              className="w-full h-full "
            />
             <div className="absolute bottom-0 right-0 ">
            <div className="flex justify-center items-center mr-3 mb-3 h-10 w-10 hover:opacity-100 cursor-pointer  bg-gray-500 rounded-full opacity-80 text-black" onClick={()=>(
              setimg(null)
            )}>
            <ImBin fontSize={20} />
              </div>  
              </div>
            </div>
            
          </div>
        )}{" "}
      </div>
      <div className="flex flex-col md:w-[65%] w-full gap-2">
        <label htmlFor="title" className="text-lg font-semibold">
          Title
        </label>
        <input
          type="text"
          name=""
          id="title"
          onChange={(e) => settitle(e.target.value)}
          className="text-lg p-2 outline-none border-none"
        />
      </div>
      <div className="flex flex-col md:w-[65%] w-full">
        <label htmlFor="about" className="text-lg font-semibold">
          About
        </label>
        <input
          type="text"
          name=""
          id="about"
          onChange={(e) => setabout(e.target.value)}
          className="text-lg p-2 outline-none border-none"
        />
      </div>
      <div className="flex flex-col md:w-[65%] w-full">
        <label htmlFor="category" className="text-lg font-semibold">
          Category
        </label>
        <select
          name=""
          id="category"
          onChange={(e) => setcategory(e.target.value)}
          className="text-lg py-2 pr-1 outline-none border-none"
        >
          <option value="other">Select Category</option>
          {categories?.map((c, i) => (
            <option value={c.name} key={i}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col md:w-[65%] w-full bg-blue-500 hover:bg-blue-700 py-3 font-semibold rounded-md mb-16">
        <button onClick={createposthandler} className="w-full h-full">Submit</button>
      </div>
    </div>
  );
};

export default Addpost;
