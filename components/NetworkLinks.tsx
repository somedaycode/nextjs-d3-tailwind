import { FC, useEffect, useRef } from 'react';
import { select } from 'd3';

import { Link } from '@/types';

type LinksProps = {
  links: Link[];
};

type LinkProps = {
  link: Link;
};

const NetworkLink = ({ link }: LinkProps) => {
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    select(lineRef.current).data([link]);
  }, [link]);

  return <line ref={lineRef} className="link" strokeWidth="1" />;
};

const NetworkLinks: FC<LinksProps> = ({ links } = { links: [] }) => {
  return (
    <g stroke="#999" strokeOpacity="0.3">
      {links?.map((link, index) => (
        <NetworkLink key={index} link={link} />
      ))}
    </g>
  );
};

export default NetworkLinks;
