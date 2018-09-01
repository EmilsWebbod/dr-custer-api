import { clearStorage, loadFromStorage, saveToStorage } from '../../api/localStorage';

export type AuthorizationTypes = 'Basic' | 'Bearer';

interface IHeaders {
  [key: string]: string;
}

export interface IAuthorization {
  endPoint: string;
  type?: AuthorizationTypes;
  token?: string;
  refreshToken?: string;
}

export interface ICrudHeadersProps {
  url: string;
  headers?: IHeaders;
  noAuth?: boolean;
  authorization?: IAuthorization;
  logout?: () => void;
}

const initialAuthorization: IAuthorization = {
  endPoint: '',
  type:     'Basic'
};

let instance: CrudHeaders;
export default class CrudHeaders {
  url: string = '';
  headers: object = {};
  authorization: IAuthorization = initialAuthorization;
  noAuth?: boolean = false;
  logout: () => void;

  constructor(params?: ICrudHeadersProps, updateParams?: boolean) {
    const loadedAuth = loadFromStorage('authorization');
    if (
      loadedAuth &&
      (loadedAuth.token && loadedAuth.token !== '') &&
      params &&
      params.authorization
    ) {
      delete params.authorization.token;
    }

    if (!instance) {
      if (!params) {
        const error = 'Failed to initialize CrudHeader. Given no Params';
        console.error(error);
        throw error;
      }
      instance = this;
      this.setParams(params);
    } else if (updateParams && params) {
      instance.setParams(params);
    }

    return instance;
  }

  public setAuthorization(auth: Partial<IAuthorization>) {
    const loadedAuth = loadFromStorage('authorization') || {};

    if (loadedAuth && loadedAuth.token !== '') {
      this.authorization = {
        ...loadedAuth,
        ...auth
      };
    } else {
      this.authorization = {
        ...this.authorization,
        ...auth
      };
    }
    saveToStorage('authorization', this.authorization);
  }

  public clearAutorization() {
    this.authorization = {
      ...this.authorization,
      token:        '',
      refreshToken: ''
    };
    clearStorage();
    if (typeof this.logout === 'function') {
      this.logout();
    }
  }

  private setParams(params: ICrudHeadersProps) {
    this.url = params.url || '';
    this.headers = params.headers || {};
    this.noAuth = params.noAuth || false;
    this.logout = params.logout || this.logout;

    if (!this.noAuth && params.authorization) {
      this.setAuthorization(params.authorization);
    }
  }
}
