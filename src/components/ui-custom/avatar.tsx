import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@src/components/ui/avatar';

interface Props {
  src: string;
  className?: string;
}

const AvatarCustomize = ({ src, className = '' }: Props) => {
  return (
    <Avatar>
      <AvatarImage src={src} className={className} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default AvatarCustomize;
