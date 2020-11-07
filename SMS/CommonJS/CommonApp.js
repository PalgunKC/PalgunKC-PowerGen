'use strict';
var commonApp = angular.module('commonApp', []);
commonApp.factory('Excel', function ($window) {
    var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:WorkbookName>{workbook}</x:WorkbookName><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
        base64 = function (s) { return $window.btoa(unescape(encodeURIComponent(s))); },
        format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };
    return {
        tableToExcel: function (tableId, worksheetName) {
            debugger;
            var table = $(tableId),
                ctx = { workbook: 'lenin', worksheet: worksheetName, table: table.html() },
                href = uri + base64(format(template, ctx));
            return href;
        }
    };
})

commonApp.service('commonService', function ($http, $q) {
    this.webURL = 'http://localhost:58803/';

    this.deleteRecordStatus = 0;
    this.saveRecordStatus = 1;
    this.inActiveRecordStatus = 2;
    this.notApprovedRecordStatus = 3;

    this.getWebService = function (url, param) {
        var weburl = this.webURL + url;
        var deferred = $q.defer();
        $http({
            method: "GET",
            url: weburl,
            params: param
        }).then(function (response) {
            deferred.resolve(response.data);
        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };

    this.postWebService = function (url, param) {
        var weburl = this.webURL + url;
        var deferred = $q.defer();
        $http({
            method: "POST",
            url: weburl,
            data: param
        }).then(function (response) {
            deferred.resolve(response.data);
        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };
    this.MultiParameterpostWebService = function (url, param1,param2) {
        var weburl = this.webURL + url;
        var deferred = $q.defer();
        $http({
            method: "GET",
            url: weburl,
            data: JSON.stringify({ 'rolemaster': param1, 'obj': param2 })
        }).then(function (response) {
            deferred.resolve(response.data);
        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };

    this.uploadFile = function (url, param) {
        var weburl = this.webURL + url;
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: weburl,
            data: param,
            headers: {
                'Content-Type': undefined
            }
        }).then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (error) {
                deferred.reject(error);
            }
        );
        return deferred.promise;
    }

    this.userPhoto = function (UserID) {
        return this.webURL + "Home/UserImage/" + UserID;
    };

});

var commonDS = commonDS || {};
commonDS.searchGrid = function (SortColumnName, obj) {
    this.PageNo = 1;
    this.RecordsPerPage = 5;
    this.LastPage = 1;
    this.TotalRecords = null;
    this.SortingColumn = SortColumnName;
    this.SortType = "asc";
    this.Search = obj;
};

commonDS.searchRecords = function (records) {
    this.PageNo = records.PageNo;
    this.RecordsPerPage = records.RecordsPerPage;
    this.LastPage = Math.ceil(records.TotalRecords / records.RecordsPerPage);
    this.TotalRecords = records.TotalRecords;
    this.SortingColumn = records.SortingColumn;
    this.SortType = records.SortType;
    this.Search = records.Search;
};
