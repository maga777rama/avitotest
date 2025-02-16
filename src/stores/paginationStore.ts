import { create } from "zustand/react";
import { persist } from "zustand/middleware";

export interface IPaginationStore {
    page: number;
    setPage: (page: number) => void;
}

export const usePaginationStore = create<IPaginationStore>()(
    persist(
        (set) => ({
            page: 1,
            setPage: (newPage) => {
                set({ page: newPage });
            },
        }),
        { name: "paginationData" },
    ),
);
