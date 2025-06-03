/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import AddTaskDialog from './components/AddTaskDialog';
import { usePathname, useRouter } from 'next/navigation';
import { queryClient } from '@src/core/instances/query';

const Add = () => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/todo/add') {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [pathname]);

  const onClose = () => {
    setVisible(false);
    router.back();
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AddTaskDialog visible={visible} onClose={onClose} />
    </QueryClientProvider>
  );
};

export default Add;
