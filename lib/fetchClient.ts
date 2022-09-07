import HTTPClient, { HTTPClientBuilder } from './httpClient';

export default class FetchClient implements HTTPClient {
  private _baseUrl = '';

  set baseUrl(url: string) {
    this._baseUrl = url;
  }

  get<T>(url: string): Promise<T | Response> {
    return fetch(`${this._baseUrl}${url}`, {
      method: 'GET',
    }).then((res) => {
      return res.json();
    });
  }

  post<T>(url: string, options: RequestInit): Promise<T> {
    return fetch(`${this._baseUrl}${url}`, {
      method: 'POST',
      ...options,
    }).then((res) => {
      return res.json();
    });
  }
}

export class FetchClientBuilder implements HTTPClientBuilder {
  private readonly instance: FetchClient;

  constructor() {
    this.instance = new FetchClient();
  }

  setBaseUrl(url: string): HTTPClientBuilder {
    this.instance.baseUrl = url;
    return this;
  }

  build(): HTTPClient {
    return this.instance;
  }
}
