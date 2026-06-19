import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getCategoriesRequest, getCategoryColorsAndIcons, getNotCompletedCount } from "../../api/categoryApis";

export const useCategories = () => {

    return useQuery({
        queryKey: ["categories"],
        queryFn: getCategoriesRequest,
        staleTime: 1000 * 60 * 60 * 24, 
        gcTime: 1000 * 60 * 60 * 24, 
    });
}

export const useCategoryColorsAndIcons = () => {
    return useQuery({
        queryKey: ["categoryColorsAndIcons"],
        queryFn: getCategoryColorsAndIcons,
        staleTime: 1000 * 60 * 60 * 24, 
        gcTime: 1000 * 60 * 60 * 24, 
    });
}

export const useCategoryNotCompletedCount = () => {
    return useQuery({
        queryKey: ["categoryNotCompletedCount"],
        queryFn: getNotCompletedCount,
        staleTime: 1000 * 60 * 60 * 24, 
        gcTime: 1000 * 60 * 60 * 24, 
    });
}