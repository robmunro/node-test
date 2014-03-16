var User = function (testVal) {
  this.squared = testVal * testVal;
};

User.prototype.getSquared = function () {
  return this.squared
};

module.exports = User;
