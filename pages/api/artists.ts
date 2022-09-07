import type { Artist, Artists } from '@/types/artists';
import type { NextApiRequest, NextApiResponse } from 'next';

import { apiHandler } from '@/helpers/api/apiHandler';
import { errorHandler } from '@/helpers/api/errorHandler';
import { requestSpotify } from '@/helpers/api/requestSpotify';

import { getSpotifyToken } from './token';
import {
  getArtistNodes,
  getRelatedArtistsById,
  getSingleArtistNode,
  setLinksFromArtists,
  setNodes,
} from '@/utils/relatedArtists';

import type { Link, Node } from '@/utils/relatedArtists';

export default apiHandler({
  get: getRelatedArtistsNodeWithLinks,
  post: getArtist,
});

async function getArtist(req: NextApiRequest, res: NextApiResponse<Artist[]>) {
  try {
    const artist = req.body;
    const query = `/search?q=${encodeURIComponent(artist)}&type=artist`;
    const data: Artists = await requestSpotify(query);
    const searchArtists = data.artists.items;
    res.status(200).json(searchArtists);
  } catch (error) {
    await getSpotifyToken(req, res, true);
    errorHandler('잠깐! 문제가 있어요! 다시 한번 시도해주세요', res);
  }
}

async function getRelatedArtistsNodeWithLinks(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const nodes = new Map<string, Node>();
  const links = new Set<Link>();

  try {
    const id = req.query.id as string;
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
        setNodes(nextNewNodes, nodes);
      }),
    );

    const result = {
      nodes: [...nodes.values()],
      links: [...links],
    };

    res.status(200).json(result);
  } catch (error) {
    errorHandler('잠깐! 문제가 있어요! 다시 한번 시도해주세요', res);
  }
}
