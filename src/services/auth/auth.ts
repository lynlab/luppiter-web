import fetch, { Response } from 'node-fetch';
import jwt from 'jsonwebtoken';

import constants from '../../constants';

export type Application = {
  appId: string;
  name: string;
  createdAt: Date;
  owner: { uuid: string, username: string };
}

export type ApiToken = {
  accessKey: string;
  secretKey: string;
  expireAt: Date;
}

export type Account = {
  uuid: string;
  username: string;
  email: string;
  createdAt: Date;
}

export class UnauthorizedError extends Error {}
export class UnknownError extends Error {}

interface GetApplicationResponse {
  app_id: string;
  name: string;
  created_at: string;
  owner: { uuid: string, username: string };
}

interface GetAppAuthorizationResponse {
  authorized: boolean;
}

interface CreateApiTokenResponse {
  access_key: string;
  secret_key: string;
  expire_at: string;
}

interface CreateAccountResponse {
  uuid: string;
  username: string;
  email: string;
  created_at: string;
}

export default class AuthService {
  static async getApplication(appId: string): Promise<Application | null> {
    const res = await AuthService.get<GetApplicationResponse>(`/v1/applications/${appId}`);
    return res === null ? null : {
      appId: res.app_id, name: res.name, createdAt: new Date(res.created_at), owner: res.owner,
    };
  }

  static async listApplications(): Promise<Application[]> {
    const apiToken = this.getIssuedApiToken(constants.CONSOLE_APP_ID);
    const res = await AuthService.get<GetApplicationResponse[]>('/v1/applications', apiToken);
    return res.length === 0 ? [] : res.map((i) => ({
      appId: i.app_id, name: i.name, createdAt: new Date(i.created_at), owner: i.owner,
    }));
  }

  static async createApplication(name: string, redirectUrl?: string): Promise<Application> {
    const apiToken = this.getIssuedApiToken(constants.CONSOLE_APP_ID);
    const body = { name, redirectUrl };
    const res = await AuthService.post<GetApplicationResponse>('/v1/applications', body, apiToken);
    return {
      appId: res.app_id, name: res.name, createdAt: new Date(res.created_at), owner: res.owner,
    };
  }

  static async createAccount(idToken: string, username: string): Promise<Account> {
    const res = await AuthService.post<CreateAccountResponse>('/v1/accounts/google', { id_token: idToken, username });
    return {
      username: res.username, uuid: res.uuid, email: res.email, createdAt: new Date(res.created_at),
    };
  }

  static async getAppAuthorization(appId: string): Promise<boolean> {
    const apiToken = this.getIssuedApiToken(constants.CONSOLE_APP_ID);
    const res = await AuthService.get<GetAppAuthorizationResponse>(`/v1/applications/${appId}/authorization`, apiToken);
    return res.authorized;
  }

  static async createAppAuthorization(appId: string): Promise<void> {
    const apiToken = this.getIssuedApiToken(constants.CONSOLE_APP_ID);
    await AuthService.post(`/v1/applications/${appId}/authorization`, null, apiToken);
  }

  static async signIn(appId: string, idToken: string): Promise<ApiToken> {
    const res = await AuthService.post<CreateApiTokenResponse>('/v1/api_tokens/google', { id_token: idToken, app_id: appId });
    const apiToken = {
      accessKey: res.access_key, secretKey: res.secret_key, expireAt: new Date(res.expire_at),
    };
    localStorage.setItem(`luppiter.auth.${appId}`, JSON.stringify(apiToken));

    return apiToken;
  }

  static signOut(appId: string) {
    localStorage.removeItem(`luppiter.auth.${appId}`);
  }

  static hasSignedIn(appId: string): boolean {
    return !!localStorage.getItem(`luppiter.auth.${appId}`);
  }

  static getIssuedApiToken(appId: string): ApiToken {
    const apiToken = localStorage.getItem(`luppiter.auth.${appId}`);
    if (!apiToken) {
      throw new UnauthorizedError();
    }

    const parsed = JSON.parse(apiToken);
    return {
      accessKey: parsed.accessKey, secretKey: parsed.secretKey, expireAt: new Date(parsed.expireAt)
    };
  }

  private static async get<T>(path: string, apiToken?: ApiToken): Promise<T> {
    const options = { headers: {} };
    if (apiToken) {
      options.headers = { Authorization: `Bearer ${jwt.sign({ access_key: apiToken.accessKey }, apiToken.secretKey)}` };
    }

    return new Promise<T>((resolve, reject) => {
      fetch(`https://auth.luppiter.dev/api${path}`, options)
        .then((res) => ((res.status < 300) ? resolve(res.json()) : reject(this.handleError(res))))
        .catch((e) => reject(e));
    });
  }

  private static async post<T>(path: string, body: object | null, apiToken?: ApiToken): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; encoding=utf-8', Authorization: '' },
        body: JSON.stringify(body),
      };
      if (apiToken) {
        options.headers.Authorization = `Bearer ${jwt.sign({ access_key: apiToken.accessKey }, apiToken.secretKey)}`;
      }

      fetch(`https://auth.luppiter.dev/api${path}`, options)
        .then((res) => ((res.status < 300) ? resolve(res.json()) : reject(this.handleError(res))))
        .catch((e) => reject(e));
    });
  }

  private static handleError(res: Response): Error {
    switch (res.status) {
      case 400:
        return new UnknownError();
      case 401:
        return new UnauthorizedError();
      default:
        return new UnknownError();
    }
  }
}
