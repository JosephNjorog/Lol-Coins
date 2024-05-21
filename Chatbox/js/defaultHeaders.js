angular.module('chatroom').factory('httpRequestInterceptor', function () {
  return {
    request: function (config) {
      config.headers['X-Parse-Application-Id'] = 'YOUR_APP_ID';
      config.headers['X-Parse-REST-API-Key'] = 'YOUR_REST_API_KEY';
      return config;
    }
  };
});
