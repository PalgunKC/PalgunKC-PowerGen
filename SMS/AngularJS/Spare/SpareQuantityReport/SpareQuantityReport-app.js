var SpareProductReportApp = angular.module('SpareProductReportApp', ['commonApp', 'datatables']);

SpareProductReportApp.service('SpareProductReportServices', function () {


    this.FetchProductReport = function (data) {
        debugger;
        this.url = "Spare/FetchSpareProductReport";
        this.param = JSON.stringify(data);
    };
    this.FetchProductReportExcel = function (data) {
        debugger;
        this.url = "Spare/GetSpareQuantityReport";
        this.param = JSON.stringify(data);
    };
    this.ExportData = function (data) {
        this.url = "Manage_Info/ExportData";
        this.param = JSON.stringify(data);
    };
});
