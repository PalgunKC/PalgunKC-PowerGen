ProductReportApp.controller('ProductReportCtrl', function (Excel, $timeout, $scope, $filter, ProductReportServices, commonService, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {
   
    $scope.Request_Cnt = '';
    $scope.Return_Cnt = '';
    $scope.Regrain_Cnt = '';
    $scope.Regrain_Exceeds_Cnt = '';
    $scope.PartNumber_Min_Count = '';

     $scope.ToolRequest_Cnt = '';
    $scope.ToolReturn_Cnt = '';
    $scope.ToolRegrain_Cnt = '';
    $scope.ToolRegrain_Exceeds_Cnt = '';
    $scope.ToolPartNumber_Min_Count = '';

    $scope.FetchProductReport = function () {
        
        debugger;
        
        var request = new ProductReportServices.FetchProductReport();
        commonService.postWebService(request.url, request.param).then(function (response) {
            //$scope.ProductReportList = response.ddlDashboard;
            $scope.Request_Cnt = response.ddlDashboard[0].Request_Cnt;
            $scope.Return_Cnt = response.ddlDashboard[0].Return_Cnt;
            $scope.Regrain_Cnt = response.ddlDashboard[0].Regrain_Cnt;
            $scope.Regrain_Exceeds_Cnt = response.ddlDashboard[0].Regrain_Exceeds_Cnt;
            $scope.PartNumber_Min_Count = response.ddlDashboard[0].PartNumber_Min_Count;

        });

          var request = new ProductReportServices.ToolDashboard();
        commonService.postWebService(request.url, request.param).then(function (response) {
            //$scope.ProductReportList = response.ddlDashboard;
            $scope.ToolRequest_Cnt = response.ddlDashboard[0].Request_Cnt;
            $scope.ToolReturn_Cnt = response.ddlDashboard[0].Return_Cnt;
            $scope.ToolRegrain_Cnt = response.ddlDashboard[0].Regrain_Cnt;
            $scope.ToolRegrain_Exceeds_Cnt = response.ddlDashboard[0].Regrain_Exceeds_Cnt;
            $scope.ToolPartNumber_Min_Count = response.ddlDashboard[0].PartNumber_Min_Count;
        });
    };

    $scope.FetchProductReport();
});