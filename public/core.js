var palindromeMessage = angular.module('palindromeMessage', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all message and show them
    $http.get('/api/messages')
        .success(function (data) {
            $scope.messages = data;
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createMessage = function () {
        $http.post('/api/messages', $scope.formData)
            .success(function (data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.messages = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    // delete a message after checking it
    $scope.deleteMessage = function (id) {
        $http.delete('/api/messages/' + id)
            .success(function (data) {
                $scope.messages = data;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

}