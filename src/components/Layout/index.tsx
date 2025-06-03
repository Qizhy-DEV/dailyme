import React from 'react';
import { Header } from './components/Header';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@src/components/ui/breadcrumb';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-screen">
      <SidebarProvider>
        <Header />
        <main className="w-full h-screen p-4">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/todo">Todo</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
