import { Node } from '@/types';
import { fillCircleByValue, weighValueByMutiply } from '@/utils/chart';
import { select } from 'd3';
import { useEffect, useRef } from 'react';

type NodesProps = {
  data: Node[];
};

type NodeProps = {
  data: Node;
};

const NetworkNode = ({ data }: NodeProps) => {
  const circleRef = useRef<SVGCircleElement>(null);
  const textRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    select(circleRef.current)
      .data([data])
      .attr('r', (d) => weighValueByMutiply(d.value))
      .attr('fill', (d) => fillCircleByValue(d.value));

    select(textRef.current)
      .data([data])
      .text((d) => d.name)
      .attr('dy', 6)
      .style('text-anchor', 'middle');
  }, [data]);

  return (
    <g>
      <circle className="node" ref={circleRef}></circle>
      <text className="text text-sm" ref={textRef}></text>
    </g>
  );
};

const NetworkNodes = ({ data }: NodesProps = { data: [] }) => {
  return (
    <g className="nodes">
      {data?.length === 0 ? (
        <g className="node"></g>
      ) : (
        data?.map((node: Node) => <NetworkNode key={node.id} data={node} />)
      )}
    </g>
  );
};

export default NetworkNodes;
