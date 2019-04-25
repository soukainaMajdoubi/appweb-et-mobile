app.controller('LoginController', function($scope, $http) {
  $scope.title = 'Se connecter'
  $scope.submitLabel = 'Se connecter'
  $scope.username = ''
  $scope.password = ''
  $scope.error = ''
  $scope.submit = async function() {
    const user = {
      username: $scope.username,
      password: $scope.password,
    }
    try {
      const res = await $http.post('/api/auth', user)
      const {data, error, success} = res.data
      if (success) {
        window.localStorage.setItem('token', data.token)
        window.location.href = '#!/dashboard'
      } else {
        $scope.error = error
      }
    } catch (err) {
      $scope.error = 'Erreur'
    }
  }
})