import { Task } from '@src/components/providers/TaskProvider';
import { callApi, ResponseData } from '@src/core/config/axios/handler';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface AddTaskInput {
  onSuccess: (data: ResponseData<Task>) => void;
  onError: (error: Error) => void;
}

type CreateTaskPayload = Omit<Task, 'isComplete' | 'id'>;

const useAddTaskMutation = ({ onSuccess, onError }: AddTaskInput) => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation<ResponseData<Task>, AxiosError, CreateTaskPayload>(
    {
      mutationFn: async task => {
        const res = await callApi<Task>({
          endpoint: '/tasks',
          method: 'POST',
          data: task,
        });
        return res;
      },
      onError,
      onSuccess,
      onSettled: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
    }
  );

  return { mutateAsync, isPending };
};

export default useAddTaskMutation;
