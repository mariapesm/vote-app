'use strict';

angular.module('fullstackApp')

  /**
  * This controller is under heavy development
  */

  .controller('MainCtrl', function ($scope, $http) {

    $scope.activeTitle = $scope.sortToggleButtonLabel = 'Loading...';
    $scope.loading = true;
    $scope.pollsData = {
      results: [],
      current: '-',
      last: '-',
    };

    var sortCrit = 'recent';

    var toogleSortCriterion = function() {
      sortCrit = sortCrit === 'recent' ? 'popular' : 'recent';
    };

    $scope.pager = function(dir,page) {

      var queryPage = page || $scope.pollsData.current;
      $scope.loading = true;
      $scope.activeTitle = $scope.sortToggleButtonLabel = 'Loading...';
      if(dir === 'up') {
        queryPage++;
      } else if (dir === 'down') {
        queryPage--;
      }
      $http.get('/api/polls/', { params:{ page: queryPage, order: sortCrit }})
        .success(function(res) {
          $scope.pollsData = res;
          $scope.loading = false;
          $scope.activeTitle = sortCrit === 'recent' ? 'Recent Polls' : 'Popular Polls';
          $scope.sortToggleButtonLabel = sortCrit === 'recent' ? 'Popular First' : 'Recent First';
      });
    };

    // add a readable permalink to the route page
    $scope.permalinker = function(text) {
      return text.toLowerCase().replace(/[^a-zA-z0-9]/g,' ').trim()
      .replace(/\s+/g,'-');
    };

    $scope.switchCrit = function() {
      toogleSortCriterion();
      $scope.pager(null,1);
    };

    // Load the first polls
    $scope.pager(null,1);

    /**
    * TO BE IMPLEMENTED
    *

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    *
    */

  });
