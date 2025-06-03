import { useMutation } from '@tanstack/react-query';
import { HandlersResponse } from './useSignUpMutation';
import { callApi } from '@src/core/config/axios/handler';
import { IUser } from '../interface';

interface LoginInput {
  email: string;
  password: string;
}

interface LoginResponse {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  user: IUser;
}

export function useLoginMutation({ onError, onSuccess }: HandlersResponse<LoginResponse>) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: LoginInput) =>
      callApi<LoginResponse>({
        endpoint: '/auths/login',
        method: 'POST',
        data,
      }),
    onError,
    onSuccess,
  });

  return { mutateAsync, isPending };
}
