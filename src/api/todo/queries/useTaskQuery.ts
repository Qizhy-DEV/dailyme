import { Task } from '@src/components/providers/TaskProvider';
import { callApi, ResponseData } from '@src/core/config/axios/handler';
import { useQuery } from '@tanstack/react-query';
import { Pagination } from './useTasksQuery';

interface TaskQueryInput {
  onError?: (error: Error) => void;
  id: string;
  enabled?: boolean;
}

export interface PaginatedData<T> {
  data: T;
  pagination: Pagination;
}

const useTaskQuery = ({ onError, id, enabled = true }: TaskQueryInput) => {
  return useQuery<ResponseData<Task>>({
    queryKey: ['tasks', { taskId: id }],
    queryFn: async () => {
      const res = await callApi<Task>({
        endpoint: `tasks/${id}`,
        method: 'GET',
      });
      return res;
    },
    throwOnError: error => {
      onError?.(error);
      return false;
    },
    retry: false,
    gcTime: Infinity,
    enabled: enabled,
  });
};

export default useTaskQuery;
