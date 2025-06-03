/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import FormField from '@src/components/ui-custom/form-field';
import { Input } from '@src/components/ui/input';
import { SelectCustomize } from '@src/components/ui-custom/select';
import { taskSchema } from '@src/core/validations/taskSchema';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import ButtonCustomize from '@src/components/ui-custom/button';
import { FormProvider } from '@src/components/providers/FormProvider';
import { Task } from '@src/components/providers/TaskProvider';
import useUpdateTaskMutation from '@src/api/todo/mutations/useUpdateTaskMutation';
import { Label } from '@src/components/ui/label';

interface Props {
  currentTask: Task;
  onClose: () => void;
}

const UpdateTaskForm = ({ currentTask, onClose }: Props) => {
  const { mutateAsync, isPending } = useUpdateTaskMutation({
    onSuccess: data => {
      toast('Success', { description: data.message });
    },
    onError: error => {
      toast('Error', { description: error.message });
    },
  });

  if (!currentTask) return;

  const options = [
    { label: 'Hard', value: 'hard' },
    { label: 'Medium', value: 'medium' },
    { label: 'Easy', value: 'easy' },
  ];

  const onSubmit = async (value: any, fields: UseFormReturn) => {
    await mutateAsync({
      ...currentTask,
      title: value.title,
      subtitle: value.subtitle,
      level: value.level,
    });
    fields.reset();
    onClose();
  };

  return (
    <FormProvider
      onSubmit={onSubmit}
      defaultValues={{
        title: currentTask.title,
        subtitle: currentTask.subtitle,
        level: currentTask.level,
      }}
      mode="onChange"
      validationSchema={taskSchema}
    >
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4">
          <Label className="text-right flex items-start py-3">Title</Label>
          <div className="col-span-3">
            <FormField placeholder="Enter title" field="title" component={Input} />
          </div>
        </div>
        <div className="grid grid-cols-4">
          <Label className="text-right flex items-start py-3">Subcription</Label>
          <div className="col-span-3">
            <FormField placeholder="Enter subtitle" field="subtitle" component={Input} />
          </div>
        </div>
        <div className="grid grid-cols-4">
          <Label className="text-right flex items-start py-3">Priority</Label>
          <div className="col-span-3">
            <FormField
              field="level"
              className="col-span-3"
              component={SelectCustomize}
              options={options}
              placeholder="Choose Priority"
            />
          </div>
        </div>
        <div className="grid grid-cols-3">
          <ButtonCustomize
            type="submit"
            className="col-start-3 col-span-1 bg-green-500 hover:bg-green-400"
            isPending={isPending}
          >
            Create Task
          </ButtonCustomize>
        </div>
      </div>
    </FormProvider>
  );
};

export default UpdateTaskForm;
