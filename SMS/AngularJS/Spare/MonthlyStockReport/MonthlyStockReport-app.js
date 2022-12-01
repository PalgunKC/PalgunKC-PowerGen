var MonthlyStockReportApp = angular.module('MonthlyStockReportApp', ['commonApp', 'datatables']);

MonthlyStockReportApp.service('MonthlyStockReportServices', function () {


    this.FetchMonthlyStockReport = function (data) {
        debugger;
        this.url = "Spare/FetchMonthlyStockReport";
        this.param = JSON.stringify(data);
    };
    this.FetchMonthlyStockReportExcel = function (data) {
        debugger;
        this.url = "Spare/GetMonthlyStockReport";
        this.param = JSON.stringify(data);
    };
    this.ExportData = function (data) {
        this.url = "Manage_Info/ExportData";
        this.param = JSON.stringify(data);
    };
});
