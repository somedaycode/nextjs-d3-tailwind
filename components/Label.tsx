import React, { MouseEventHandler } from 'react';

type Props = {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLSpanElement>;
};

const Label = ({ children, onClick }: Props) => {
  return (
    <span
      onClick={onClick}
      className="max-h-6 text-xs text-center  font-semibold py-1 px-1 uppercase rounded text-sky-500 bg-sky-200 cursor-pointer text-ellipsis truncate"
    >
      {children}
    </span>
  );
};

export default Label;
