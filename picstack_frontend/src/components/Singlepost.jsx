import React, { useEffect, useState } from "react";
import { client, urlfor } from "../client";
import { IoIosCloudDownload } from "react-icons/io";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { ImBin } from "react-icons/im";
import { userls } from "../utils/lsuserdata";
import { v4 as uuidv4 } from "uuid";
import { json, Link, useNavigate } from "react-router-dom";
import { postQuery } from "../utils/datafromsanity";

const Singlepost = ({ postdata,fetchingposts }) => {
  const navigate = useNavigate();
  const userlsdata = userls();
  const [loading, setLoading] = useState(false);
  const [hovered, sethovered] = useState(false);
  const [showliked, setshowliked] = useState(false );
  const [iswithoutcursor, setiswithoutcursor] = useState(false)
  const { image, postedBy, _id, title, like } = postdata;

  const isliked = !!like?.filter((l) => l.postedBy._id === userlsdata.sub)
    ?.length;

useEffect(()=>{
  if(window.innerWidth < 820){
    setiswithoutcursor(true)
  }
},[])

useEffect(() => {
  if(isliked) return setshowliked(true)  

}, [showliked])


  const saving = (id) => {
    if (!isliked) {
      client
        .patch(id)
        .setIfMissing({ like: [] })
        .insert("after", "like[-1]", [
          {
            _key:  uuidv4(),
            userid: userlsdata.sub,
            postedBy: {
              _ref: userlsdata.sub,
              _type: "postedBy",
            },
          },
        ])
        .commit().then(()=>{
          fetchingposts()
        })
    }
  };



  const deletepost = (id) => {
    const confirmation= confirm('Are You Sure You Want To Delete This Post?')
if(confirmation){
    client.delete(id).then(() => {
      
      // window.location.reload();
      fetchingposts()
      alert('your post will be deleted soon')
    });}
  };

  if (loading) return "loading...";

  return (
    <div className="w-full">
      <div
        className="relative hover:shadow-lg cursor-zoom-in  overflow-hidden transition-all duration-500 ease-in-out w-auto"
        onMouseEnter={() => sethovered(true)}
        onMouseLeave={() => sethovered(false)}
        onClick={() => navigate(`/postdetails/${_id}`)}
      >
        <div className="">
          {" "}
          <img
            src={urlfor(image?.asset?.url).width(250).url()}
            alt="post"
            className="rounded-lg w-full "
          />
        </div>
        {!iswithoutcursor && hovered && (
          <div className="absolute  flex flex-col top-0 bottom-0 left-0 right-0 justify-between px-2 py-2 z-50 ">
            <div className="flex justify-between ">
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white opacity-70 flex justify-center items-center h-10 w-10 rounded-full hover:opacity-100 cursor-pointer"
              >
                <a href={`${image?.asset?.url}?dl=`} download>
                  <IoIosCloudDownload fontSize={20} />
                </a>
              </div>
              {!showliked ? (
                <div
                  className="pt-2 cursor-pointer"
                  onClick={(e) => {
                    saving(_id);
                    setshowliked(true)
                    e.stopPropagation();
                    return
                  }}
                >
                  <FcLikePlaceholder fontSize={20} />
                </div>
              ) : (
                <div
                  className="pt-2 cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FcLike fontSize={20} />
                </div>
              )}
            </div>
            <div className="flex w-full justify-between">
              <div className="flex justify-center  bg-gray-600 opacity-90 hover:opacity-100 rounded-md">
                <div className="text-black py-2 px-2  font-semibold ">
                  {title}
                </div>
              </div>
              {postedBy?._id === userlsdata?.sub && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    deletepost(_id);
                  }}
                  className="flex justify-center  items-center bg-red-500 opacity-80 hover:opacity-100 h-10 rounded-full w-10 cursor-pointer"
                >
                  <ImBin fontSize={20} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
<div className="flex justify-between py-4 pb-10 px-1  items-center">
      <Link to={`/userprofile/${postedBy?._id}`}>
        {" "}
        <div className="flex gap-2 justify-start items-center">
          <div>
            <img src={postedBy?.pp} alt="user" className="rounded-full h-8" />
          </div>
          <div className="text-base">{postedBy?.userName}</div>
        </div>
      </Link>
{iswithoutcursor && <div className="flex justify-between gap-2 items-center">

      {postedBy?._id === userlsdata?.sub && (
                <div
                  onClick={(e) => {
                    deletepost(_id);
                  }}
                  className="flex justify-center  items-center  w-5 "
                >
                  <ImBin fontSize={20} />
                </div>
              )}

{!showliked ? (
                <div
                  className=" flex justify-center items-center cursor-pointer"
                  onClick={(e) => {
                    saving(_id);
                    setshowliked(true)
                    return
                  }}
                >
                  <FcLikePlaceholder fontSize={20} />
                </div>
              ) : (
                <div
                  className=" flex justify-center items-center cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FcLike fontSize={20} />
                </div>
              )}
</div>}

      </div>
    </div>
  );
};

export default Singlepost;
