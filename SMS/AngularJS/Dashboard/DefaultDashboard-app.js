var ProductReportApp = angular.module('ProductReportApp', ['commonApp', 'datatables']);

ProductReportApp.service('ProductReportServices', function () {


    this.FetchProductReport = function () {
        debugger;
        this.url = "Spare/GetDashboard";
       // this.param = JSON.stringify(data);
    };
 this.ToolDashboard = function () {
        debugger;
        this.url = "Tool/GetDashboard";
       // this.param = JSON.stringify(data);
    };
    
});
