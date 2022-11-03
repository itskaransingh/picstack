import React from "react";
import share from "../assets/share.mp4";
import { GoogleLogin } from "@react-oauth/google";
import pic from "../assets/PIC-removebg-preview.png";
import jwt_decode from "jwt-decode";
import {client} from '../client';
import {useNavigate} from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";


const Login = () => {
 const navigate=useNavigate()

  const responseGoogle = (response) => {
    // console.log(response);
    const decoded = jwt_decode(response.credential);
    // console.log(decoded);
    const{name,picture,sub}=decoded
   
    localStorage.setItem("user",JSON.stringify({name,picture,sub}))

    // console.log(user);

   const docs={
    _id:sub,
    _type:"user",
    userName:name,
    pp:picture,
   }
   

   client.createIfNotExists(docs).then(()=>{
    navigate('/',{replace:true})
  })
 
  };
  return (
    <div className=" md:h-screen  h-[92.2vh] w-screen  flex flex-col justify-center  items-start">
      <div className="relative h-full w-full">
        <video
          src={share}
          className="h-full object-cover   w-full "
          autoPlay
          type="video/mp4"
          controls={false}
          muted
          loop
        />
      </div>
      <div className="top-0 bottom-0 left-0 right-0  flex flex-col justify-center items-center bg-[rgba(0,0,0,0.7)] absolute ">
      
        <div className="text-2xl py-2 font-semibold " >
        <span className="text-pink-600">Pic</span>
        <span className="text-orange-500">Stack</span>
      </div>
     <div className="text-white text-xl pb-5 font-bold">Developed By Karan Singh</div>
        <div className="  ">
          <GoogleLogin    
            render={(renderProps) => (
              <button
                type="button"
                className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <FcGoogle className="mr-4" /> Sign in with google
              </button>
            )}      
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy="single_host_origin"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
