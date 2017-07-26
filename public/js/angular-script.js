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
    formData.rating = formData.rating == 'Rating' ? '1' : formData.rating;
    $http.post('/web/faculty/review', formData).then(function(response){
      Materialize.toast('Post Added!', 1000);
      $scope.reviews.push(response.data.result);
    });
  }
  $scope.getPosts = function(){
    $http.get('/web/faculty/review?id=' + $scope.id).then(function(response){
      $scope.reviews = response.data.result;
    });
  }
  $scope.follow = function(shouldFollow){
    if(shouldFollow){
      $http.get('/web/faculty/follow?id=' + $scope.id).then(function(response){
        Materialize.toast('Following User Now!', 1000);
      })
    } else{

    }
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
    formData.rating = formData.rating == 'Rating' ? '1' : formData.rating;
    $http.post('/web/institute/review', formData).then(function(response){
      Materialize.toast('Post Added!', 1000);
      $scope.reviews.push(response.data.result);
    });
  }
  $scope.getPosts = function(){
    $http.get('/web/institute/review?id=' + $scope.id).then(function(response){
      $scope.reviews = response.data.result;
    });
  }
  $scope.follow = function(shouldFollow){
    if(shouldFollow){
      $http.get('/web/institute/follow?id=' + $scope.id).then(function(response){
        Materialize.toast('Following User Now!', 1000);
      })
    } else{

    }
  }
});

app.controller('registerController', function($scope){

})
