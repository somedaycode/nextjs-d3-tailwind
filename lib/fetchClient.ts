import HTTPClient, { FilterByStatus, HTTPClientBuilder } from './httpClient';

const identifier: FilterByStatus = (_) => _;

export default class FetchClient implements HTTPClient {
  private _baseUrl = '';

  set baseUrl(url: string) {
    this._baseUrl = url;
  }

  private _successFilter = identifier;

  set successFilter(filter: FilterByStatus) {
    this._successFilter = filter;
  }

  private _failFilter = identifier;

  set failFilter(filter: FilterByStatus) {
    this._failFilter = filter;
  }

  get(url: string): Promise<unknown> {
    return fetch(`${this._baseUrl}${url}`, {
      method: 'GET',
    }).then((res) => {
      return res.status !== 200
        ? res.json().then((body) => this._failFilter(body))
        : res.json().then((body) => this._successFilter(body));
    });
  }

  post(url: string, options: RequestInit): Promise<unknown> {
    return fetch(`${this._baseUrl}${url}`, {
      method: 'POST',
      ...options,
    }).then((res) => {
      return res.status !== 200
        ? res.json().then((body) => this._failFilter(body))
        : res.json().then((body) => this._successFilter(body));
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

  setFailFilter(filter: FilterByStatus): HTTPClientBuilder {
    this.instance.failFilter = filter;
    return this;
  }

  setSuccessFilter(filter: FilterByStatus): HTTPClientBuilder {
    this.instance.successFilter = filter;
    return this;
  }

  build(): HTTPClient {
    return this.instance;
  }
}
