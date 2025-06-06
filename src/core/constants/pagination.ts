import { Pagination } from '@src/api/todo/queries/useTasksQuery';

export const defaultPagination: Pagination = {
  page: 0,
  limit: 0,
  total: 0,
  hasNextPage: false,
  hasPreviousPage: false,
  totalPages: 0,
};
