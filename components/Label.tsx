import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{}>;

const Label = ({ children }: Props) => {
  return (
    <span className="max-h-6 text-xs text-center  font-semibold py-1 px-1 uppercase rounded text-sky-500 bg-sky-200 cursor-pointer text-ellipsis truncate">
      {children}
    </span>
  );
};

export default Label;
