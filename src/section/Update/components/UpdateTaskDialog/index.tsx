/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import DialogCustomize from '@src/components/ui-custom/dialog';
import { Task } from '@src/components/providers/TaskProvider';
import UpdateTaskForm from './components/UpdateTaskForm';

interface Props {
  currentTask: Task;
  visible: boolean;
  onClose: () => void;
}

const UpdateTaskDialog = ({ visible, onClose, currentTask }: Props) => {
  return (
    <DialogCustomize
      title="Update task"
      subtitle="Edit the task details below and save your changes."
      visible={visible}
      onClose={onClose}
    >
      <UpdateTaskForm currentTask={currentTask} onClose={onClose} />
    </DialogCustomize>
  );
};

export default UpdateTaskDialog;
