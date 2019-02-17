import axios from 'axios';

// const apiEndpoint = 'https://luppiter.lynlab.co.kr';
const apiEndpoint = 'http://localhost:1323';

function query(queryString, accessToken) {
  const configs = {
    params: { query: `query{${queryString}}` },
    headers: { 'Content-Type': 'application/graphql' },
  };
  if (accessToken) {
    configs.headers.Authorization = `Bearer ${accessToken}`;
  }

  return axios.get(`${apiEndpoint}/apis/graphql`, configs)
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

  return axios.post(`${apiEndpoint}/apis/graphql`, `mutation{${mutationString}}`, configs)
    .then((res) => {
      if (res.data.errors) {
        throw Error(res.data.errors[0].message);
      }
      return res.data.data;
    });
}

function apiQuery(queryString, apiKey) {
  const configs = {
    params: { query: `query{${queryString}}` },
    headers: { 'Content-Type': 'application/graphql' },
  };
  if (apiKey) {
    configs.headers['X-Api-Key'] = apiKey;
  }

  return axios.get(`${apiEndpoint}/apis/graphql`, configs)
    .then((res) => {
      if (res.data.errors) {
        throw Error(res.data.errors[0].message);
      }
      return res.data.data;
    });
}

function apiMutation(mutationString, apiKey) {
  const configs = {
    headers: { 'Content-Type': 'application/graphql' },
  };
  if (apiKey) {
    configs.headers['X-Api-Key'] = apiKey;
  }

  return axios.post(`${apiEndpoint}/apis/graphql`, `mutation{${mutationString}}`, configs)
    .then((res) => {
      if (res.data.errors) {
        throw Error(res.data.errors[0].message);
      }
      return res.data.data;
    });
}

function uploadFile(file, bucketName, fileName) {
  const configs = {
    headers: { 'Content-Type': 'multipart/form-data' },
  };

  const formData = new FormData();
  formData.set('item', file);
  return axios.post(`${apiEndpoint}/files/${bucketName}/${fileName}`, formData, configs);
}

export { query, mutation, apiQuery, apiMutation, uploadFile };
