import React from "react";
import dpImg from "/dp.png";

const PostFirstPage = ({ title }) => {
  return (
    <section className="bgImg relative flex items-center justify-around text-center flex-col text-white bg-background p-10 px-12 overflow-hidden printSection">
      <div className="font-bold text-4xl leading-normal">{title}</div>
      <div className="text-center flex flex-col justify-center items-center gap-2">
        <h6 className="mb-1 text-white/70">Follow</h6>
        <img src={dpImg} className="h-16 w-16 rounded-full" alt="" />
        <h4 className="text-center font-bold text-xl">chetan khulage</h4>
        <h6 className="-mt-1 text-white/70">for more content like this</h6>
      </div>
      <div className="absolute bottom-2 left-3 flex gap-4 text-white/70">
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

export default PostFirstPage;
