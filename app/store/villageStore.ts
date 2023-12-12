import { Village } from "@/db/schema";
import { create } from "zustand";

interface VillageStore {
  selectedVillage: Village | undefined;
  setSelectedVillage: (village: Village) => void;
}

export const useVillageStore = create<VillageStore>((set) => ({
  selectedVillage: undefined,
  setSelectedVillage: (village) => set(() => ({ selectedVillage: village })),
}));
