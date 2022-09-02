type Props = {
  children: React.ReactNode;
};
export const CardTitle = ({ children }: Props) => {
  return <h2 className="text-2xl font-bold">{children}</h2>;
};
