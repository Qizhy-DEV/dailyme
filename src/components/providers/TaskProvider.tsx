/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';

export type TaskLevel = 'hard' | 'medium' | 'easy';

export type TaskFilter = 'all-tasks' | 'completed-tasks';

export interface Task {
  id: string;
  title: string;
  level: TaskLevel;
  subtitle: string;
  isComplete: boolean;
}

interface TaskState {
  limit: number;
  page: number;
  filter: TaskFilter;
}

interface TaskActions {
  setLimit: (newLimit: TaskState['limit']) => void;
  setPage: (newPage: TaskState['page']) => void;
  setFilter: (newFilter: TaskState['filter']) => void;
}

export const useTaskStore = create(
  combine<TaskState, TaskActions>({ limit: 6, page: 1, filter: 'all-tasks' }, (set, get) => ({
    setLimit: (newLimit: number) => set(() => ({ limit: newLimit })),
    setPage: (newPage: number) => set(() => ({ page: newPage })),
    setFilter: (newFilter: TaskFilter) => set(() => ({ filter: newFilter })),
  }))
);
