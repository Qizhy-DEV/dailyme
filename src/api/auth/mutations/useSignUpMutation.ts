import { callApi, ResponseData } from '@src/core/config/axios/handler';
import { useMutation } from '@tanstack/react-query';
import { IUser } from '../interface';
import { AxiosError } from 'axios';

export interface HandlersResponse<T> {
  onError?: (error: AxiosError) => void;
  onSuccess?: (res: ResponseData<T>) => void;
}

export function useSignUpMutation({ onError, onSuccess }: HandlersResponse<IUser>) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: Omit<IUser, 'id' | 'auth' | 'avatar'>) =>
      callApi<IUser>({
        endpoint: '/auths/sign-up',
        method: 'POST',
        data,
      }),
    onError,
    onSuccess,
  });

  return { mutateAsync, isPending };
}
