import React, { useEffect, useState } from "react";
import { Sidebar,UserProfile,Posts } from "../components";
import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { userQuery } from "../utils/datafromsanity";
import { client } from "../client";
import { Link,Routes,Route, useParams, useNavigate } from "react-router-dom";
import { userls } from "../utils/lsuserdata";


const Home = () => {
  const [menutoggle, setmenutoggle] = useState(false);
  const [userdata, setuserdata] = useState();
  const navigate = useNavigate()
  const param=useParams()

 const userlocal=userls()

 useEffect(()=>{
if( userlocal == undefined ) {
  navigate('/login')
}
 },[])

 useEffect(()=>{
scrollTo(0, 0)
 },[param])

  useEffect(() => {
    const query = userQuery(userlocal?.sub);
    client.fetch(query).then((data) => {
      setuserdata(data[0]);
    });
  }, []);

  return (
    <div className="flex flex-initial md:flex-row  flex-col">
      <div className="md:w-[20%]  md:flex hidden  pl-2 pt-2">
        <div className="fixed w-[15%] ">
        <Sidebar user={userdata && userdata}/>

        </div>
      </div>
      <div className="md:hidden">
        <div className="flex justify-between items-center shadow-sm p-2">
          <div onClick={() => setmenutoggle(true)}>
            <FiMenu fontSize={25} />
          </div>
          <div>
          <Link to={'/'}> <div className="text-2xl py-2 font-semibold " >
        <span className="text-pink-600">Pic</span>
        <span className="text-orange-500">Stack</span>
      </div></Link>
          </div>
          <div>
            <Link to={`userprofile/${userdata?._id}`}>
              <img src={userdata?.pp} alt="user" className="w-8" />
            </Link>
          </div>
        </div>
      </div>
      {menutoggle && (
        <div className="h-screen z-50 fixed pl-3 py-2 bg-white animate-slide-in shadow-lg w-5/6">
          <div
            className="absolute right-1 top-3"
            onClick={() => setmenutoggle(false)}
          >
            <AiFillCloseCircle fontSize={25} />
          </div>
          <Sidebar user={userdata && userdata} toggelsidebar={setmenutoggle}/>
        </div>
      )}
      <div className="md:w-[110%] ">
       <Routes>
        <Route  path="/userprofile/:userId" element={<UserProfile />} />
        <Route  path="/*" element={<Posts user={userdata && userdata}/>} />
       </Routes>
      </div>
    </div>
  );
  
};

export default Home;
