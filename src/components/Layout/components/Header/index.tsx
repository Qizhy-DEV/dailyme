import { Calendar, Home, Inbox, Trash } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@src/components/ui/sidebar';
import UserMenu from './components/UserMenu';

// Menu items.
const items = [
  {
    title: 'Todo',
    url: '#',
    icon: Home,
  },
  {
    title: 'Inbox',
    url: '#',
    icon: Inbox,
  },
  {
    title: 'Calendar',
    url: '#',
    icon: Calendar,
  },
  {
    title: 'Trash',
    url: '#',
    icon: Trash,
  },
];

export function Header() {
  return (
    <Sidebar>
      <SidebarContent className="p-2 bg-[#f3f5f7]">
        <UserMenu />
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem
                  className="font-medium py-[6px] px-2 hover:bg-white hover:border-gray-300 border-[1px] border-[#f9fafb] rounded-md transition-all duration-500"
                  key={item.title}
                >
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-3 text-gray-500">
                      <item.icon className="transition-all duration-500" />
                      <span className="transition-all duration-500">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
