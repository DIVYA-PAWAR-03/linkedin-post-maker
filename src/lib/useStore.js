// src/useStore.js
import { create } from 'zustand';

const useStore = create((set) => ({
    contentObject: '',
    codeTextSize: 16,
    setContentObject: (newContent) => set({ contentObject: newContent }),
    setCodeTextSize: (newContent) => set({ codeTextSize: newContent }),
}));

export default useStore;
