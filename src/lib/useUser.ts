import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the store's state and actions
interface UserState {
  name: string | null;
  username: string | null;
  profilePic: string | null;
  setName: (name: string | null) => void;
  setUsername: (username: string | null) => void;
  setProfilePic: (profilePic: string | null) => void;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

// Create the Zustand store with persist middleware
export const useUser = create<UserState>()(
  persist(
    (set) => ({
      name: "",
      username: "",
      profilePic: "",
      hasHydrated: false,
      setName: (name) => {
        set({ name });
        if (typeof window !== "undefined") {
          localStorage.setItem("name", name || "");
        }
      },
      setUsername: (username) => {
        set({ username });
        if (typeof window !== "undefined") {
          localStorage.setItem("username", username || "");
        }
      },
      setProfilePic: (profilePic) => {
        set({ profilePic });
        if (typeof window !== "undefined") {
          localStorage.setItem("profilePic", profilePic || "");
        }
      },
      setHasHydrated: (state) => {
        set({
          hasHydrated: state,
        });
      },
    }),
    {
      name: "user-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
