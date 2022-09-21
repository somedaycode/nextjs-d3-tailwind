import { Link } from '@/types';
import { select } from 'd3';
import { useEffect, useRef } from 'react';

type LinksProps = {
  data: Link[];
};

type LinkProps = {
  data: Link;
};

const NetworkLink = ({ data }: LinkProps) => {
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    select(lineRef.current).data([data]);
  }, [data]);

  return <line ref={lineRef} className="link" strokeWidth="1" />;
};

const NetworkLinks = ({ data }: LinksProps = { data: [] }) => {
  return (
    <g stroke="#999" strokeOpacity="0.3">
      {data?.map((link, index) => (
        <NetworkLink key={index} data={link} />
      ))}
    </g>
  );
};

export default NetworkLinks;
