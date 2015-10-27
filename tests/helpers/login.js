import config from '../../config/environment';

var adletLogin = function() {
  var secretAccessKey = config.SECRET_ACCESS_KEY;
  var accessKeyId = config.ACCESS_KEY_ID;

  visit('/login');

  andThen(function(){
    fillIn('.login__secret-access-key', secretAccessKey);
    fillIn('.login__access-key-id', accessKeyId);
    click('.login__button');
  });

  andThen(function(assert) {
    visit('/admin/articles');
  });
};

export default adletLogin;
