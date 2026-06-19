import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteCategory, registerCategory } from "../../api/categoryApis"

export const useCategoryRegisterMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        
        mutationFn: (data) => {
            return registerCategory(data)
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries(["categories"]);
            queryClient.invalidateQueries(["categoryNotCompletedCount"]);
        },
        onError: (error) => {
            alert(error.message);
        }
    })
}

export const useCategoryDeleteMutation = (id) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => {
            return deleteCategory(id)
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries(["categories"]);
            queryClient.invalidateQueries(["categoryNotCompletedCount"]);
        },
        onError: (error) => {
            alert(error.message);
        }
    })
    
}