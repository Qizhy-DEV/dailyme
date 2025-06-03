/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup';
import {
  DefaultValues,
  FormProvider as FormProviderContext,
  useForm,
  UseFormReturn,
} from 'react-hook-form';

export interface Handler {
  title: string;
  fn?: any;
  type: 'button' | 'submit';
  className?: string;
  isPending?: boolean;
}

interface Props {
  children: React.ReactNode;
  defaultValues: DefaultValues<any>;
  validationSchema: any;
  onSubmit: (data: any, fields: UseFormReturn) => void;
  mode: 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched' | 'all';
}

export function FormProvider({ children, defaultValues, mode, validationSchema, onSubmit }: Props) {
  const fields = useForm({
    resolver: validationSchema && yupResolver(validationSchema),
    defaultValues: defaultValues,
    mode,
  });

  const handleSubmit = (data: any, fields: UseFormReturn) => {
    return onSubmit(data, fields);
  };

  return (
    <FormProviderContext {...fields}>
      <form onSubmit={fields.handleSubmit((data: any) => handleSubmit(data, fields))}>
        {children}
      </form>
    </FormProviderContext>
  );
}
