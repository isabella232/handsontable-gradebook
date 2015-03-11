angular.module('gradeBookApp.controllers')
.controller(
  'gradeBookCtrl',
  [
    '$scope',
    'courseFactory',
    'assignmentFactory',
    'schoolYearFactory',
    'classSectionFactory',
    '$log',
    function ($scope, courseFactory, assignmentFactory, schoolYearFactory, classSectionFactory, $log) {

      var getCourses = function () {
        courseFactory.get().$promise.then(
          function (result) {
            $scope.courses = result['results'];
          }
        )
      };

      var hideRightColumn = function () {
        $scope.filtersVisible = false;
        $scope.settingsVisible = false;
        $scope.assignmentVisible = false;
      };

      var getActiveMarketingPeriod = function () {
        schoolYearFactory.get().$promise.then(
          function (result){
            for (var i = 0, len = result.length; i < len; i++) {
              if (result[i].active_year){
                $scope.marketingPeriodSet = result[i].marketingperiod_set;
                break;
              }
            }
          }
        )
      };

      $scope.getSection = function (sectionId) {
        $scope.activeSection = sectionId;
        classSectionFactory.getBySection({sectionId: sectionId}).$promise.then(
          function (result) {
            console.log(result);
            $scope.users = [];
            //prepareAssignments(result);
          },
          function (error) {
            $log.error('singleSectionCtrl:getSection', error);
          }
        )
      };

      $scope.newAssignment = {};

      $scope.marketingPeriodSet = [];

      $scope.saveAssignment = function () {
        assignmentFactory.create($scope.newAssignment).$promise.then(
          function (result) {
            console.log(result);
            hideRightColumn();
          }
        )
      };

      $scope.filtersVisible = false;
      $scope.settingsVisible = false;
      $scope.assignmentVisible = false;
      $scope.multipleAssignments = false;


      $scope.search = {
        where: 'all',
        what: null
      };

      $scope.activeSection = null;

      $scope.setSearchRange = function (value) {
        $scope.search.where = value;
      };

      $scope.cancel = function () {
        hideRightColumn();
      };

      $scope.toggleFilter = function () {
        hideRightColumn();
        $scope.filtersVisible = true;
      };

      $scope.toggleSettings = function () {
        hideRightColumn();
        $scope.settingsVisible = true;
      };

      $scope.toggleAssignments = function (readOnly) {
        $scope.readOnly = readOnly;
        hideRightColumn();
        $scope.assignmentVisible = true;
      };

      $scope.showMultipleAssignments = function (multiple) {
        $scope.multipleAssignments = multiple;
      };

      $scope.editAssignment = function () {
        $scope.readOnly = false;
        hideRightColumn();
        $scope.assignmentVisible = true;
      };



      getCourses();
      getActiveMarketingPeriod();

    }
  ]
);
