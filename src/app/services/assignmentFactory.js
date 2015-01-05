angular.module('gradeBookApp.services')
  .factory(
  'assignmentFactory',
  [
    'appConfig',
    '$resource',
    '$log',
    function (appConfig, $resource, $log) {
      return $resource(appConfig.apiUrl + '/assignment/:assignmentId/ ',
        {
          assignmentId: '@assignmentId'
        },
        {
          create: {
            method: 'POST',
            interceptor: {
              responseError: function (error) {
                $log.error('POST ERROR:', error);

                return {
                  id: 4,
                  name: 'Test',
                  weight:13,
                  category:3
                }
              }
            }
          },
          update: {
            method: 'PUT',
            interceptor: {
              responseError: function (error) {
                $log.error('PUT ERROR:', error);
              }
            }
          }
        }
      )
    }
  ]
);
