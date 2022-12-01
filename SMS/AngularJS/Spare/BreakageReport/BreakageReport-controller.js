BreakageReportApp.controller('BreakageReportCtrl', function (Excel, $timeout, $scope, $filter, BreakageReportServices, commonService, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {
    $scope.BreakageReportList = [];
    $scope.Initialize = true;
    $scope.ReturnAnalyReportList = [];
    $scope.SpareReturnReason = [];

    $scope.init = function () {
        $scope.IsListDivVisible = false;
        commonService.postWebService('Spare/BindReturnReason').then(function (response) {
            $scope.SpareReturnReason = response.ddlRequestReason;
        });
    };

    $scope.DatatableInitialize = function () {
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions().withOption('order', [0, 'asc']);
    };

    $scope.FetchBreakageReport = function (data) {
        debugger;
        $scope.ReturnjsonObj = [];
        var request = new BreakageReportServices.FetchBreakageReport(data);
        commonService.postWebService(request.url, request.param).then(function (response) {
            //$scope.BreakageReportList = [];
            $scope.BreakageReportList = response.ddlSpareBreakageReport;
            $scope.ReturnAnalyReportList = response.ddlSpareReturnAnalyReport;
            angular.forEach($scope.ReturnAnalyReportList, function (item) {
                $scope.ReturnjsonObj.push({ date: item.date, sales1: item.sales1 })
            });
            $scope.GetReturnAnalysisReport($scope.ReturnjsonObj);
            //$('#iReport').attr('src', '../RDLCReports/InvoiceCasewise.aspx?sInvoiceNo=' + response.liInvoicePreview[0].INVOICE_NUMBER);
            $scope.IsListDivVisible = true;
            $scope.IsExitDivVisible = true;

            if ($scope.Initialize) {
                $scope.DatatableInitialize();
                $scope.Initialize = false;
            }
        });
    };

    $scope.GetQuantityReport = function (QuantityReport) {

        var request = new BreakageReportServices.FetchBreakageReportExcel(QuantityReport);
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;
            $scope.DownloadTab(response);
        });

    };

     $scope.GetReturnAnalysisReport = function (CostReport) {
        var chart = AmCharts.makeChart("bar-chart3", {
            "type": "serial",
            "theme": "light",
            "marginTop": 10,
            "marginRight": 0,
            "valueAxes": [{
                "id": "v1",
                "position": "left",
                "gridAlpha": 0,
                "axisAlpha": 0,
                "lineAlpha": 0,
                "autoGridCount": false,
                "labelFunction": function (value) {
                    return +Math.round(value) + "00";
                }
            }],
            //"graphs": [{
            //    "id": "g1",
            //    "valueAxis": "v1",
            //    "lineColor": ["#1de9b6", "#1dc4e9"],
            //    "fillColors": ["#1de9b6", "#1dc4e9"],
            //    "fillAlphas": 1,
            //    "type": "column",
            //    "title": "Last Week ",
            //    "valueField": "sales2",
            //    "columnWidth": 0.2,
            //    "legendValueText": "$[[value]]M",
            //    "balloonText": "[[title]]<br /><b style='font-size: 130%'>$[[value]]M</b>"
            //},
            "graphs":[{
                "id": "g2",
                "valueAxis": "v1",
                "lineColor": ["#a389d4", "#899ed4"],
                "fillColors": ["#a389d4", "#899ed4"],
                "fillAlphas": 1,
                "type": "column",
                "title": "Return Count ",
                "valueField": "sales1",
                "columnWidth": 0.2,
                "legendValueText": "Rs.[[value]]",
                "balloonText": "[[title]]<br /><b style='font-size: 130%'>Rs.[[value]]</b>"
            }],
            "chartCursor": {
                "pan": true,
                "valueLineEnabled": true,
                "valueLineBalloonEnabled": true,
                "cursorAlpha": 0,
                "valueLineAlpha": 0.2
            },
            "categoryField": "date",
            "categoryAxis": {
                "dashLength": 1,
                "gridAlpha": 0,
                "axisAlpha": 0,
                "lineAlpha": 0,
                "minorGridEnabled": true
            },
            "legend": {
                "useGraphSettings": true,
                "position": "top"
            },
            "balloon": {
                "borderThickness": 1,
                "shadowAlpha": 0
            },
            "dataProvider":CostReport
            //"dataProvider": [{
            //    "date": "Q1",
            //    "sales1": 4.5,
            //    "sales2": 5.5
            //}, {
            //    "date": "Q2",
            //    "sales1": 5,
            //    "sales2": 6.5
            //}, {
            //    "date": "Q3",
            //    "sales1": 6.5,
            //    "sales2": 5.5
            //}, {
            //    "date": "Q4",
            //    "sales1": 6,
            //    "sales2": 7
            //}]
        });
    }
    //$scope.FetchMonthlyReport = function (data) {
    //    $scope.IsListDivVisible = true;
    //    $('#iReport').attr('src', '../RDLCReports/Collection_MonthwiseReport.aspx?sFromDate=' + data.FROMDATE + "&sToDate=" + data.TODATE);

    //};


    $scope.CancelBreakageReport = function () {
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


    $scope.filterSpareReturnReason = function (SpareReturnReason) {
        return (SpareReturnReason.IsActive === 'Y');
    }

    $scope.init();

    $scope.DownloadTab = function (response) {
        //alert(response);
        //$("#page-loader").hide();

        window.location = '/Spare/Download?ID=' + response.ID + '&Name=' + response.FileName;
    };

});