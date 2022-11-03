import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { client, urlfor } from "../client";
import {
  createdpostQuery,
  likedpostQuery,
  userQuery,
} from "../utils/datafromsanity";
import { userls } from "../utils/lsuserdata";
import Masonrylayout from "./Masonrylayout";
import Spinner from "./Spinner";
import { FiLogOut } from "react-icons/fi";

const UserProfile = () => {
  // console.log(user)
  const [user, setUser] = useState([]);
  const [crposts, setCrposts] = useState([]);
  const [lkposts, setLkposts] = useState([]);
  const [created, setcreated] = useState(true);
  const [liked, setliked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isuser, setIsuser] = useState(true);
  const { userId } = useParams();

  const userlsdata = userls();

  const navigate = useNavigate();

  useEffect(() => {
    if (userId !== userlsdata?.sub) {
      setIsuser(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    client
      .fetch(userQuery(userId))
      .then((result) => {
        setUser(result[0]);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    setLoading(true);

    if (created) {
      client.fetch(createdpostQuery(userId)).then((res) => {
        setCrposts(res);
      });
    } else {
      client.fetch(likedpostQuery(userId)).then((res) => {
        setLkposts(res);
      });
    }
    setLoading(false);
  }, [created]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (loading) return <Spinner message="Loading" />;
  const randomimage =
    "https://source.unsplash.com/1600x900/?nature,photography,technology";

  const activeclassname =
    "bg-red-500 px-4 py-1 rounded-2xl cursor-pointer shadow-xl";
  const notactiveclassname = "cursor-pointer px-4 py-1";
  return (
    <div>
      <div className="flex flex-col">
        <div className="h-340  relative">
          <img
            src={randomimage}
            alt=""
            className="object-cover h-full  w-full"
          />
          {isuser && (
            <div
              className="absolute rounded-full  p-2 top-2 md:right-4 right-2 bg-white text-red-400 cursor-pointer"
              onClick={() => {
                logout();
              }}
            >
              <FiLogOut fontSize={25} />
            </div>
          )}
        </div>
        <div className="flex flex-col items-center">
          <div className="h-20 w-20 object-cover rounded-full z-10 shadow-xl -mt-10 overflow-hidden ">
            <img src={user?.pp} alt="user" />
          </div>
          <div className="text-xl font-bold pt-2 capitalize">
            {user?.userName}
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex my-10 justify-center font-semibold items-center gap-5">
          <div
            className={created ? activeclassname : notactiveclassname}
            onClick={() => {
              setcreated(!created);
              setliked(!liked);
            }}
          >
            Created
          </div>
          <div
            className={liked ? activeclassname : notactiveclassname}
            onClick={() => {
              setcreated(!created);
              setliked(!liked);
            }}
          >
            Liked
          </div>
        </div>
        <div className="px-5">
          {<Masonrylayout postsdata={created ? crposts : lkposts} />}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
