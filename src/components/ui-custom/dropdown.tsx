import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";

type DropdownItem = {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
};

type Props = {
  items: DropdownItem[];
};

const DropdownCustomize = ({ items }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 w-8 bg-gray-50 cursor-pointer hover:bg-gray-200">
          <MoreHorizontal className="text-gray-500 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {items.map((item, index) => (
          <DropdownMenuItem key={index} onClick={item.onClick}>
            {item.icon && <span className="mr-2">{item.icon}</span>}
            <span>{item.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownCustomize;
