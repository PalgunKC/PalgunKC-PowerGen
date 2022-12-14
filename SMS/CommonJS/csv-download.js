!(function () {
    'use strict';
    angular
      .module('tld.csvDownload', [])
      .directive('csvDownload', [])
      .config([
        '$compileProvider',
        function ($compileProvider) {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(data):/);
        },
      ]),
      angular.module('tld.csvDownload').directive('csvDownload', function ($log) {
          var directive = {
              restrict: 'E',
              transclude: !0,
              template:
                '<a class="btn btn-success" href="{{hreflink}}" download="{{filename}}">{{label}}</a>',
              scope: {
                  columnHeader: '=',
                  inputArray: '=',
                  filename: '@filename',
                  hreflink: '@hreflink',
                  label: '@label',
              },
          };
          return (
            (directive.controller = function ($scope) {
                void 0 === $scope.label && ($scope.label = 'CSV');
                var getHeader = function () {
                    if ($scope.columnHeader) return $scope.columnHeader;
                    $scope.columnHeader = [];
                    for (var i in $scope.inputArray) {
                        var keys = Object.keys($scope.inputArray[i]);
                        for (var j in keys) {
                            var key = keys[j];
                            $scope.columnHeader[key] = key;
                        }
                    }
                    return $scope.columnHeader;
                },
                  convertArrayOfObjectsToCSV = function () {
                      var result,
                        ctr,
                        keys,
                        columnDelimiter,
                        lineDelimiter,
                        header = getHeader() || null;
                      return null === header
                        ? null
                        : ((columnDelimiter = ','),
                          (lineDelimiter = '\n'),
                          (keys = Object.keys(header)),
                          (result = ''),
                          keys.forEach(function (key) {
                              var dataVal = header[key];
                              void 0 === dataVal && (dataVal = ''),
                                (result += '"' + dataVal + '"' + columnDelimiter);
                          }),
                          (result += columnDelimiter),
                          (result += lineDelimiter),
                          $scope.inputArray.forEach(function (item) {
                              alert('');
                              (ctr = 0),
                                keys.forEach(function (key) {
                                    ctr > 0 && (result += columnDelimiter);
                                    var dataVal = item[key];
                                    void 0 === dataVal && (dataVal = ''),
                                      (result += '"' + dataVal + '"'),
                                      ctr++;
                                }),
                                (result += lineDelimiter);
                          }),
                          result);
                  },
                  generateCSVLink = function () {
                      void 0 === $scope.filename && ($scope.filename = 'report.csv');
                      var csv = convertArrayOfObjectsToCSV();
                      null !== csv &&
                        (csv.match(/^data:text\/csv/i) ||
                          (csv = 'data:text/csv;charset=utf-8,' + csv),
                        ($scope.hreflink = encodeURI(csv)));
                  };
                generateCSVLink();
            }),
            directive
          );
      });
})();
