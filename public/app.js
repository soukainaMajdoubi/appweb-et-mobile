/**
 * Routes:
 *    /             Redirects to /login or /dashboard
 *    /login        Login page
 *    /register     Create a new user
 *    /dashboard    Lists and tasks
 */

const app = angular.module('app', [
  'ngRoute',
])

app.config(function ($routeProvider) {
  $routeProvider
    .when('/home', {
      template: 'En cours de chargement',
      controller: 'HomeController'
    })
    .when('/login', {
      templateUrl: '/views/form.html',
      controller: 'LoginController'
    })
    .when('/register', {
      templateUrl: '/views/form.html',
      controller: 'RegisterController'
    })
    .when('/dashboard', {
      templateUrl: '/views/dashboard.html',
      controller: 'DashboardController'
    })
    .when('/tasks/:id', {
      templateUrl: '/views/task.html',
      controller: 'tasksController'
    })
    .otherwise('/home')
})

