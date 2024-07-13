import { create } from "zustand";

type CoverImageStore = {
  url?: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onReplace: (url: string) => void;
};
//url undifined bcz when user opens the modal user will not be confused with prev img 
export const useCoverImage = create<CoverImageStore>((set) => ({
  //url is explicitly undefined
  url: undefined,
  isOpen: false,

  //onOpen and onClose are used to manage the modal's visibility and reset the URL.
  onOpen: () => set({ isOpen: true, url: undefined }),
  onClose: () => set({ isOpen: false, url: undefined }),

  //onReplace is used to open the modal and set the URL to the new image that needs to be replaced.
  onReplace: (url: string) => set({ isOpen: true, url }),
}));