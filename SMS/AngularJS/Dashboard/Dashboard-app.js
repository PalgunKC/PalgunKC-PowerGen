var ProductReportApp = angular.module('ProductReportApp', ['commonApp', 'datatables']);

ProductReportApp.service('ProductReportServices', function () {


    this.FetchProductReport = function () {
        debugger;
        this.url = "Tool/GetDashboard";
       // this.param = JSON.stringify(data);
    };
    this.FetchProductReportExcel = function (data) {
        debugger;
        this.url = "Tool/GetQuantityReport";
        this.param = JSON.stringify(data);
    };
    this.ExportData = function (data) {
        this.url = "Manage_Info/ExportData";
        this.param = JSON.stringify(data);
    };
});
