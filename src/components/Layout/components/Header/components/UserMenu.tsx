import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@src/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import AvatarCustomize from '@src/components/ui-custom/avatar';
import { menuUserItems } from '@src/core/constants/common';

const UserMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="w-full py-2 px-4 flex items-center justify-between bg-white rounded-md">
          <div className="flex items-center gap-3">
            <AvatarCustomize src="https://github.com/shadcn.png" className="rounded-sm" />
            <div className="flex flex-col items-start">
              <p className="text-sm font-semibold">Emir&apos;s Space</p>
              <p className="text-xs">qizhy@example.com</p>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            />
          </svg>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" className="w-[200px]">
        <DropdownMenuLabel>
          <div className="flex items-center gap-3">
            <AvatarCustomize src="https://github.com/shadcn.png" className="rounded-sm" />
            <div className="flex flex-col items-start">
              <p className="text-sm font-semibold">Emir&apos;s Space</p>
              <p className="text-xs">qizhy@example.com</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {menuUserItems.map((item, index) => (
          <DropdownMenuItem key={item.title + index} className="mt-1">
            <a href={item.url} className="flex items-center gap-2">
              <item.icon className="transition-all duration-500" />
              <span className="transition-all duration-500 text-sm">{item.title}</span>
            </a>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <a href={'#'} className="flex items-center gap-2">
            <LogOut />
            <span className="transition-all duration-500">Log out</span>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
