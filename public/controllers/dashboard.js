app.controller('DashboardController', function($scope, $http) {
  const token = window.localStorage.getItem('token')
  if (!token) {
    return window.location.href = '#!/login'
  }
  const httpConfig = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  }
  $scope.lists = []
  $scope.newListName = ''
  $scope.newTache=''
  $scope.error = ''
 
  $scope.addList = async function() {
    try {
      const res = await $http.post('/api/lists', {name: $scope.newListName}, httpConfig)
      const {data, error, success} = res.data
      if (success) {
        $scope.newListName = ''
        loadLists()
      } else {
        $scope.error = error
      }
    } catch (err) {
      $scope.error = 'Erreur'
    }
  }
  $scope.showtask =  function (id){
    return window.location.href = '#!/tasks/' + id
  }
  $scope.deleteList = async function(id){
    try {
      const res = await $http.delete('/api/lists/'+ id, httpConfig)
      const {data, error, success} = res.data
      if (success) {
        loadLists()
      } else {
        $scope.error = error
      }
    } catch (err) {
      $scope.error = 'Erreur'
    }
  }
  const loadLists = async function() {
    try {
      const res = await $http.get('/api/lists', httpConfig)
      const {data, error, success} = res.data
      if (success) {
        $scope.lists = data
      } else {
        $scope.error = error
      }
    } catch (err) {
      $scope.error = 'Erreur'
    }
    $scope.$digest()
  }

  loadLists()
  
   
 
  
 
})
