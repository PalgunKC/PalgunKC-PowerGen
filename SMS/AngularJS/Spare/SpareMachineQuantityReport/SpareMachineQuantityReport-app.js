var SpareMachineQuantityReportApp = angular.module('SpareMachineQuantityReportApp', ['commonApp', 'datatables']);

SpareMachineQuantityReportApp.service('SpareMachineQuantityReportServices', function () {

    this.SpareMachineQuantityReportData = function (SpareMachineQuantityReport) {
        debugger;

        this.LineName = SpareMachineQuantityReport ? SpareMachineQuantityReport.LineName : null;
        this.Report_Type = SpareMachineQuantityReport ? SpareMachineQuantityReport.Report_Type : null;
        this.FromDate = SpareMachineQuantityReport ? SpareMachineQuantityReport.FromDate : null;
        this.Todate = SpareMachineQuantityReport ? SpareMachineQuantityReport.Todate : null;
    };

    this.FetchSpareMachineQuantity = function (data) {
        debugger;
        this.url = "Spare/FetchSpareMachineQuantityReport";
        this.param = JSON.stringify(data);
    };
    this.FetchSpareMachineQuantityExcel = function (data) {
        debugger;
        this.url = "Spare/GetSpareMachineQuantityReport";
        this.param = JSON.stringify(data);
    };
    this.ExportData = function (data) {
        this.url = "Manage_Info/ExportData";
        this.param = JSON.stringify(data);
    };
});
