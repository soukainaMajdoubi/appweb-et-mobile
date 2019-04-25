app.controller('RegisterController', function($scope, $http) {
  $scope.title = 'Inscription'
  $scope.submitLabel = 'Creer un compte'
  $scope.username = ''
  $scope.password = ''
  $scope.error = ''
  $scope.submit = async function() {
    const user = {
      username: $scope.username,
      password: $scope.password,
    }
    try {
      const res = await $http.post('/api/users', user)
      const {error, success} = res.data
      if (success) {
        window.location.href = '#!/login'
      } else {
        $scope.error = error
      }
    } catch (err) {
      $scope.error = 'Erreur'
    }
  }
})
