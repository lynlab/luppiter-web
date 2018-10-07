import axios from 'axios';

function query(queryString, accessToken) {
  const configs = {
    params: { query: `query{${queryString}}` },
    headers: { 'Content-Type': 'application/graphql' },
  };
  if (accessToken) {
    configs.headers.Authorization = `Bearer ${accessToken}`;
  }

  return axios.get(`https://luppiter.lynlab.co.kr/graphql`, configs)
    .then((res) => {
      if (res.data.errors) {
        throw Error(res.data.errors[0].message);
      }
      return res.data.data;
    });
}

function mutation(mutationString, accessToken) {
  const configs = {
    headers: { 'Content-Type': 'application/graphql' },
  };
  if (accessToken) {
    configs.headers.Authorization = `Bearer ${accessToken}`;
  }

  return axios.post('https://luppiter.lynlab.co.kr/graphql', `mutation{${mutationString}}`, configs)
    .then((res) => {
      if (res.data.errors) {
        throw Error(res.data.errors[0].message);
      }
      return res.data.data;
    });
}

export { query, mutation };
