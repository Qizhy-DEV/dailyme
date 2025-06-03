import { Task, TaskFilter } from '@src/components/providers/TaskProvider';
import { callApi, ResponseData } from '@src/core/config/axios/handler';
import { useQuery } from '@tanstack/react-query';

interface TaskQueryInput {
  onError: (error: Error) => void;
  limit: number;
  page: number;
  filter: TaskFilter;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedData<T> {
  data: T;
  pagination: Pagination;
}

const useTasksQuery = ({ onError, limit, page, filter }: TaskQueryInput) => {
  return useQuery<ResponseData<PaginatedData<Task[]>>>({
    queryKey: ['tasks', { limit, page, filter }],
    queryFn: async () => {
      const res = await callApi<PaginatedData<Task[]>>({
        endpoint: `tasks?page=${page}&filter=${filter}&limit=${limit}`,
        method: 'GET',
      });
      return res;
    },
    throwOnError: error => {
      onError(error);
      return false;
    },
    retry: false,
    gcTime: Infinity,
  });
};

export default useTasksQuery;
