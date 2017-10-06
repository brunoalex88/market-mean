angular.module('market-mean', ['ngRoute', 'ngResource', 'angular-loading-bar'])
     .config(function($routeProvider) {   

		$routeProvider.when('/item', {
			templateUrl: 'partials/item.html',
			controller: 'ItemController'
        });
        
        $routeProvider.otherwise({redirectTo: '/'});

    });