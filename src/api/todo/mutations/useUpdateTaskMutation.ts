import { Task } from '@src/components/providers/TaskProvider';
import { callApi, ResponseData } from '@src/core/config/axios/handler';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface UpdateTaskInput {
  onSuccess: (data: ResponseData<Task>) => void;
  onError: (error: Error) => void;
}

const useUpdateTaskMutation = ({ onSuccess, onError }: UpdateTaskInput) => {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation<ResponseData<Task>, AxiosError, Task>({
    mutationFn: async task => {
      const res = await callApi<Task>({
        endpoint: `/tasks/${task.id}`,
        method: 'PUT',
        data: task,
      });
      return res;
    },
    onError,
    onSuccess,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  return { isPending, mutateAsync };
};

export default useUpdateTaskMutation;
