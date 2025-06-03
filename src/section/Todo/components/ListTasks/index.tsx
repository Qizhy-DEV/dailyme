import React, { useEffect, useState } from 'react';
import TableList from './components/TableList';
import { Task, useTaskStore } from '@src/components/providers/TaskProvider';
import { defaultPagination } from '@src/core/constants/pagination';
import { toast } from 'sonner';
import useTasksQuery, { Pagination } from '@src/api/todo/queries/useTasksQuery';

interface Props {
  onConfirmDeleteTask: (task: Task) => void;
}

const ListTasks = ({ onConfirmDeleteTask }: Props) => {
  const limit = useTaskStore(state => state.limit);

  const filter = useTaskStore(state => state.filter);

  const page = useTaskStore(state => state.page);

  const [pagination, setPagination] = useState<Pagination>(defaultPagination);

  const { data, isLoading } = useTasksQuery({
    filter,
    limit,
    page,
    onError: error => {
      toast('Error', { description: error.message });
    },
  });

  useEffect(() => {
    if (data?.data.pagination) {
      setPagination(data.data.pagination);
    }
  }, [data?.data.pagination]);

  return (
    <div className="w-full min-h-[400px] flex flex-col gap-2 justify-between">
      <TableList
        onConfirmDeleteTask={onConfirmDeleteTask}
        tasks={data?.data.data || []}
        isLoading={isLoading}
        pagination={pagination}
      />
    </div>
  );
};

export default ListTasks;
