ProductReportApp.controller('ProductReportCtrl', function (Excel, $timeout, $scope, $filter, ProductReportServices, commonService, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {
    $scope.ProductReportList = [];
    $scope.ProductAnalyReportList = [];
    $scope.CostAnalyReportList = [];
    $scope.PartMasterList = [];
    $scope.Initialize = true;
    $scope.s = [];
    $scope.init = function () {
        $scope.IsListDivVisible = false;
        $scope.IsExitDivVisible = false;
        commonService.postWebService('Tool/BindListToolUpload', { 'P_KEY': 'L', 'dummycolumn1': 'Part' }).then(function (response) {
            $scope.PartMasterList = response.ddlPartmaster;
        });
    };

    $scope.init();

    $scope.filterPartMasterList = function (PartMasterList) {
        return (PartMasterList.IsActive === 'Y');
    }

    $scope.ReportType = '';
    $scope.DatatableInitialize = function () {
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions().withOption('order', [0, 'asc']);
    };
    $scope.CostjsonObj = [];
    $scope.jsonObj = [];
    // var chart = '';
    $scope.FetchProductReport = function (data) {
        $scope.ReportType = data.Report_Type;
        debugger;
        $scope.jsonObj = [];
        $scope.CostjsonObj = [];
        var request = new ProductReportServices.FetchProductReport(data);
        commonService.postWebService(request.url, request.param).then(function (response) {
            //$scope.ProductReportList = [];
            $scope.ProductReportList = response.ddlToolQtyReport;
            $scope.ProductAnalyReportList = response.ddlToolQtyAnalyReport;
            // var jsonObj = $.parseJSON('[' + $scope.ProductAnalyReportList + ']');
            angular.forEach($scope.ProductAnalyReportList, function (item) {
                $scope.jsonObj.push({ year: item.year, value: item.value, value2: item.value2 })
            });
            $scope.CostAnalyReportList = response.ddlToolCostAnalyReport;
            angular.forEach($scope.CostAnalyReportList, function (item) {
                $scope.CostjsonObj.push({ date: item.date, sales1: item.sales1, sales2: item.sales2 })
            });
            //$scope.s = [{ "year": "December", "value": "27", "value2": "24" }];
            $scope.GetAnalysisReport($scope.jsonObj);
            $scope.GetCostAnalysisReport($scope.CostjsonObj);


            //$scope.jsonObj = response.ddlToolQtyAnalyReport.map(function (item) {
            //    return { year: item['year'], value: item['value'], value2: item['value2'] };
            //});
            $scope.IsListDivVisible = true;
            $scope.IsExitDivVisible = true;
            if ($scope.Initialize) {
                $scope.DatatableInitialize();
                $scope.Initialize = false;
            }
        });
    };

    $scope.GetQuantityReport = function (QuantityReport) {

        var request = new ProductReportServices.FetchProductReportExcel(QuantityReport);
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;
            $scope.DownloadTab(response);
        });

    };
    //$scope.FetchMonthlyReport = function (data) {
    //    $scope.IsListDivVisible = true;
    //    $('#iReport').attr('src', '../RDLCReports/Collection_MonthwiseReport.aspx?sFromDate=' + data.FROMDATE + "&sToDate=" + data.TODATE);

    //};


    $scope.CancelProductReport = function () {
        $scope.init();
        $scope.obj = null;
        $scope.IsListDivVisible = false;
        $scope.IsExitDivVisible = false;

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
    //var s = "{ \"year\": \"December\", \"value\": \"27\", \"value2\": \"24\" }";
    //s = { "year": "December", "value": "27", "value2": "24" };
    $scope.GetAnalysisReport = function (QuantityReport) {
        var chart = AmCharts.makeChart("line-area2", {
            "type": "serial",
            "theme": "light",
            "marginTop": 10,
            "marginRight": 0,
            "dataProvider": QuantityReport,
            //"dataProvider": [{ "year": "December", "value": "27", "value2": "24" }],
            //{ "year": "Jaunuary", "value": "22", "value2": "2" }],
            //"dataProvider": [{
            //    "year": "Jan",
            //    "value": 5,
            //    "value2": 80,
            //}, {
            //    "year": "Feb",
            //    "value": 30,
            //    "value2": 95,
            //}, {
            //    "year": "Mar",
            //    "value": 25,
            //    "value2": 87,
            //}, {
            //    "year": "Apr",
            //    "value": 55,
            //    "value2": 155,
            //}, {
            //    "year": "May",
            //    "value": 45,
            //    "value2": 140,
            //}, {
            //    "year": "Jun",
            //    "value": 65,
            //    "value2": 147,
            //}, {
            //    "year": "Jul",
            //    "value": 60,
            //    "value2": 130,
            //}, {
            //    "year": "Aug",
            //    "value": 105,
            //    "value2": 180,
            //}, {
            //    "year": "Sep",
            //    "value": 80,
            //    "value2": 160,
            //}, {
            //    "year": "Oct",
            //    "value": 110,
            //    "value2": 175,
            //}, {
            //    "year": "Nov",
            //    "value": 120,
            //    "value2": 165,
            //}, {
            //    "year": "Dec",
            //    "value": 150,
            //    "value2": 200,
            //}],
            "valueAxes": [{
                "axisAlpha": 0,
                "position": "left"
            }],
            "graphs": [{
                "id": "g1",
                "title": "InWard ",
                "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]] InWard</span></b>",
                "bullet": "round",
                "lineColor": "#1de9b6",
                "lineThickness": 3,
                "negativeLineColor": "#1de9b6",
                "valueField": "value"
            }, {
                "id": "g2",
                "title": "OutWard ",
                "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]] OutWard</span></b>",
                "bullet": "round",
                "lineColor": "#10adf5",
                "lineThickness": 3,
                "negativeLineColor": "#10adf5",
                "valueField": "value2"
            }],
            "chartCursor": {
                "cursorAlpha": 0,
                "valueLineEnabled": true,
                "valueLineBalloonEnabled": true,
                "valueLineAlpha": 0.3,
                "fullWidth": true
            },
            "categoryField": "year",
            "categoryAxis": {
                "minorGridAlpha": 0,
                "minorGridEnabled": true,
                "gridAlpha": 0,
                "axisAlpha": 0,
                "lineAlpha": 0
            },
            "legend": {
                "useGraphSettings": true,
                "position": "top"
            },
        });
    }
    $scope.GetCostAnalysisReport = function (CostReport) {
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
            "graphs": [{
                "id": "g1",
                "valueAxis": "v1",
                "lineColor": ["#1de9b6", "#1dc4e9"],
                "fillColors": ["#1de9b6", "#1dc4e9"],
                "fillAlphas": 1,
                "type": "column",
                "title": "Inward",
                "valueField": "sales2",
                "columnWidth": 0.2,
                "legendValueText": "Rs.[[value]]",
                "balloonText": "[[title]]<br /><b style='font-size: 130%'>Rs.[[value]]</b>"
            },
            {
                "id": "g2",
                "valueAxis": "v1",
                "lineColor": ["#a389d4", "#899ed4"],
                "fillColors": ["#a389d4", "#899ed4"],
                "fillAlphas": 1,
                "type": "column",
                "title": "Outward",
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
            "dataProvider": CostReport
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
});