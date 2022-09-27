import { FC, useCallback, useEffect, useRef } from 'react';
import { drag, select, SimulationNodeDatum } from 'd3';

import { fillCircleByValue, weighValueByMutiply } from '@/utils/chart';
import { DragEvent, Node } from '@/types';

type NodesProps = {
  nodes: Node[];
  simulation: d3.Simulation<d3.SimulationNodeDatum, undefined>;
};

type NodeProps = {
  node: Node;
  simulation: d3.Simulation<d3.SimulationNodeDatum, undefined>;
};

const NetworkNode = ({ node, simulation }: NodeProps) => {
  const circleRef = useRef<SVGCircleElement>(null);
  const textRef = useRef<SVGTextElement>(null);

  const handleDragging = useCallback(
    (graph: d3.Simulation<SimulationNodeDatum, undefined>) => {
      function dragstarted(e: DragEvent) {
        if (!e.active) graph.alphaTarget(0.3).restart();
        e.subject.fx = e.subject.x;
        e.subject.fy = e.subject.y;
      }

      function dragged(e: DragEvent) {
        e.subject.fx = e.x;
        e.subject.fy = e.y;
      }

      function dragended(e: DragEvent) {
        if (!e.active) graph.alphaTarget(0);
        e.subject.fx = null;
        e.subject.fy = null;
      }

      return drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    },
    [],
  );

  useEffect(() => {
    select(circleRef.current)
      .data([node])
      .call(handleDragging(simulation) as any);

    select(textRef.current).data([node]);
  }, [node, handleDragging, simulation]);

  const hoveringStyle =
    'hover:text-5xl hover:fill-sky-800 hover:outline-double hover:outline-sky-800 hover:z-100';

  return (
    <g>
      <circle
        className="node"
        r={weighValueByMutiply(node.value)}
        fill={fillCircleByValue(node.value)}
        ref={circleRef}
      />
      <text
        className={`text text-md ${hoveringStyle}`}
        dy={6}
        ref={textRef}
        textAnchor="middle"
      >
        {node.name}
      </text>
    </g>
  );
};

const NetworkNodes: FC<NodesProps> = ({ nodes, simulation }) => {
  return (
    <g className="nodes">
      {nodes?.length === 0 ? (
        <g className="node" />
      ) : (
        nodes?.map((node: Node) => (
          <NetworkNode key={node.id} node={node} simulation={simulation} />
        ))
      )}
    </g>
  );
};

export default NetworkNodes;
