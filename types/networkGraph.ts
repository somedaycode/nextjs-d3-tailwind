import type { SimulationNodeDatum } from 'd3';
import type { D3DragEvent } from 'd3-drag';

export type Node = {
  id: string;
  url: string;
  name: string;
  value: number;
};

export type Link = {
  group: string;
  source: string;
  target: string;
  name: string;
};

export type Network = {
  nodes: Node[];
  links: Link[];
};

export interface NodeDatum extends SimulationNodeDatum {
  id?: string | number;
  value?: number | number;
}

export type Subject = {
  x: number;
  fx: number | null;
  y: number;
  fy: number | null;
};

export type DragEvent = D3DragEvent<SVGGElement, typeof SVGGElement, Subject>;
