type Props = {
  children: React.ReactNode;
};

export const CardMain = ({ children }: Props) => {
  return (
    <div className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600">
      {children}
    </div>
  );
};
