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
