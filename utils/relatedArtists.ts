import { requestSpotify } from '@/helpers/api/requestSpotify';
import type { Link, Node, Artist } from '@/types';

export async function getSingleArtistNode(artistId: string) {
  const { artists } = await requestSpotify<{ artists: Artist[] }>(
    `/artists?ids=${artistId}`,
  );
  const { id, external_urls, name } = artists[0];
  return {
    id,
    url: external_urls.spotify,
    name,
    value: 1,
  };
}

export async function getRelatedArtistsById(id: string) {
  const query = `/artists/${id}/related-artists`;
  const { artists } = await requestSpotify<{ artists: Artist[] }>(query);
  return artists;
}
export function getArtistNodes(artistList: Artist[]) {
  return artistList.map(({ id, external_urls, name }) => {
    return { id, url: external_urls.spotify, name, value: 1 };
  });
}
export function setLinksFromArtists(
  artistList: Artist[],
  links: Set<Link>,
  group: string,
) {
  artistList.forEach(({ id, name }) => {
    links.add({ group, source: group, target: id, name });
  });
}
export function setNodes(nodes: Node[], originalNodes: Map<string, Node>) {
  nodes.forEach((node) => {
    if (originalNodes.has(node.id)) {
      return originalNodes.set(node.id, { ...node, value: node.value + 1 });
    }

    originalNodes.set(node.id, node);
  });
}
