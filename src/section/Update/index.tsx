/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { queryClient } from '@src/core/instances/query';
import UpdateTaskDialog from './components/UpdateTaskDialog';
import { toast } from 'sonner';
import useTaskQuery from '@src/api/todo/queries/useTaskQuery';

const UpdateContent = () => {
  const [visible, setVisible] = useState(false);
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes('/todo/update')) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [pathname]);

  const handleTaskError = useCallback((error: Error) => {
    toast('Error', { description: error.message });
    router.push('/todo');
  }, []);

  const { data, error, isError } = useTaskQuery({
    id: params.id as string,
  });

  useEffect(() => {
    if (isError) {
      if (error) handleTaskError(error);
    }
  }, [isError, handleTaskError, error]);

  if (!data?.data) return;

  const onClose = () => {
    setVisible(false);
    router.back();
  };

  return <UpdateTaskDialog visible={visible} onClose={onClose} currentTask={data.data} />;
};

const Update = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UpdateContent />
    </QueryClientProvider>
  );
};

export default Update;
