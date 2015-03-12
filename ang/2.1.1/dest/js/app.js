"use strict";angular.module("OWMApp",["ngRoute"]),angular.module("OWMApp").value("owmCities",["New York","Dallas","Chicago"]),angular.module("OWMApp").run(["$rootScope","$location",function(r,o){r.$on("$routeChangeError",function(){o.path("/error")})}]),angular.module("OWMApp").config(["$routeProvider",function(r){r.when("/",{templateUrl:"partials/home.html",controller:"HomeCtrl as Home"}).when("/cities/:city",{templateUrl:"partials/city.html",controller:"CityCtrl as City",resolve:{city:["owmCities","$route","$location",function(r,o,e){var t=o.current.params.city;return-1===r.indexOf(t)?void e.path("/error"):t}]}}).when("/error",{template:"<p>Error - Page Not Found</p>"}).otherwise("/error")}]),angular.module("OWMApp").controller("HomeCtrl",[function(){this.welcomeMessage="Welcome Home"}]),angular.module("OWMApp").controller("CityCtrl",["city",function(r){this.city=r}]);