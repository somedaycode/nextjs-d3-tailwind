type Props = {
  children: React.ReactNode;
};
export const CardDescription = ({ children }: Props) => {
  return <p className="mt-4 text-xl">{children}</p>;
};
