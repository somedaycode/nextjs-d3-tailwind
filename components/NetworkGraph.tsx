import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import type { DragEvent, Network, NodeDatum } from '@/types';
import { SimulationNodeDatum } from 'd3';

type Props = {
  networkGraphData: Network;
};

const fillCircleByValue = (value: number) => {
  if (value === 0) return '#7DE5F5D1';

  if (value === 1) return '#89D3C7D1';

  return '#31ACA9D1';
};

const weighValueByMutiply = (value: number, mutiply = 30) =>
  Math.abs(value - 3) * mutiply;

const NetworkGraph = ({ networkGraphData }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const { nodes, links } = networkGraphData;

  const width = svgRef.current?.width.animVal.value as number;
  const height = svgRef.current?.height.animVal.value as number;

  const resetChart = () => d3.selectAll(`.network-chart > *`).remove();

  useEffect(() => {
    resetChart();

    const networkGraphElement = d3.select<SVGSVGElement, unknown>(
      svgRef.current as SVGSVGElement,
    );

    const handleZoom = (e: any) =>
      d3.select('svg g').attr('transform', e.transform);
    let zoom = d3.zoom<SVGSVGElement, unknown>().on('zoom', handleZoom);
    networkGraphElement.call(zoom);

    const holder = networkGraphElement
      .append('g')
      .attr('class', 'w-full h-full');

    /**
     * 링크
     * @todo: 컴포넌트로 분리해야함
     * */
    const graphLink = holder
      .append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.3)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', () => 1);

    /**시뮬레이션 */
    const simulation = d3
      .forceSimulation(nodes as SimulationNodeDatum[])
      .velocityDecay(0.7)
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('charge', d3.forceManyBody().strength(-100))
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

    /**
     * Node
     * @todo: 컴포넌트로 분리해야함
     * */
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
          .attr('r', weighValueByMutiply(d.value))
          .attr('fill', fillCircleByValue(d.value));
        d3.select(this)
          .append('text')
          .text(d.name)
          .attr('font-size', '12px')
          .attr('class', ':hover:color-sky-700')
          .attr('dy', 6)
          .style('text-anchor', 'middle');
      })
      .call(drag(simulation) as any);

    /**
     * tick
     * @decription
     * 'd' 타입을 정해주기가 어려워서 일단 any
     *
     */
    const ticked = () => {
      graphLink
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);
      graphNode
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y)
        .attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    };

    simulation.on('tick', ticked);

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
