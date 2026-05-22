import { create } from 'zustand'

interface UIState {
  isSidebarTransitioning: boolean
  setIsSidebarTransitioning: (isTransitioning: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarTransitioning: false,
  setIsSidebarTransitioning: (isTransitioning) => set({ isSidebarTransitioning: isTransitioning }),
}))