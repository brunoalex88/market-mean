angular.module('market-mean').factory('Buy', function($resource) {
    return $resource('/buy', {});
});