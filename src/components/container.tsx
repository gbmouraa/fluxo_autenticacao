import React from "react";
import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="m-auto flex w-full max-w-[402px] flex-col items-center px-4 py-[5vh]">
      {children}
    </div>
  );
};
