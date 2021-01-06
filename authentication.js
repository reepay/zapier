const testAuth = (z /*, bundle*/) => {
  return z.request({
    url: 'https://api.reepay.com/v1/account',
  }).then((response) => {
    if (response.status === 401) {
      throw new Error('The API Key you supplied is invalid');
    }
    if (response.status === 400) {
      throw new Error('Not a valid private API key')
    }
    return response.json;
  });
};

module.exports = {
  type: 'custom',
  fields: [
    { key: 'apiKey', label: 'API Key', required: true, type: 'string' }
  ],
  test: testAuth,
  connectionLabel: (z, bundle) => {
    return bundle.inputData.username;
  },
};