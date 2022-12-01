var BreakageReportApp = angular.module('BreakageReportApp', ['commonApp', 'datatables']);

BreakageReportApp.service('BreakageReportServices', function () {


    this.FetchBreakageReport = function (data) {
        debugger;
        this.url = "Spare/FetchBreakageReport";
        this.param = JSON.stringify(data);
    };
    this.FetchBreakageReportExcel = function (data) {
        debugger;
        this.url = "Spare/GetBreakageReport";
        this.param = JSON.stringify(data);
    };
    this.ExportData = function (data) {
        this.url = "Manage_Info/ExportData";
        this.param = JSON.stringify(data);
    };
});
