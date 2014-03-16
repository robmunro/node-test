var express = require('express')

var User = require('./included')

newUser = new User(120)

console.log(newUser.getSquared(), 'yeah booiiii')
