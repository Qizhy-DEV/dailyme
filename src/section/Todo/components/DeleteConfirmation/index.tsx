import useDeleteTaskMutation from '@src/api/todo/mutations/useDeleteTaskMutation';
import Confirmation from '@src/components/common/Confirmation';
import { Task } from '@src/components/providers/TaskProvider';
import ButtonCustomize from '@src/components/ui-custom/button';
import { Button } from '@src/components/ui/button';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'sonner';

interface Props {
  visible: boolean;
  onClose: () => void;
  currentTask: Task | undefined;
}

const DeleteConfirmation = ({ visible, currentTask, onClose }: Props) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useDeleteTaskMutation({
    onSuccess: data => {
      toast('Success', { description: data.message });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: error => {
      toast('Error', { description: error.message });
    },
  });

  const handleDelete = () => {
    if (!currentTask) return;
    mutateAsync(currentTask.id);
    onClose();
  };

  return (
    <Confirmation
      title="Confirmation for deleting"
      subtitle="Are you sure about delete this task"
      onClose={onClose}
      visible={visible}
      controls={() => (
        <>
          <Button onClick={onClose} className={`w-28`}>
            Cancel
          </Button>
          <ButtonCustomize
            isPending={isPending}
            onClick={handleDelete}
            className={`w-28 bg-red-500 hover:bg-red-400`}
          >
            Confirm
          </ButtonCustomize>
        </>
      )}
    />
  );
};

export default DeleteConfirmation;
