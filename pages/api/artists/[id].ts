import type { Link, Network, Node } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';

import { apiHandler } from '@/helpers/api/apiHandler';

import {
  getArtistNodes,
  getRelatedArtistsById,
  getSingleArtistNode,
  setLinksFromArtists,
  setNodes,
} from '@/utils/relatedArtists';
import { DEFAULT_NEWORK_VALUE } from '@/consts';

export default apiHandler({
  get: getRelatedArtistsNodeWithLinks,
});

async function getRelatedArtistsNodeWithLinks(
  req: NextApiRequest,
  res: NextApiResponse<Network>,
) {
  const nodes = new Map<string, Node>();
  const links = new Set<Link>();

  try {
    const id = req.query.id as string;
    if (!id) return respondDefaultNeworkValue(res);

    const startNode = await getSingleArtistNode(id);
    /** 검색된 아티스트를 첫 노드에 추가 */
    nodes.set(id, startNode);

    /** 검색한 아티스트의 연관 아티스트 목록을 불러온 후 Link로 연결 */
    const relatedArtistsFromStartNode = await getRelatedArtistsById(id);
    setLinksFromArtists(relatedArtistsFromStartNode, links, id);

    /** 받아온 연관 아티스트 목록을 새로운 노드로 저장 */
    const nodesFromStartNode = getArtistNodes(relatedArtistsFromStartNode);
    setNodes(nodesFromStartNode, nodes);

    /**
     * @description
     * 각각의 연관 아티스트를 시작으로 위의 로직을 반복
     */
    await Promise.all(
      nodesFromStartNode.map((nextNode) => getRelatedArtistsById(nextNode.id)),
    ).then((result) =>
      result.forEach((artistList, i) => {
        const nextNodeId = nodesFromStartNode[i].id;
        setLinksFromArtists(artistList, links, nextNodeId);
        const nextNewNodes = getArtistNodes(artistList) as Node[];
        setNodes(nextNewNodes, nodes, 2);
      }),
    );

    const result = {
      nodes: [...nodes.values()],
      links: [...links],
    };

    return res.status(200).json(result);
  } catch (error) {
    return respondDefaultNeworkValue(res, 500);
  }
}

function respondDefaultNeworkValue(res: NextApiResponse, code: number = 200) {
  res.status(code).json(DEFAULT_NEWORK_VALUE);
}
