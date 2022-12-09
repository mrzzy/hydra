/**
 * Hydra
 * CSRF Protection
 */

import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const CSRFCookie = "csrfToken";
const CSRFHeader = "x-csrf-token";

/**
 * Wrapper around fetch() to make a request with a csrf token.
 * CSRF token is randomly generated client side & double submitted via same origin cookie to prove
 * that that the request is not made cross origin
 */
export function csrfFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  // generate a random string as csrf token
  const csrfToken = Array.from(crypto.getRandomValues(new Uint8Array(128)))
    .map(c => c.toString())
    .join();

  // double submit csrfToken both as cookie & header to prove request is not csrf
  document.cookie = `csrfToken=${csrfToken}; SameSite=Strict; Secure;`;

  const headers = new Headers(init?.headers);
  headers.set(CSRFHeader, csrfToken);
  init ??= {};
  init.headers = headers;

  return fetch(input, init);
}

/**
 * Middleware to check the csrf token set by {@link csrfFetch()}.
 * Rejects request if
 */
export function checkCSRF(handler: NextApiHandler): NextApiHandler {
  return (req: NextApiRequest, res: NextApiResponse) => {
    const [cookie, header] = [req.cookies[CSRFCookie], req.headers[CSRFHeader]];
    console.log(req.headers);
    if (!(cookie && header)) {
      console.warn("checkCSRF: Rejecting request as it is missing CSRF tokens");
      res.status(403).end();
      return;
    }
    if (header !== cookie) {
      console.warn("checkCSRF: Rejecting possible CSRF request due to CSRF token mismatch.");
      res.status(403).end();
      return;
    }
    return handler(req, res);
  }
}
