import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{}>;

const Label = ({ children }: Props) => {
  return (
    <span className="text-xs font-semibold inline-block py-1 px-4 uppercase rounded text-sky-500 bg-sky-200 last:mr-0 mr-1 cursor-pointer">
      {children}
    </span>
  );
};

export default Label;
