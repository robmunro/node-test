(function() {
  var Dog, myDog;

  Dog = require('./include.js');

  myDog = new Dog();

  myDog.setName('Ruffy');

  alert(myDog.getName() + ' is soft and cuddlyzzzzz');

}).call(this);
