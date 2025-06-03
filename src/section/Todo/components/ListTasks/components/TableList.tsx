/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@src/components/ui/checkbox';
import { ArrowUpDown, Pen, Trash } from 'lucide-react';
import { Task, useTaskStore } from '@src/components/providers/TaskProvider';
import { toast } from 'sonner';
import { Spinner } from '@src/components/ui-custom/spinner';
import { useRouter } from 'next/navigation';
import TableCustomize from '@src/components/ui-custom/table';
import { priorityColors } from '@src/core/constants/priority';
import { Option, SelectCustomize } from '@src/components/ui-custom/select';
import { toUpperCaseFirstCharacter } from '@src/lib/utils';
import DropdownCustomize from '@src/components/ui-custom/dropdown';
import useUpdateTaskMutation from '@src/api/todo/mutations/useUpdateTaskMutation';
import { Pagination } from '@src/api/todo/queries/useTasksQuery';

interface Props {
  onConfirmDeleteTask: (task: Task) => void;
  tasks: Task[] | undefined;
  isLoading: boolean;
  pagination: Pagination;
}

const TableList = ({ onConfirmDeleteTask, tasks = [], isLoading, pagination }: Props) => {
  const router = useRouter();

  const setLimit = useTaskStore(state => state.setLimit);

  const setPage = useTaskStore(state => state.setPage);

  const statusOptions: Option[] = [
    {
      label: 'Success',
      value: 'true',
    },
    {
      label: 'Pending',
      value: 'false',
    },
  ];

  const columns: ColumnDef<Task>[] = [
    {
      id: 'select',
      header: () => <Checkbox className="bg-[white] shadow-sm" />,
      cell: () => <Checkbox className="bg-[white] shadow-sm" />,
    },
    {
      id: 'title',
      header: ({ column }) => {
        return (
          <div className="flex items-center gap-2">
            Title
            <ArrowUpDown
              className="h-4 w-4 cursor-pointer"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            />
          </div>
        );
      },
      accessorKey: 'title',
      cell: ({ getValue }) => getValue(),
    },
    {
      id: 'description',
      header: ({ column }) => {
        return (
          <div className="flex items-center gap-2">
            Subcription
            <ArrowUpDown
              className="h-4 w-4 cursor-pointer"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            />
          </div>
        );
      },
      accessorKey: 'subtitle',
    },
    {
      id: 'priority',
      header: 'Priority',
      accessorKey: 'level',
      meta: {
        classNameCell: 'flex translate-y-2',
      },
      cell: ({ row }) => {
        const task = row.original;
        return (
          <div
            style={{
              color: priorityColors[task.level].text,
              backgroundColor: priorityColors[task.level].bg,
            }}
            className="text-xs font-medium px-2 py-1 rounded-sm"
          >
            {toUpperCaseFirstCharacter(task.level)}
          </div>
        );
      },
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'isComplete',
      cell: ({ row }) => {
        const task = row.original;
        const SelectStatus = () => {
          const { mutateAsync: updateTask, isPending: isUpdating } = useUpdateTaskMutation({
            onError: error => toast('Error', { description: error.message }),
            onSuccess: data => {
              toast('Success', { description: data.message });
            },
          });
          if (isUpdating) {
            return (
              <div className="w-full h-[36px] flex items-center justify-center aspect-square">
                <Spinner className="w-5" />
              </div>
            );
          }
          return (
            <SelectCustomize
              onChange={value => {
                const isComplete = value === 'true';
                updateTask({ ...task, isComplete });
              }}
              value={task.isComplete + ''}
              options={statusOptions}
            />
          );
        };

        return <SelectStatus />;
      },
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => {
        const task = row.original;
        return (
          <DropdownCustomize
            items={[
              {
                label: 'Edit',
                icon: <Pen className="w-4 h-4" />,
                onClick: () => router.push(`/todo/update/${task.id}`),
              },
              {
                label: 'Delete',
                icon: <Trash className="w-4 h-4" />,
                onClick: () => onConfirmDeleteTask(task),
              },
            ]}
          />
        );
      },
    },
  ];

  return (
    <TableCustomize
      data={tasks}
      columns={columns}
      isLoading={isLoading}
      pagination={{
        ...pagination,
        setLimit: limit => setLimit(limit),
        setPage: page => setPage(page),
      }}
    />
  );
};

export default TableList;
