var app = angular.module('app', []);
app.controller('facultyController', function($scope, $http){
  $scope.reviewRatingValues = ['Rating', '1', '2', '3', '4', '5'];
  $scope.init = function(id){
    $scope.id = id;
    $scope.getPosts();
  }
  $scope.addReview = function(){
    var formData = {
      review: $scope.reviewText,
      id: $scope.id,
      rating: $scope.reviewRating
    }
    $http.post('/web/faculty/review', formData).then(function(response){
      Materialize.toast('Post Added!', 1000);
      $scope.getPosts();
    });
  }
  $scope.getPosts = function(){
    $http.get('/web/faculty/review?id=' + $scope.id).then(function(response){
      console.log(response.data);
    })
  }
});

app.controller('instituteController', function($scope, $http){
  $scope.reviewRatingValues = ['Rating', '1', '2', '3', '4', '5'];
  $scope.init = function(id){
    $scope.id = id;
    $scope.getPosts();
  }
  $scope.addReview = function(){
    var formData = {
      review: $scope.reviewText,
      id: $scope.id,
      rating: $scope.reviewRating
    }
    $http.post('/web/institute/review', formData).then(function(response){
      Materialize.toast('Post Added!', 1000);
      $scope.getPosts();
    });
  }
  $scope.getPosts = function(){
    $http.get('/web/institute/review?id=' + $scope.id).then(function(response){
      console.log(response.data);
    })
  }
});

app.controller('registerController', function($scope){

})
