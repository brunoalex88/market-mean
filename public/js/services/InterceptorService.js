angular.module('market-mean').factory('InterceptorService', function($q, $location) {  
    
        var interceptor = {
            responseError: function(response) {
                if (response.status == 401) {
                    $location.path('/auth');
                }
                return $q.reject(response);
            }
        }
    
        return interceptor;
    });