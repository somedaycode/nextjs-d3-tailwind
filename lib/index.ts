import { FetchClientBuilder } from './fetchClient';
import { HTTPClientBuilder } from './httpClient';

export function createHttpClient(): HTTPClientBuilder {
  const builder: HTTPClientBuilder = new FetchClientBuilder();

  return builder
    .setSuccessFilter((body: any) => body.result)
    .setFailFilter((body: any) => Promise.reject(body.error));
}
