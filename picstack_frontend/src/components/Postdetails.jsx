import React, { useEffect, useState } from "react";
import { FcLike } from "react-icons/fc";
import { IoIosCloudDownload, IoIosPaperPlane } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { client, urlfor } from "../client";
import { detailsQuery, indetailsmorepinQuery } from "../utils/datafromsanity";
import { userls } from "../utils/lsuserdata";
import Spinner from "./Spinner";
import { v4 as uuidv4 } from "uuid";
import Masonrylayout from "./Masonrylayout";

const Postdetails = () => {
  const [details, setdetails] = useState([]);
  const [cm, setcm] = useState("");
  const [sendingcom, setSendingcom] = useState(false)
  const [morepins, setMorepins] = useState([])
  const { postId } = useParams();
  // console.log(postId);

  const userlsdata = userls();

const fetchingpostdetails=()=>{
  client.fetch(detailsQuery(postId)).then((response) => {
    setdetails(response[0]);
    
      client.fetch(indetailsmorepinQuery(response[0])).then((res)=>{setMorepins(res)})
  });

}
  useEffect(() => {
    fetchingpostdetails()
    // console.log(details);
  }, [postId]);
  // console.log(details);
  const { about, category, _id, comments, image, like, postedBy, title } =
    details;

  const handlecomment = () => {
    if(cm){
      setSendingcom(true)
    client
      .patch(_id)
      .setIfMissing({ comments: [] })
      .insert("after", "comments[-1]", [
        {
          _key: uuidv4(),
          comment: cm,
          postedBy: {
            _ref: userlsdata?.sub,
            _type: "postedBy",
          },
        },
      ])
      .commit()
      .then(()=>{
        fetchingpostdetails()
        setcm('')
       
          window.location.reload()
          setSendingcom(false)
      
      });}
  };

  if (!details) return <Spinner />;

  // console.log(urlfor(image?.asset?.url).url());
  return (
    <div className=" ">
      <div className="flex  flex-col items-center">
        <div className="md:mx-0 mx-auto rounded-md overflow-hidden">
          <img
            src={details?.image && urlfor(details?.image).url()}
            alt=""
            className="w-auto"
          />
        </div>
        <div className="flex w-full flex-col">
          <div className="flex justify-between flex-row items-center">
            <div className="bg-gray-600 text-white  opacity-70 flex justify-center items-center h-5 w-5 rounded-full hover:opacity-100 cursor-pointer">
              <a href={`${image?.asset?.url}?dl=`} download>
                <IoIosCloudDownload fontSize={13} />
              </a>
            </div>
            <div className="flex justify-center items-center gap-1">
              <FcLike fontSize={20} />
              {like?.length}
            </div>
            <div className="pt-1">
              <div className="text-sm font-semibold  text-gray-600">
                Category
              </div>
              <div className="text-xl font-semibold">{category}</div>
            </div>
          </div>

          <div className="flex gap-3 mt-4 pl-3 my-4 border-l-2 border-black flex-col">
            <div className="text-5xl capitalize">{title}</div>
            <div className="capitalize">{about}</div>
          </div>

          <div className="pt-5">
            <div className="text-2xl py-1">PostedBy</div>
            <Link
              to={`/userprofile/${postedBy?._id}`}
              className="flex gap-2 justify-start items-center"
            >
              <div className="h-10  w-10 rounded-full overflow-hidden ">
                <img src={postedBy?.pp} alt="" />
              </div>
              <div className="text-xl font-semibold">{postedBy?.userName}</div>
            </Link>
          </div>
          <div>
            <div className="text-2xl pb-2 pt-4">Comments</div>
            {comments?.length == null ? (
              <div className="flex flex-col justify-center items-center text-gray-500 py-10 text-xl">
                <div>No Comments Found </div>
                <div>Be First One To Comment</div>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                {comments?.map((c) => (
                  <div key={c._key} className="flex h-10 gap-3 justify-start items-center">
                    <Link to={`/userprofile/${c?.postedBy?._id}`} className="h-10 w-10 rounded-full overflow-hidden">
                      <img src={c?.postedBy?.pp} alt="" />
                    </Link>
                    <div>
                      <div className="text-xs font-medium">{c?.postedBy?.userName}</div>
                      <div className="font-light">{c?.comment}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) }
               {sendingcom && <div><Spinner/></div>}

            <div className="flex justify-between gap-2  py-3 items-center">
              <Link to={`/userprofile/${userlsdata?.sub}`} className="md:h-14 md:w-14 flex justify-center items-center h-9 w-9 ">
                <img src={userlsdata?.picture} alt="" className="rounded-full"/>
              </Link>
              <div className="md:w-[90%] w-[80%] shadow-lg rounded-3xl overflow-hidden md:text-lg">
                <input
                  onChange={(e) => setcm(e.target.value)}
                  className="w-full border-none outline-none  md:p-3 py-1 px-2.5 md:px-5"
                  type="text"
                  value={cm}
                  placeholder="Comment...."
                />
              </div>
              <button
                className="bg-teal-400 md:h-14 md:w-14  h-9 w-9 flex justify-center items-center overflow-hidden rounded-full hover:shadow-2xl cursor-pointer"
                onClick={() => {
                  handlecomment();
                }}
              >
                <IoIosPaperPlane fontSize={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <hr className="py-6"/> 
          <div className="flex justify-center mb-9 items-center"> <h2 className="text-2xl  font-semibold">More Posts Like This</h2></div>
           {morepins.length > 0 ? (
            <Masonrylayout postsdata={morepins}/>
           ):(<div className="py-10"><Spinner message="No Related Post Found"/></div>) }
      </div>
    </div>
  );
};

export default Postdetails;
