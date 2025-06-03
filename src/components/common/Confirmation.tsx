import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@src/components/ui/dialog';

interface Props {
  visible: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  controls: () => React.ReactNode;
}

const Confirmation = ({ visible, onClose, title, subtitle, controls }: Props) => {
  return (
    <Dialog
      open={visible}
      onOpenChange={open => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {subtitle && <DialogDescription>{subtitle}</DialogDescription>}
        </DialogHeader>
        <DialogFooter>{controls()}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Confirmation;
