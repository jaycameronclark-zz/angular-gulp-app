'use strict';

var angular = require('angular');
//var charts = require('./vendor/charts.min');
var WelcomeCtrl = require('./controllers/WelcomeCtrl');

var app = angular.module('myApp', []);
app.controller('WelcomeCtrl', ['$scope', WelcomeCtrl]);