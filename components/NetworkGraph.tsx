import { FC, useEffect, useMemo, useRef } from 'react';
import * as d3 from 'd3';

import type { SimulationNodeDatum } from 'd3';
import type { NodeDatum } from '@/types';

import { useNetworkGraph } from '@/hooks/useNetworkGraph';
import { weighValueByMutiply } from '@/utils/chart';

import NetworkLinks from './NetworkLinks';
import NetworkNodes from './NetworkNodes';

type Props = {
  currentArtistId: string;
};

const NetworkGraph: FC<Props> = ({ currentArtistId }) => {
  const { data } = useNetworkGraph(currentArtistId);
  const { nodes, links } = data;

  const svgRef = useRef<SVGSVGElement>(null);

  const width = svgRef.current?.width.animVal.value as number;
  const height = svgRef.current?.height.animVal.value as number;

  const noNetworkGraphData =
    !nodes || nodes.length === 0 || !links || links.length === 0;

  /** 시뮬레이션 기본 동작 */
  const simulation = useMemo(() => {
    return d3
      .forceSimulation(nodes as SimulationNodeDatum[])
      .velocityDecay(0.7)
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('charge', d3.forceManyBody().strength(-1000))
      .force(
        'link',
        d3.forceLink(links).id((d: NodeDatum) => d.id as string),
      )
      .force(
        'collide',
        d3
          .forceCollide()
          .radius((d: NodeDatum) => weighValueByMutiply(d.value as number, 50)),
      );
  }, [height, links, nodes, width]);

  /** 시뮬레이션 On */
  useEffect(() => {
    if (noNetworkGraphData) return;

    const networkGraphElement = d3.select<SVGSVGElement, unknown>(
      svgRef.current as SVGSVGElement,
    );

    const handleZoom = (e: any) =>
      d3.select('svg g').attr('transform', e.transform);
    let zoom = d3.zoom<SVGSVGElement, unknown>().on('zoom', handleZoom);
    networkGraphElement.call(zoom);

    const node = d3.selectAll('.node');
    const link = d3.selectAll('.link');
    const text = d3.selectAll('.text');

    const ticked = () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);
      node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y);
      text.attr('x', (d: any) => d.x).attr('y', (d: any) => d.y);
    };

    simulation.on('tick', ticked);
  }, [width, height, noNetworkGraphData, nodes, links, simulation]);

  return (
    <div className="w-full h-[80vh]">
      <svg ref={svgRef} className="w-full h-full">
        <g className="w-full h-full">
          <NetworkLinks links={links} />
          <NetworkNodes nodes={nodes} simulation={simulation} />
        </g>
      </svg>
    </div>
  );
};

export default NetworkGraph;
