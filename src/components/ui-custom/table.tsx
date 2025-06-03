/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Skeleton } from '../ui/skeleton';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';
import { Pagination as PaginationInterface } from '@src/api/todo/queries/useTasksQuery';
import { cn } from '@src/lib/utils';
import { Option, SelectCustomize } from './select';

export interface PaginationManagement extends PaginationInterface {
  setLimit: (limit: number) => void;
  setPage: (page: number) => void;
}

export interface Props {
  isLoading?: boolean;
  columns: ColumnDef<any, any>[];
  data: any[];
  pagination: PaginationManagement;
}

const TableCustomize = ({ columns, data, isLoading, pagination }: Props) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const options: Option[] = [
    {
      label: '6',
      value: '6',
    },
    {
      label: '8',
      value: '8',
    },
    {
      label: '10',
      value: '10',
    },
  ];

  const { limit, setLimit, page, setPage } = pagination;

  return (
    <div className="flex-1 flex flex-col gap-2 h-full">
      <div className="flex-1">
        <Table>
          <TableHeader className="bg-gray-100 top-0 z-10 sticky">
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead
                    key={header.id}
                    className={(header.column.columnDef.meta as any)?.className}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <TableCell key={index}>
                        <Skeleton className="h-[36.67px] w-9/12 aspect-square rounded-sm" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : table.getRowModel().rows.map(row => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <TableCell
                        key={cell.id}
                        className={(cell.column.columnDef.meta as any)?.classNameCell}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end w-full h-8">
        <Pagination className="w-full flex justify-end gap-2">
          <SelectCustomize
            className="w-16"
            options={options}
            value={limit + ''}
            onChange={value => setLimit(Number(value))}
          />
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  if (pagination?.hasPreviousPage) {
                    setPage(page - 1);
                  }
                }}
                className={cn(
                  'text-black cursor-pointer',
                  !pagination?.hasPreviousPage && 'text-gray-300 hover:text-gray-300 cursor-auto'
                )}
              />
            </PaginationItem>
            {Array.from({ length: pagination?.totalPages || 0 }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  className="cursor-pointer"
                  onClick={() => setPage(index + 1)}
                  isActive={page === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  if (pagination?.hasNextPage) {
                    setPage(page + 1);
                  }
                }}
                className={cn(
                  'text-black cursor-pointer',
                  !pagination?.hasNextPage && 'text-gray-300 hover:text-gray-300 cursor-auto'
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default TableCustomize;
