import * as d3 from 'd3';
import { SimulationNodeDatum } from 'd3';
import { useEffect, useRef } from 'react';

import type { DragEvent, NodeDatum } from '@/types';

import { useNetworkGraph } from '@/hooks/useNetworkGraph';
import NetworkNodes from './NetworkNodes';
import NetworkLinks from './NetworkLinks';

type Props = {
  currentArtistId: string;
};

const weighValueByMutiply = (value: number, mutiply = 30) =>
  Math.abs(value - 3) * mutiply;

const NetworkGraph = ({ currentArtistId }: Props) => {
  const { data } = useNetworkGraph(currentArtistId);

  const { nodes, links } = data;

  const svgRef = useRef<SVGSVGElement>(null);

  const width = svgRef.current?.width.animVal.value as number;
  const height = svgRef.current?.height.animVal.value as number;

  const noNetworkGraphData =
    !nodes || nodes.length === 0 || !links || links.length === 0;

  /**시뮬레이션 */
  const simulation = d3
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
  useEffect(() => {
    if (noNetworkGraphData) return;

    const networkGraphElement = d3.select<SVGSVGElement, unknown>(
      svgRef.current as SVGSVGElement,
    );

    const handleZoom = (e: any) =>
      d3.select('svg g').attr('transform', e.transform);
    let zoom = d3.zoom<SVGSVGElement, unknown>().on('zoom', handleZoom);
    networkGraphElement.call(zoom);

    /** dragging */
    function drag(simulation: d3.Simulation<SimulationNodeDatum, undefined>) {
      function dragstarted(e: DragEvent) {
        if (!e.active) simulation.alphaTarget(0.3).restart();
        e.subject.fx = e.subject.x;
        e.subject.fy = e.subject.y;
      }

      function dragged(e: DragEvent) {
        e.subject.fx = e.x;
        e.subject.fy = e.y;
      }

      function dragended(e: DragEvent) {
        if (!e.active) simulation.alphaTarget(0);
        e.subject.fx = null;
        e.subject.fy = null;
      }

      return d3
        .drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }

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
      <svg ref={svgRef} className="network-chart w-full h-full">
        <g className="w-full h-full">
          <NetworkLinks data={links} />
          <NetworkNodes data={nodes} />
        </g>
      </svg>
    </div>
  );
};

export default NetworkGraph;
