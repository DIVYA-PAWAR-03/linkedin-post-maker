// src/useStore.ts
import { create } from "zustand";
import { PostData } from "./types";

interface PostState {
  contentObject: PostData;
  setContentObject: (newContent: PostData) => void;
}

const usePost = create<PostState>((set) => ({
  contentObject: {
    title: "",
    description: "",
    hashtags: [],
    content: [],
  },
  setContentObject: (newContent: PostData) =>
    set({ contentObject: newContent }),
}));

export default usePost;
