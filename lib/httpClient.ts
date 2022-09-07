export default interface HTTPClient {
  get(url: string): Promise<Response>;
  post<T>(url: string, options: RequestInit): Promise<T>;
}

export type FilterByStatus = (
  body: Record<string, unknown>,
) => Record<string, unknown> | Promise<unknown>;

export interface HTTPClientBuilder {
  setBaseUrl(url: string): HTTPClientBuilder;

  build(): HTTPClient;
}
