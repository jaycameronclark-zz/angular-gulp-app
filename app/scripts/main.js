'use strict';

var angular = require('angular');
//var charts = require('./vendor/charts.min');
var HomeCtrl = require('./controllers/HomeCtrl');

var app = angular.module('app', []);
app.controller('HomeCtrl', ['$scope', HomeCtrl]);