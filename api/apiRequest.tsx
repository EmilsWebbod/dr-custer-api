import * as qs from 'qs';
import refreshAccessToken from './refreshAccessToken';
import CrudHeaders from '../src/crudProvider/crudHeaders';

export interface IErrorResponse {
  error: string;
  code: number;
}

export interface IError {
  status: number;
  message: string | number;
  data?: any;
}

interface RequestData {
  [payload: string]: any;
}

interface RequestOpts {
  method?: string;
  data?: RequestData;
  headers?: any;
  noAuth?: boolean;
  multipart?: boolean;
  notificationMessage?: string;
  noJSON?: boolean;
}

async function apiRequest<T>(endpoint: string, opts?: RequestOpts): Promise<T> {
  const crudHeader = new CrudHeaders();
  const API_URL = crudHeader.url;
  const extraHeaders = { ...crudHeader.headers };

  opts = opts || { method: 'GET' };

  if (!('method' in opts)) {
    opts.method = 'GET';
  }

  const queryParams =
    opts.method === 'GET' ? `/?${qs.stringify(opts.data)}` : '';

  let headers = opts.headers || {};
  let body;

  if (opts.method !== 'GET') {
    if (!opts.multipart) {
      headers['Content-Type'] = 'application/json';
    }

    if (opts && opts.data !== undefined) {
      body = opts.multipart ? createForm(opts.data) : JSON.stringify(opts.data);
    }
  }

  if (!(crudHeader.noAuth || opts.noAuth)) {
    if (!crudHeader.authorization.token) {
      throw createError('No authorization.token provided', 500);
    }
    headers.Authorization = `${crudHeader.authorization.type} ${
      crudHeader.authorization.token
      }`;
  }

  headers = {
    ...headers,
    ...extraHeaders
  };

  try {
    const url = `${API_URL}/${endpoint}${queryParams}`;
    let responseData: any = {};

    const response = await fetch(url, {
      method:      opts.method,
      credentials: 'include',
      headers,
      body
    });

    if (response.status <= 400) {
      responseData = opts.noJSON ? response : await response.json();
    }

    switch (response.status) {
      case 200:
      case 201:
      case 202:
        return responseData;
      case 400:
        throw createError('Feil input til server', 400, responseData.error);
      case 401:
        throw createError(
          'Authorisering feilet. Logg ut',
          401,
          responseData.error
        );
      case 403:
        await refreshAccessToken();
        return await apiRequest<T>(endpoint, opts);
      case 404:
        throw createError('Fant ikke ressurs', 404, url);
      default:
        throw createError(response.statusText, response.status);
    }
  } catch (e) {
    switch (e.message) {
      case 'Failed to fetch':
        console.error(`Failed to fetch!!`, e);
        break;
      case 400:
        console.error('Feil input til server: ' + e.data, 400);
        break;
      case 404:
        console.error('Server kjente ikke igjen url: ' + e.data, 404);
        break;
      default:
        console.error({ message: e.message, status: e.status });
        break;
    }
    throw e;
  }
}

function createForm(data: RequestData): FormData {
  const formData = new FormData();

  for (const k in data) {
    if (k === 'files' && Array.isArray(data[k])) {
      data[k].map((file: any) => formData.append(k, file));
    } else {
      formData.append(k, data[k]);
    }
  }

  return formData;
}

function createError(
  message: string | number,
  status: number,
  data?: any
): IError {
  return {
    message,
    status,
    data
  };
}

export default apiRequest;
export { createError };
