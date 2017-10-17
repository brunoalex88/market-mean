angular.module('market-mean').factory('ItemResource', function($resource) {
    return $resource('/item/:id', {});
});