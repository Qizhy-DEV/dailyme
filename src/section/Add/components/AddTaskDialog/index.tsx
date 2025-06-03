/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import DialogCustomize from '@src/components/ui-custom/dialog';
import AddTaskForm from './components/AddTaskForm';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const AddTaskDialog = ({ visible, onClose }: Props) => {
  return (
    <DialogCustomize
      title="Create task"
      subtitle="Fill out the task details below and save your changes."
      visible={visible}
      onClose={onClose}
    >
      <AddTaskForm onClose={onClose} />
    </DialogCustomize>
  );
};

export default AddTaskDialog;
