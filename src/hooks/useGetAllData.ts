import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getData } from "../api/api.ts";

export const useGetAllData = () => {
    return useQuery({
        queryKey: ["items"],
        queryFn: () => getData(),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
        enabled: true,
    });
};
