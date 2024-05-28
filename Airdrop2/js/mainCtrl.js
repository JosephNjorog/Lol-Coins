angular.module('chatroom').controller('mainCtrl', function($scope, parseService) {
    $scope.messages = [];

    $scope.register = function() {
        parseService.register($scope.wallet, $scope.email)
            .then(function(response) {
                $scope.messages.push(response.data.message);
            })
            .catch(function(error) {
                $scope.messages.push(error.data.message);
            });
    };
});
