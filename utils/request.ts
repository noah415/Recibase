export interface Resp {
  data?: any,
  error?: any,
}

export async function postReq(url: string, req: any): Promise<Resp> {
  let token: string;

  token = await getWriteToken();
  if (!token) {
    navigateTo('/login');
    return {}
  }

  const { data, pending, error, refresh } = await useFetch(url,{
    body: req,
    headers: [
      ['Authorization', 'Bearer ' + token]
    ],
    method: 'POST'
  });

  return {
    data: <any>data,
    error: error,
  }
}

export async function putReq(url: string, req: any) {
  let token: string;

  token = await getWriteToken();
  if (!token) {
    navigateTo('/login');
    return {}
  }

  const { data, pending, error, refresh } = await useFetch(url,{
    body: req,
    headers: [
      ['Authorization', 'Bearer ' + token]
    ],
    method: 'PUT'
  });

  return {
    data: <any>data,
    error: error,
  }
}

export async function deleteReq(url: string, req: any) {
  let token: string;

  token = await getWriteToken();
  if (!token) {
    navigateTo('/login');
    return {}
  }

  const { data, pending, error, refresh } = await useFetch(url,{
    body: req,
    headers: [
      ['Authorization', 'Bearer ' + token]
    ],
    method: 'DELETE'
  });

  return {
    data: <any>data,
    error: error,
  }
}

export async function getReq(url: string) {
  let token: string;

  token = await getReadToken();
  if (!token) {
    navigateTo('/login');
    return {}
  }

  const { data, pending, error, refresh } = await useFetch(url,{
    headers: [
      ['Authorization', 'Bearer ' + token]
    ],
    method: 'GET'
  });

  return {
    data: <any>data,
    error: error,
  }
}

export async function getWriteToken(): Promise<string> {
  const { data, pending, error, refresh } = await useFetch('http://localhost:5050/auth/write',{
    headers: [
      ['Authorization', 'Bearer ' + localStorage.refreshToken]
    ],
    method: 'GET'
  });

  if (error.value) {
    console.log(error.value?.data.message);
    return '';
  } else {
    const resp: { writeToken: string } = <{ writeToken: string }> data.value;
    return resp.writeToken;
  }
}

export async function getReadToken(): Promise<string> {
  const { data, pending, error, refresh } = await useFetch('http://localhost:5050/auth/read',{
    headers: [
      ['Authorization', 'Bearer ' + localStorage.refreshToken]
    ],
    method: 'GET'
  });

  if (error.value) {
    return '';
  } else {
    const resp: { readToken: string } = <{ readToken: string }> data.value;
    return resp.readToken;
  }
}