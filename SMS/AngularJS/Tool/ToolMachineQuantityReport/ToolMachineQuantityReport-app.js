var ToolMachineQuantityReportApp = angular.module('ToolMachineQuantityReportApp', ['commonApp', 'datatables']);

ToolMachineQuantityReportApp.service('ToolMachineQuantityReportServices', function () {


    this.ToolMachineQuantityReportData = function (ToolMachineQuantityReport) {
        debugger;

        this.LineName = ToolMachineQuantityReport ? ToolMachineQuantityReport.LineName : null;
        this.Report_Type = ToolMachineQuantityReport ? ToolMachineQuantityReport.Report_Type : null;
        this.FromDate = ToolMachineQuantityReport ? ToolMachineQuantityReport.FromDate : null;
        this.Todate = ToolMachineQuantityReport ? ToolMachineQuantityReport.Todate : null;
    };

    this.FetchToolMachineQuantity = function (data) {
        debugger;
        this.url = "Tool/FetchToolMachineQuantityReport";
        this.param = JSON.stringify(data);
    };
    this.FetchToolMachineQuantityExcel = function (data) {
        debugger;
        this.url = "Tool/GetToolMachineQuantityReport";
        this.param = JSON.stringify(data);
    };
    this.ExportData = function (data) {
        this.url = "Manage_Info/ExportData";
        this.param = JSON.stringify(data);
    };
});
