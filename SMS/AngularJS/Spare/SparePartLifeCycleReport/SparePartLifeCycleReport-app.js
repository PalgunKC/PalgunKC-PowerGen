var PartLifeCycleReportApp = angular.module('PartLifeCycleReportApp', ['commonApp', 'datatables']);

PartLifeCycleReportApp.service('PartLifeCycleReportServices', function () {


    this.FetchPartLifeCycleReport = function (data) {
        debugger;
        this.url = "Spare/FetchPartLifeCycleReport";
        this.param = JSON.stringify(data);
    };
    this.FetchPartLifeCycleReportExcel = function (data) {
        debugger;
        this.url = "Spare/GetQuantityReport";
        this.param = JSON.stringify(data);
    };
    this.ExportData = function (data) {
        this.url = "Manage_Info/ExportData";
        this.param = JSON.stringify(data);
    };
});
