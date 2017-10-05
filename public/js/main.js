angular.module('market-mean', ['ngRoute'])
     .config(function($routeProvider) {   

		$routeProvider.when('/item', {
			templateUrl: 'partials/item.html',
			controller: 'ItemController'
        });
        
        $routeProvider.otherwise({redirectTo: '/'});

    });