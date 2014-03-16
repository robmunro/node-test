function Dog(name) {
    this.name = name;

    this.setName = function(newName) {
        this.name = newName;
    }

    this.getName = function() {
        return this.name;
    }
};

module.exports = Dog;
