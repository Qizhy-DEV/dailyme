import React, { HTMLAttributes } from 'react';
import { Button } from '../ui/button';
import { Spinner } from './spinner';
import { cn } from '@src/lib/utils';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit';
  isPending?: boolean;
  className?: string;
  children: React.ReactNode;
}

const ButtonCustomize = ({ isPending, children, type = 'button', className, ...props }: Props) => {
  return (
    <Button type={type} className={cn(className)} {...props}>
      {isPending ? <Spinner className="text-white w-8" /> : children}
    </Button>
  );
};

export default ButtonCustomize;
