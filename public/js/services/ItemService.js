angular.module('market-mean').factory('Item', function($resource) {
    return $resource('/item/:id', {});
});