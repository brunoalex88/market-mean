angular.module('market-mean', ['ngRoute', 'ngResource'])
     .config(function($routeProvider) {   

		$routeProvider.when('/item', {
			templateUrl: 'partials/item.html',
			controller: 'ItemController'
        });
        
        $routeProvider.otherwise({redirectTo: '/'});

    });