angular.module('fiddio')
.directive('commentList', [ '$http', 'UserData', 'angularPlayer', '$timeout', function($http, UserData, angularPlayer, $timeout) {
  return {
    restrict: 'E',
    templateUrl: '/templates/commentList.html', // change this up too
    replace: true,
    link: function(scope, elm, attr) {
      scope.parentType = attr.parentType;
      scope.parentId = attr.parentId;

      $http({ method: 'GET', url: '/api/'+attr.parentType+'/'+attr.parentId+'/comments'})
      .then(function(response){
        scope.comments = response.data.comments;
      },
      function(response){
        console.log("Error ", response);
      });

      scope.$on('comments:updateDisplay', function(event, comment){

        if (comment.parent_type === 'comment') {
          scope.comments.some(function(c) {
            if (c.id === comment.parent_id) {
              c.comments.push(comment);
              return true;
            }
            return false;
          });
        } else {
          comment.comments = [];
          scope.comments.push(comment);
        }
      });
    }
  };
}]);