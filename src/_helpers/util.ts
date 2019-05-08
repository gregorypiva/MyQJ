import { router } from '@/router';

async function handleResponse(response: any) {
  try {
    // let error = (data && data.message) || response.statusText;
    const text = await response.text();
    if (!response.ok) {
      if (response.status === 401) {
        return router.push('/login');
      } else if (response.status === 400) {
        return Promise.reject(JSON.parse(text));
      } else if (response.status === 500) {
        return Promise.reject('Une erreur technique s\'est produite.');
      } else if (response.status === 404) {
        return Promise.reject('Erreur lors du chargement, veuillez réessayer');
      }
      return Promise.reject(text);
    }
    const data = text && JSON.parse(text);
    return Promise.resolve(data);
  } catch (e) {
    return Promise.reject('Erreur de connexion.');
  }
}

function requestOptions(body: any, method?: string, headers?: any) {
  const data = method === 'GET' ? null : {body: JSON.stringify(body)};
  return {
    method: method || 'GET',
    headers: headers || { 'Content-Type': 'application/json' },
    ...data,
  };
}

export const util = {
  handleResponse,
  requestOptions,
};
