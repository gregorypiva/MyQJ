import { router } from '@/router';

async function handleResponse(response: any) {
  try {
    // let error = (data && data.message) || response.statusText;
    const text = await response.text();
    if (!response.ok) {
      if (response.status === 401) {
        return router.push('/login');
      }
      return Promise.reject(JSON.parse(text));
    }
    const data = text && JSON.parse(text);
    return Promise.resolve(data);
  } catch (e) {
    return Promise.reject('Erreur de connexion.');
  }
}

function requestOptions(method: string = 'GET', body?: any, headers?: any) {
  const data = method === 'GET' ? null : {body: JSON.stringify(body)};
  return {
    method,
    headers: headers || { 'Content-Type': 'application/json' },
    ...data,
  };
}

export const util = {
  handleResponse,
  requestOptions,
};
