app.controller('HomeController', function() {
  const token = window.localStorage.getItem('token')
  window.location.href = token ? '#!/dashboard' : '#!/login'
})