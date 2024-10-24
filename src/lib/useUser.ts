import { create } from "zustand";

// Define the store's state and actions
interface UserState {
  name: string;
  username: string;
  profilePic: string | null;
  setName: (name: string) => void;
  setUsername: (username: string) => void;
  setProfilePic: (profilePic: string | null) => void;
}

// Function to load data from localStorage
const loadFromStorage = () => {
  if (typeof window !== "undefined") {
    const storedName = localStorage.getItem("name") || "";
    const storedUsername = localStorage.getItem("username") || "";
    const storedProfilePic = localStorage.getItem("profilePic") || "";
    return {
      name: storedName,
      username: storedUsername,
      profilePic: storedProfilePic,
    };
  } else {
    return {
      name: "",
      username: "",
      profilePic: null,
    };
  }
};

// Create the Zustand store
export const useUser = create<UserState>((set) => ({
  ...loadFromStorage(),
  setName: (name) => set({ name }),
  setUsername: (username) => set({ username }),
  setProfilePic: (profilePic) => set({ profilePic }),
}));
