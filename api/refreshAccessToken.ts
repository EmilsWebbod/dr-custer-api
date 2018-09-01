import apiRequest from './apiRequest';
import CrudHeaders from '../src/crudProvider/crudHeaders';

interface AccessToken {
  token: string;
  expires: Date;
  data: any;
}

async function refreshAccessToken(): Promise<void> {
  const crudHeader = new CrudHeaders();
  try {
    const endPoint = crudHeader.authorization.endPoint;
    const refreshToken = crudHeader.authorization.refreshToken;

    const response: AccessToken = await apiRequest<AccessToken>(endPoint, {
      method: 'POST',
      noAuth: true,
      data: { refreshToken }
    });

    crudHeader.setAuthorization({
      token: response.token
    });
  } catch (e) {
    if (e.status === 401) {
      location.href = '/';
      crudHeader.clearAutorization();
    }
  }
}

export default refreshAccessToken;
