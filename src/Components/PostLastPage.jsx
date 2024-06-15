import React from "react";
import dpImg from "/dp.png";

const PostLastPage = () => {
  return (
    <section className="bgImg relative flex items-center text-center flex-col text-white bg-background p-10 px-12 overflow-hidden printSection">
      <div className="text-center flex flex-col justify-center mt-20 items-center gap-2">
        <h6 className="mb-1 text-2xl text-white/70">Follow</h6>
        <img src={dpImg} className="h-20 w-20 rounded-full" alt="" />
        <h4 className="text-center font-bold text-3xl">chetan khulage</h4>
        <h6 className="-mt-1 text-white/70 text-2xl">
          for more content like this
        </h6>
      </div>
      <div className="absolute bottom-5 left-6 flex flex-col gap-2 text-white/70">
        <div className="flex items-center gap-2">
          <i className="fa-regular fa-thumbs-up"></i> <span>Like</span>
        </div>
        <div className="flex items-center gap-2">
          <i className="fa-regular fa-comment"></i> <span>Comment</span>
        </div>
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-retweet"></i> <span>Repost</span>
        </div>
        <div className="flex items-center gap-2">
          <i className="fa-regular fa-paper-plane"></i> <span>Share</span>
        </div>
      </div>
    </section>
  );
};

export default PostLastPage;
