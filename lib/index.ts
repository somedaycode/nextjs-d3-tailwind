import { FetchClientBuilder } from './fetchClient';
import { HTTPClientBuilder } from './httpClient';

export function createHttpClient(): HTTPClientBuilder {
  const builder: HTTPClientBuilder = new FetchClientBuilder();

  return builder;
}
