import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface Props {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const DialogCustomize = ({
  visible,
  onClose,
  title,
  subtitle,
  children,
}: Props) => {
  return (
    <Dialog
      open={visible}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {subtitle && <DialogDescription>{subtitle}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DialogCustomize;
