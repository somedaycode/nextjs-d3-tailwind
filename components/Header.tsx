import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{}>;

const Header = ({ children }: Props) => {
  return (
    <header className="flex justify-center items-center p-2 w-full">
      {children}
    </header>
  );
};

export default Header;
