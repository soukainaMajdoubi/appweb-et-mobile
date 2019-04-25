app.controller('tasksController', function($scope, $http,$routeParams) {
    const token = window.localStorage.getItem('token')
    if (!token) {
      return window.location.href = '#!/login'
    }
    const httpConfig = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
    $scope.tasks=[]
    $scope.newTache=''
    $scope.listId=''
    $scope.error = ''
    
    $scope.addtask = async function() {
        const task = {
          listId:$routeParams.id,
          name: $scope.newTache,
          done: false,
        }
        try {
         const res = await $http.post('/api/tasks',task,httpConfig)
         
         const {data, error, success} = res.data
          if (success) {
            $scope.newTache=''
            loadtasks()
          } else {
               $scope.error = error
          }
        } catch (err) {
            $scope.error = 'Erreur'
        }
      }
      $scope.back = async function() {
        return window.location.href = '#!/dashboard'

      }
      $scope.deleteTask = async function(id){
        try {
          const res = await $http.delete('/api/tasks/'+ id, httpConfig)
          const {data, error, success} = res.data
          if (success) {
            loadtasks()
          } else {
            $scope.error = error
          }
        } catch (err) {
          $scope.error = 'Erreur'
        }
      }
      $scope.updateTask = async function(id){
       
        try {
          const res = await $http.put('/api/tasks/'+ id, httpConfig)
          const {data, error, success} = res.data
          if (success) {
            loadtasks()
          } else {
            $scope.error = error
          }
        } catch (err) {
          $scope.error = 'Erreur'
        }
      }
      const loadtasks = async function() {
        try {
          const res = await $http.get('/api/tasks/' + $routeParams.id ,httpConfig)
          const {data, error, success} = res.data
          if (success) {
            $scope.tasks = data
          } else {
            $scope.error = error
          }
        } catch (err) {
          $scope.error = 'Erreur'
        }
        $scope.$digest()
      }
    
      loadtasks()
})    