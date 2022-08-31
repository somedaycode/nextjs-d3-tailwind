import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  title: string;
  description: string;
}>;

export const Card = ({ title, description }: Props) => {
  return (
    <div className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600">
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="mt-4 text-xl">{description}</p>
    </div>
  );
};
