app.controller('menuController', function($scope, $http) {

    $scope.deconnecter = function (){
     window.localStorage.setItem('token', "" )
     window.location.reload()
    }
})    
   
