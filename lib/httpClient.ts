export default interface HTTPClient {
  get(url: string): Promise<unknown>;
  post<T>(url: string, options: RequestInit): Promise<T | unknown>;
}

export type FilterByStatus = (
  body: Record<string, unknown>,
) => Record<string, unknown> | Promise<unknown>;

export interface HTTPClientBuilder {
  setBaseUrl(url: string): HTTPClientBuilder;

  setSuccessFilter(filter: FilterByStatus): HTTPClientBuilder;

  setFailFilter(filter: FilterByStatus): HTTPClientBuilder;

  build(): HTTPClient;
}
