'use client';
import { usePathname } from 'next/navigation';
import React from 'react';
import Layout from '../Layout';
import AuthProvider from '../providers/AuthProvider';

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const ignoreLayoutRoutes = ['/', '/sign-up'];

  if (ignoreLayoutRoutes.includes(pathname)) return <AuthProvider>{children}</AuthProvider>;

  return (
    <AuthProvider>
      <Layout>{children}</Layout>
    </AuthProvider>
  );
};

export default LayoutWrapper;
