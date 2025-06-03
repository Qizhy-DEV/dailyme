/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Checkbox } from "../ui/checkbox";

interface Props {
  onChange?: (value: boolean | string) => void;
  className?: string;
  checked?: boolean;
  [key: string]: any;
}

const CheckBoxCustomize = ({
  onChange,
  checked,
  className,
  ...props
}: Props) => {
  return (
    <Checkbox
      {...props}
      className={className}
      checked={checked}
      onCheckedChange={onChange}
    />
  );
};

export default CheckBoxCustomize;
