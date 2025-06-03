'use client';

import { useLoginMutation } from '@src/api/auth/mutations/useLoginMutation';
import { useAuth } from '@src/components/providers/AuthProvider';
import { FormProvider } from '@src/components/providers/FormProvider';
import ButtonCustomize from '@src/components/ui-custom/button';
import FormField from '@src/components/ui-custom/form-field';
import { Spinner } from '@src/components/ui-custom/spinner';
import { Input } from '@src/components/ui/input';
import { Label } from '@src/components/ui/label';
import { queryClient } from '@src/core/instances/query';
import { SignInFormValues, signInSchema } from '@src/core/validations/authSchema';
import { QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

const SignInFormContent = () => {
  const { setUser } = useAuth();

  const { mutateAsync, isPending } = useLoginMutation({
    onError: error => toast('Error', { description: error.message }),
    onSuccess: data => {
      toast('Error', { description: data.message });
      globalThis.localStorage.setItem('accessToken', data.data.tokens.accessToken);
      globalThis.localStorage.setItem('refreshToken', data.data.tokens.refreshToken);
      setUser(data.data.user);
    },
  });

  const router = useRouter();

  const onSubmit = async (value: SignInFormValues) => {
    await mutateAsync(value);
    router.push('/todo');
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="font-semibold text-3xl">ToDo</h1>
      <p>Welcome to ToDo</p>
      <FormProvider
        validationSchema={signInSchema}
        defaultValues={{
          email: '',
          password: '',
        }}
        mode="onChange"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col w-xs">
          <Label className="text-right flex items-start text-xs text-gray-500">Email address</Label>
          <FormField
            field="email"
            className="shadow-none border-b-1 focus-visible:ring-0 p-0 border-gray-300 border-t-0 border-l-0 rounded-none border-r-0"
            component={Input}
            placeholder="Enter email address"
          />
        </div>
        <div className="flex flex-col mt-4">
          <Label className="text-right flex items-start text-xs text-gray-500">Password</Label>
          <FormField
            field="password"
            type="password"
            className="shadow-none border-b-1 focus-visible:ring-0 p-0 border-gray-300 border-t-0 border-l-0 rounded-none border-r-0"
            component={Input}
            placeholder="Enter your password"
          />
        </div>
        <div className="flex justify-end mt-2">
          <ButtonCustomize
            type="button"
            className="text-xs bg-0 border-0 hover:bg-0 shadow-none text-gray-500 cursor-pointer"
          >
            Forgot password?
          </ButtonCustomize>
        </div>
        <div className="flex justify-center mt-2">
          <ButtonCustomize type="submit" className="font-semibold rounded-full w-40 cursor-pointer">
            {isPending ? <Spinner /> : 'Login'}
          </ButtonCustomize>
        </div>
      </FormProvider>
      <ButtonCustomize
        onClick={() => router.push('/sign-up')}
        type="button"
        className="text-xs bg-0 border-0 hover:bg-0 shadow-none text-gray-500 cursor-pointer"
      >
        I don&apos;t have account, Create Now
      </ButtonCustomize>
    </div>
  );
};

const SignUpForm = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SignInFormContent />
    </QueryClientProvider>
  );
};

export default SignUpForm;
