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
            .then(function (response) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.messages = response.data;
                console.log(data);
            },function (response) {
                if (response.status === 400){
                    $scope.formData.error = response.data;
                }
                console.log('Error: ' + response);
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

    $scope.getMessage = function(id) {
        $http.get('/api/messages/'+id)
            .success(function (data) {
                $scope.selectedMessage = data;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.saveMessage = function (message) {
        $http.post('/api/messages/' + message._id,message)
            .success(function (data) {
                $scope.messages = data;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };
}