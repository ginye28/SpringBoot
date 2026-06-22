import { useMutation, useQueryClient } from "@tanstack/react-query"
import { registerTodo, updateCompletion } from "../../api/todoApis";

export const useTodoRegisterMutation = () => {

    return useMutation({
        mutationFn: (data) => registerTodo(data),
        onSuccess: (response) => {
            
        },
        onError: (error) => {
            alert(error.message);
        }
    });

}

export const useTodoCompleteMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => updateCompletion(data),
        onSuccess: (response) => {
            queryClient.invalidateQueries(["todoList"])
        },
        onError: (error) => {
            alert(error.message);
        }
    });
}