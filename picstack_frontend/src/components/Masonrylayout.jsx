import React from "react";
import Masonry from "react-masonry-css";
import Singlepost from "./Singlepost";

const Masonrylayout = ({ postsdata,fetchingposts }) => {
  const breakpointColumnsObj = {
    3000: 6,
    2000: 5,
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className=" flex gap-7  animate-slide-fwd "
    >
      {postsdata && 
          (postsdata.length == 0 ? (
            <div className="flex justify-center  items-center ">
              <div className="text-gray-400 text-6xl md:p-40 p-20">No Posts Found</div>
            </div>
          ) : (
            postsdata?.map((sp, i) => (
          sp && <Singlepost postdata={sp} key={i} fetchingposts={fetchingposts}  className="w-max" />
            ))
          ))
       }
    </Masonry>
  );
};

export default Masonrylayout;
