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
    $http.get('/web/faculty/post').then(function(response){
      $scope.posts = response.data.result;
      console.log($scope.posts);
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
  $scope.postFeed = function(){
    $http.post('/web/faculty/post', {text: $scope.postText}).then(function(response){
      $scope.posts.unshift(response.data.result);
    });
  }

  $scope.likePost = function(_id){
    console.log(_id);
    $http.post('/web/faculty/post/like', {id: _id}).then(function(response){
      console.log(response);
    });
  }

  $scope.commentFeed = function(_id){
    $http.post('/web/faculty/post/comment', {id: _id, text: $scope.commentText}).then(function(response){
      Materialize.toast('asd', 1000);
    })
  }
});

app.controller('instituteController', function($scope, $http){
  $scope.reviewRatingValues = ['Rating', '1', '2', '3', '4', '5'];
  $scope.init = function(id){
    $scope.id = id;
    $scope.getPosts();
  }

  $scope.likePost = function(_id){
    console.log(_id);
    $http.post('/web/faculty/post/like', {id: _id}).then(function(response){
      console.log(response);
    });
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
    $http.get('/web/institute/post').then(function(response){
      $scope.posts = response.data.result;
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
  $scope.postFeed = function(){
    $http.post('/web/institute/post', {text: $scope.postText}).then(function(response){
      $scope.posts.unshift(response.data.result);
    })
  }

  $scope.commentFeed = function(_id){
    $http.post('/web/institute/post/comment', {id: _id, text: $scope.commentText}).then(function(response){
      Materialize.toast('asd', 1000);
    })
  }

});

app.controller('studentController', function($scope, $http){
  $scope.init = function(id){
    $scope.id = id;
    $scope.getPosts();
  }
  $scope.likePost = function(_id){
    console.log(_id);
    $http.post('/web/faculty/post/like', {id: _id}).then(function(response){
      console.log(response);
    });
  }
  $scope.postFeed = function(){
    $http.post('/web/student/post', {text: $scope.postText}).then(function(response){
      $scope.posts.unshift(response.data.result);
    });
  }
  $scope.getPosts = function(){
    // $http.get('/web/student/review?id=' + $scope.id).then(function(response){
    //   $scope.reviews = response.data.result;
    // });
    $http.get('/web/student/post').then(function(response){
      $scope.posts = response.data.result;
    });
  }

  $scope.commentFeed = function(_id){
    $http.post('/web/student/post/comment', {id: _id, text: $scope.commentText}).then(function(response){
      Materialize.toast('asd', 1000);
    });
  }

})

app.controller('registerController', function($scope){

});
