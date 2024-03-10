import { optionsType } from "./_types/types";
import { methodFactory } from "./utils/methodFactory";

export class CkanClient {
  private prepareRequest(options: optionsType) {
    const { apiKey, headers } = options;
    let _headers: { [key: string]: string } = {
      "content-type": "application/json"
    };

    if (apiKey) {
      _headers["Authorization"] = apiKey;
    }

    if (headers) {
      _headers = { ..._headers, ...headers };
    }

    return _headers;
  }

  private prepareUrl(dms: string, action: string, query?: string) {
    if (!!query)
      return `${dms}/api/3/action/${action}?${query}`
    return `${dms}/api/3/action/${action}`
  }

  async get(dms: string, action: string, options: { apiKey?: string, headers?: { [key: string]: string }, query?: string }) {
    const { query } = options
    const headers = this.prepareRequest(options)
    const url = this.prepareUrl(dms, action, query)
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    return methodFactory(response);
  }

  async post(dms: string, action: string, options: { apiKey?: string, headers?: { [key: string]: string }, body?: string }) {
    const { body } = options
    const headers = this.prepareRequest(options)
    const url = this.prepareUrl(dms, action)
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });
    return methodFactory(response);
  }

  async delete(dms: string, action: string, options: { apiKey?: string, headers?: { [key: string]: string }, body?: string }) {
    const { body } = options
    const headers = this.prepareRequest(options)
    const url = this.prepareUrl(dms, action)
    const response = await fetch(url, {
      method: "DELETE",
      headers: headers,
      body: JSON.stringify(body),
    });
    return methodFactory(response);
  }
}