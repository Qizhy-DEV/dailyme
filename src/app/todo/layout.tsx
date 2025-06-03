import React from "react";

interface Props {
  children: React.ReactNode;
  modal: React.ReactNode;
}

const layout = ({ children, modal }: Props) => {
  return (
    <div>
      {children}
      {modal}
    </div>
  );
};

export default layout;
