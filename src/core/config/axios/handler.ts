/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from './setup';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';

export interface ResponseData<T> {
  message: string | undefined;
  data: T;
}

export const callApi = async <T>({
  method,
  endpoint,
  data,
}: {
  method: HttpMethod;
  endpoint: string;
  data?: any;
}): Promise<ResponseData<T>> => {
  try {
    const isFormData = typeof FormData !== 'undefined' && data instanceof FormData;

    const response = await axiosInstance.request<ResponseData<T>>({
      method,
      url: endpoint,
      data,
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });

    return response.data;
  } catch (error: unknown) {
    throw error;
  }
};
