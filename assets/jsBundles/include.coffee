class Dog
  constructor: (name) ->
    @name = name

  setName: (newName) ->
      this.name = newName

  getName: ->
      return this.name

module.exports = Dog
