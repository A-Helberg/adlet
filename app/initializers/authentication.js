import AmazonAuthenticator from 'adlet/authenticators/amazon-authenticator';

export function initialize(container,application) {
  console.log("heeeeey?");
  container.register('authenticator:amazon-authenticator', AmazonAuthenticator);
  application.register('authenticator:amazon-authenticator', AmazonAuthenticator);
}

export default {
  name: 'authentication',
  before: 'simple-auth',
  initialize: initialize
};
