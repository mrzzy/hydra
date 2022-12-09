/**
 * Hydra UI
 * API
 * Proxies
 */

import type { NextApiRequest, NextApiResponse } from 'next'
import { checkCSRF } from '../../csrf'
import { KVStore, JSONStore } from '../../storage'

/** Storage / Request representation of a Proxy */
export interface ProxyData {
  host: string
  port: number
  password: string
  cipher: string
}

/** Wrapper around {@link ProxyData} providing helper methods */
export class Proxy {
  data: ProxyData

  constructor(data: ProxyData) {
    this.data = data;
  }
  address(): string {
    return `${this.data.host}:${this.data.port}`;
  }
  json(): string {
    return JSON.stringify({
      ...this.data,
      password: null,
    });
  }
}
function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const store: KVStore = new JSONStore("proxies.json");

  switch (req.method) {
    // proxy form submit: register new server
    case 'PUT':
      const proxy = new Proxy(JSON.parse(req.body) as ProxyData);
      store.set(proxy.address(), proxy.data);
      res.status(200).end();
      break;
    default:
      // unsupported request method
      res.status(405).setHeader("Allows", "PUT").end();
  }
}

export default checkCSRF(handler);
