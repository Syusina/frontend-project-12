const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  usersPath: () => [apiPath, 'data'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
  loginPagePath: () => '/login',
  chatPagePath: () => '/',
  signupPagePath: () => '/signup',
};
