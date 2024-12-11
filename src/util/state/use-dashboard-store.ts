import { create } from "zustand";

interface DashboardState {
    list: {
        date: Date;
        id: number;
        userId: string;
        name: string;
        hostName: string;
        location: string;
        note: string | null;
        publicGuestList: boolean;
        numGuests: number;
    }[];
    alteredList: {
        date: Date;
        id: number;
        userId: string;
        name: string;
        hostName: string;
        location: string;
        note: string | null;
        publicGuestList: boolean;
        numGuests: number;
    }[];
    alterList: (list: {
        search?: string;
        sort?: "alphabetically" | "date";
    }) => void;
    makeList: (
        list: {
            date: Date;
            id: number;
            userId: string;
            name: string;
            hostName: string;
            location: string;
            note: string | null;
            publicGuestList: boolean;
            numGuests: number;
        }[],
    ) => void;
}

const useDashboardStore = create<DashboardState>()((set, get) => ({
    list: [],
    alteredList: [],
    alterList: ({ search, sort }) =>
        set((state) => {
            let alteredList = state.list;
            if (search)
                alteredList = alteredList.filter((event) =>
                    event.name
                        .toLowerCase()
                        .includes(search.trim().toLowerCase()),
                );
            if (sort)
                alteredList = alteredList.sort((a, b) => {
                    if (sort === "alphabetically") {
                        return a.name.localeCompare(b.name);
                    }
                    return (
                        new Date(a.date).getTime() - new Date(b.date).getTime()
                    );
                });

            return {
                ...state,
                alteredList,
            };
        }),
    makeList: (list) => {
        set((state) => ({
            ...state,
            list,
        }));
        console.log("STATE LIST", get().list);
        get().alterList({ sort: "alphabetically" });
        console.log("STATE ALTERED LIST", get().alteredList);
    },
}));

export default useDashboardStore;
