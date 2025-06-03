import { Task } from '@src/components/providers/TaskProvider';
import { callApi, ResponseData } from '@src/core/config/axios/handler';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface DeleteTaskInput {
  onSuccess: (data: ResponseData<Task>) => void;
  onError: (error: Error) => void;
}

const useDeleteTaskMutation = ({ onSuccess, onError }: DeleteTaskInput) => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation<ResponseData<Task>, AxiosError, string>({
    mutationFn: async id => {
      const res = await callApi<Task>({
        endpoint: `/tasks/${id}`,
        method: 'DELETE',
      });
      return res;
    },
    onError,
    onSuccess,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });
  return { isPending, mutateAsync };
};

export default useDeleteTaskMutation;
