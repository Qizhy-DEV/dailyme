/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Label } from '../ui/label';
import { Controller, ControllerRenderProps, FieldValues, useFormContext } from 'react-hook-form';
import { Spinner } from './spinner';
import { ErrorMessage } from '@hookform/error-message';
import { cn } from '@src/lib/utils';

type Props<T extends React.ElementType> = {
  component: T;
  field: string;
  onChange?: (value: string) => void;
  isPending?: boolean;
  className?: string;
} & Omit<React.ComponentProps<T>, 'name'>;

const FormField = <T extends React.ElementType>({
  component: Component,
  field,
  onChange,
  isPending = false,
  className = '',
  ...props
}: Props<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const handleChange = (e: any, field: ControllerRenderProps<FieldValues, string>) => {
    if (e.target) {
      field.onChange(e.target.value);
      onChange?.(e.target.value);
    } else {
      field.onChange(e);
      onChange?.(e);
    }
  };

  return (
    <div className={cn('flex flex-col w-full items-start gap-x-4 gap-y-2')}>
      {isPending ? (
        <div className="flex items-center justify-center">
          <Spinner className="w-10" />
        </div>
      ) : (
        <Controller
          name={field}
          control={control}
          render={({ field }) => (
            <Component
              {...field}
              {...(props as any)}
              onChange={(e: any) => handleChange(e, field)}
              className={cn('text-sm', className)}
            />
          )}
        />
      )}
      <ErrorMessage
        errors={errors}
        name={field}
        render={({ message }) => (
          <Label className="text-right font-thin text-sm text-red-400">{message}</Label>
        )}
      />
    </div>
  );
};

export default FormField;
