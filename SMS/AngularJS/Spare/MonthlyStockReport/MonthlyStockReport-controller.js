MonthlyStockReportApp.controller('MonthlyStockReportCtrl', function (Excel, $timeout, $scope, $filter, MonthlyStockReportServices, commonService, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {
    $scope.MonthlyStockReportList = [];
    $scope.Initialize = true;

    $scope.init = function () {
        $scope.IsListDivVisible = false;
    };

    $scope.DatatableInitialize = function () {
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions().withOption('order', [0, 'asc']);
    };

    $scope.FetchMonthlyStockReport = function (data) {
        debugger;
        var request = new MonthlyStockReportServices.FetchMonthlyStockReport(data);
        commonService.postWebService(request.url, request.param).then(function (response) {
            //$scope.MonthlyStockReportList = [];
            $scope.MonthlyStockReportList = response.liSparePartmaster;
            //$('#iReport').attr('src', '../RDLCReports/InvoiceCasewise.aspx?sInvoiceNo=' + response.liInvoicePreview[0].INVOICE_NUMBER);
            $scope.IsListDivVisible = true;
            if ($scope.Initialize) {
                $scope.DatatableInitialize();
                $scope.Initialize = false;
            }
        });
    };

    $scope.GetMonthlyStockReport = function (QuantityReport) {

        var request = new MonthlyStockReportServices.FetchMonthlyStockReportExcel(QuantityReport);
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;
            $scope.DownloadTab(response);
        });

    };
    //$scope.FetchMonthlyReport = function (data) {
    //    $scope.IsListDivVisible = true;
    //    $('#iReport').attr('src', '../RDLCReports/Collection_MonthwiseReport.aspx?sFromDate=' + data.FROMDATE + "&sToDate=" + data.TODATE);

    //};


    $scope.CancelMonthlyStockReport = function () {
        $scope.init();
        $scope.obj = null;
        $scope.IsListDivVisible = false;
    };

    $scope.exportToExcel = function (tableId) { // ex: '#my-table'
        debugger;
        var exportHref = Excel.tableToExcel(tableId, 'madasamy');
        $timeout(function () {
            var a = document.createElement('a');
            a.href = exportHref;
            a.download = "ProductWiseReport.xls";
            document.body.appendChild(a);
            a.click();
            a.remove();
        }, 100); // trigger download
    };
    $scope.exportToPDF = function (tableId) {
        debugger;
        html2canvas(document.getElementById(tableId), {
            onrendered: function (canvas) {
                debugger;
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 500
                    }]
                };
                pdfMake.createPdf(docDefinition).download("ProductWiseReport.pdf");
            }
        });
    };


    $scope.DownloadTab = function (response) {
        //alert(response);
        //$("#page-loader").hide();

        window.location = '/Tool/Download?ID=' + response.ID + '&Name=' + response.FileName;
    };

});