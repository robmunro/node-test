(function() {
  var Dog;

  Dog = (function() {

    function Dog(name) {
      this.name = name;
    }

    Dog.prototype.setName = function(newName) {
      return this.name = newName;
    };

    Dog.prototype.getName = function() {
      return this.name;
    };

    return Dog;

  })();

  module.exports = Dog;

}).call(this);
