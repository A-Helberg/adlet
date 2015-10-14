var adletLogin = function() {
  var secretAccessKey = "";
  var accessKeyId = "";

  visit('/login');

  andThen(function(){
    fillIn('.login__secret-access-key', secretAccessKey);
    fillIn('.login__access-key-id', accessKeyId);
    click('.login__button');
  });
};

export default adletLogin;
