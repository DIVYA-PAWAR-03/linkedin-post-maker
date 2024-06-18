// src/useStore.js
import { create } from 'zustand';

const useStore = create((set) => ({
    contentObject: '',
    setContentObject: (newContent) => set({ contentObject: newContent })
}));

export default useStore;
