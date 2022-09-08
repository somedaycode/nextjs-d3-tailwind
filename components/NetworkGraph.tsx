import type { Network, Node } from '@/types';
import * as d3 from 'd3';
import type { D3ZoomEvent, SimulationNodeDatum } from 'd3';
import { useEffect, useRef } from 'react';

type Props = {
  networkGraphData: Network;
};

interface NodeDatum extends SimulationNodeDatum {
  id?: string | number;
  value?: number | number;
}

const fillCircle = (value: number) => {
  if (value == 0) return '#FFF';

  if (value == 1) return '#A7D2CB';

  return '#FA9494';
};

const NetworkGraph = ({ networkGraphData }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const { nodes, links } = networkGraphData;

  const width = svgRef.current?.width.animVal.value as number;
  const height = svgRef.current?.height.animVal.value as number;

  const resetChart = () => d3.selectAll(`.network-chart > *`).remove();

  useEffect(() => {
    resetChart();

    const networkGraphElement = d3.select(svgRef.current);

    const handleZoom = (e) => d3.select('svg g').attr('transform', e.transform);
    let zoom = d3.zoom().on('zoom', handleZoom);
    networkGraphElement.call(zoom);

    const holder = networkGraphElement
      .append('g')
      .attr('class', 'w-full h-full');

    /**링크 */
    const graphLink = holder
      .append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', () => 3);

    /**노드 */
    const graphNode = holder
      .append('g')
      .attr('class', 'node')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .each(function (d) {
        d3.select(this)
          .append('circle')
          .attr('r', d.value * 15)
          .attr('fill', fillCircle(d.value));
        d3.select(this)
          .append('text')
          .text(d.name)
          .attr('font-size', '14px')
          .attr('font-weight', 700)
          .attr('dy', 6)
          .style('text-anchor', 'middle');
      });

    /**시뮬레이션 */
    const simulation = d3
      .forceSimulation(nodes)
      .velocityDecay(0.9)
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('charge', d3.forceManyBody().strength(-1000))
      .force(
        'link',
        d3.forceLink(links).id((d: NodeDatum) => d.id as string),
      )
      .force(
        'collide',
        d3.forceCollide().radius((d: NodeDatum) => (d.value as number) * 30),
      );

    simulation.on('tick', () => {
      graphLink
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);
      graphNode
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y)
        .attr('transform', (d) => `translate(${d.x},${d.y})`);
    });

    /** dragging */
  }, [networkGraphData, links, nodes, width, height]);

  return (
    <div className="w-full h-[80vh]">
      <svg ref={svgRef} className="network-chart w-full h-full">
        NetworkGraph
      </svg>
    </div>
  );
};

export default NetworkGraph;
