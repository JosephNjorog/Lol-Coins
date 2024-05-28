angular.module('chatroom').service('parseService', function($http) {
    this.register = function(wallet, email) {
        return $http.post('/register', { wallet: wallet, email: email });
    };
});
