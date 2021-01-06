// const sub = require('./creates/subscription');
// const customer = require('./creates/customer');
// const invoice = require('./creates/invoice');
const resthook = require('./triggers/resthook')
const authentication = require('./authentication');

const includeApiKey = (request, z, bundle) => {
  if (bundle.authData.apiKey) {
    request.params = request.params || {};
    request.headers.Authorization = Buffer.from(bundle.authData.apiKey).toString('base64');
  }
  return request;
};

const App = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication: authentication,

  beforeRequest: includeApiKey,

  afterResponse: [],

  resources: {},

  // If you want your trigger to show up, you better include it here!
  triggers: {
    [resthook.key]: resthook
  },

  // If you want your searches to show up, you better include it here!
  searches: {},

  // If you want your creates to show up, you better include it here!
  creates: {
    // [customer.key]: customer,
    // [sub.key]: sub,
    // [invoice.key]: invoice
  }
};

// Finally, export the app.
module.exports = App;