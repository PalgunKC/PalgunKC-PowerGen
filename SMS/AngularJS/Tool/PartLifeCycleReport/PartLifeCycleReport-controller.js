PartLifeCycleReportApp.controller('PartLifeCycleReportCtrl', function (Excel, $timeout, $scope, $filter, PartLifeCycleReportServices, commonService, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {
    $scope.PartLifeCycleReportList = [];
    $scope.Initialize = true;

     $scope.PartMasterList = [];
    //$scope.ToolVendorList = [];
    $scope.ToolingReturnList = [];
    $scope.ToolLocationList = [];
    $scope.ToolUploadList = [];
    $scope.Min = 1;
    $scope.LineList = [];
    $scope.MachineList = [];
    $scope.ReasonList = [];
    $scope.ToolReturnReason = [];
    $scope.ToolIssueList = [];
    keyname = 'ToolIsu_Partno';
    keyname1 = 'ToolIsu_CurUnicode';
    keys = [];
    keys1 = [];
    $scope.filterToolPartNumber = [];
    $scope.machinecodeError = false;
    $scope.IsRequired = false;

    //$scope.init = function () {
    //    $scope.IsListDivVisible = false;
    //};
    $scope.init = function () {
        debugger;
        keys = [];
        commonService.postWebService('Tool/BindListToolingReturn', { 'P_KEY': 'L', 'dummy_col1': 'Part' }).then(function (response) {

            $scope.PartMasterList = response.ddlPartmaster;
            $scope.Part_Flag = true;
        });
        commonService.postWebService('Tool/BindListToolingReturn', { 'P_KEY': 'L', 'dummy_col1': 'Location' }).then(function (response) {
            $scope.ToolLocationList = response.ddlToolLocation;
            $scope.Location_Flag = true;
        });
        commonService.postWebService('Tool/BindListToolingReturn', { 'P_KEY': 'L', 'dummy_col1': 'Return' }).then(function (response) {

            $scope.ToolingReturnList = response.ddToolingReturn;
            $scope.Return_Flag = true;
        });
        commonService.postWebService('Tool/BindListToolingReturn', { 'P_KEY': 'L', 'dummy_col1': 'Shift' }).then(function (response) {

            $scope.ShiftMasterList = response.ddlShiftmaster;
            $scope.ToolRts_plant = response.ddlOrgId;
            $scope.Shift_Flag = true;
        });
        commonService.postWebService('Tool/BindListToolingReturn', { 'P_KEY': 'L', 'dummy_col1': 'Line' }).then(function (response) {

            $scope.LineList = response.ddlLine;
            $scope.Line_Flag = true;
        });
        commonService.postWebService('Tool/BindListToolingReturn', { 'P_KEY': 'L', 'dummy_col1': 'Regrain' }).then(function (response) {

            $scope.ToolIssueList = response.ddlToolingIssue;
            $scope.Issue_Flag = true;
                angular.forEach($scope.ToolingReturnList, function (value, key) {
                value.ToolRts_Qty = parseFloat(value.ToolRts_Qty);


            });
            $scope.ToolUploadList = response.ddlToolUpload;
            angular.forEach($scope.ToolUploadList, function (value, key) {
                value.Quantity = parseFloat(value.Quantity);

            });


            angular.forEach($scope.PartMasterList, function (value, key) {
                angular.forEach($scope.ToolIssueList, function (value1, key) {

                    if (value1.ToolIsu_Partno == value.PartNumber) {
                        value1.PartName = value.PartName;
                        value1.PartSpecification = value.PartSpecification;


                    }

                });
            });

            angular.forEach($scope.ToolIssueList, function (item) {
                // we check to see whether our object exists
                //if (item['Is_Return'] != 'Y')
                //    {
                var key = item[keyname];
                // if it's not already part of our keys array
                if (keys.indexOf(key) === -1 && item['Tool_Status']==='I') {
                    // add it to our keys array
                    keys.push(key);
                    // push this item to our final output array
                    //output.push(item);
                    $scope.filterToolPartNumber.push(item)
                }
                ///}
            });

            $scope.IsListDivVisible = false;
        });
       // commonService.postWebService('Tool/BindListToolingReturn', {}).then(function (response) {
       //     $scope.PartMasterList = response.ddlPartmaster;
       //     $scope.ToolLocationList = response.ddlToolLocation;
       //    // $scope.ToolVendorList = response.ddlVendormaster;
       //     $scope.ToolingReturnList = response.ddToolingReturn;
       //     //$scope.ToolReturnReason = response.ddlReturnReason.map(function (item) {
       //     //    return { id: item['ReasonCode'], label: item['ReasonCode'] + '-' + item['ReasonDetails'] };
       //     //});
       //     $scope.ShiftMasterList = response.ddlShiftmaster;
       //     $scope.ToolRts_plant = response.ddlOrgId;
       //     $scope.LineList = response.ddlLine;
       //     $scope.ToolIssueList = response.ddlToolingIssue;
       //     //angular.forEach($scope.ToolIssueList, function (value, key) {
       //     //    value.ToolReq_Qty = (value.ToolReq_Qty);
       //     //    value.ToolReq_AvailableQty = (value.ToolReq_AvailableQty);

       //     //});
       //     //$scope.obj.ToolReq_no = $scope.ToolingReturnList[0].Max_ToolReq_no;

       //     angular.forEach($scope.ToolingReturnList, function (value, key) {
       //         value.ToolRts_Qty = parseFloat(value.ToolRts_Qty);


       //     });
       //     $scope.ToolUploadList = response.ddlToolUpload;
       //     angular.forEach($scope.ToolUploadList, function (value, key) {
       //         value.Quantity = parseFloat(value.Quantity);

       //     });


       //     angular.forEach($scope.PartMasterList, function (value, key) {
       //         angular.forEach($scope.ToolIssueList, function (value1, key) {

       //             if (value1.ToolIsu_Partno == value.PartNumber) {
       //                 value1.PartName = value.PartName;
       //                 value1.PartSpecification = value.PartSpecification;


       //             }

       //         });
       //     });

       //     angular.forEach($scope.ToolIssueList, function (item) {
       //         // we check to see whether our object exists
       //         //if (item['Is_Return'] != 'Y')
       //         //    {
       //         var key = item[keyname];
       //         // if it's not already part of our keys array
       //         if (keys.indexOf(key) === -1) {
       //             // add it to our keys array
       //             keys.push(key);
       //             // push this item to our final output array
       //             //output.push(item);
       //             $scope.filterToolPartNumber.push(item)
       //         }
       //         ///}
       //     });

       //     $scope.IsListDivVisible = false;
       //    // $scope.IsEditDivVisible = false;
       // });
       //// $scope.DatatableInitialize();
    };

    $scope.BindPartName = function (row) {
        debugger;
        $scope.IsRequired = false;
        $scope.filterToolUnicodeList = [];
        keys1 = [];
        //angular.forEach($scope.PartMasterList, function (value, key) {
        //    if (value.PartNumber == row.ToolRts_Partno) {
        //        row.ToolRts_Partname = value.PartName,
        //        row.ToolRts_AvailableQty = parseFloat(value.TotalProductCount),
        //         row.Tooltype = value.IsReusable
        //    };
        //    if (value.PartNumber == row.ToolRts_Partno) {
        //        row.ToolRts_PartSpecification = value.PartSpecification
        //        if (value.IsReusable == 'Y') {
        //            if (!row.ToolRts_Unicode) {
        //                $scope.IsRequired = true;
        //            }
        //        }

        //        //return false;
        //    };
        //});
        //angular.forEach($scope.filterToolPartNumber, function (value, key) {
        //    if (value.ToolIsu_Partno == row.ToolRts_Partno) {
        //        if (value.Is_Return == 'Y') {

        //            $("#Message").val('Alter !! ');//Messgae
        //            $('#Title').html(row.ToolRts_Partno + ' Already Returned');//Title
        //            row.ToolRts_Partno = '';
        //            $("#Message").trigger("click");

        //        }
        //    }
        //});
        angular.forEach($scope.ToolIssueList, function (value, key) {
            if (value.ToolIsu_CurUnicode) {
                if (value.ToolIsu_Partno == row.PartNumber) {
                    var key = value[keyname1];
                    // if it's not already part of our keys array
                    if (keys1.indexOf(key) === -1) {
                        // add it to our keys array
                        keys1.push(key);
                        // push this item to our final output array
                        //output.push(item);
                        $scope.filterToolUnicodeList.push(value)
                    }
                    // $scope.filterToolUnicodeList.push(value)
                };
            }
        });
    }

    $scope.DatatableInitialize = function () {
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions().withOption('order', [0, 'asc']);
    };

    $scope.FetchPartLifeCycleReport = function (data) {
        debugger;
        var request = new PartLifeCycleReportServices.FetchPartLifeCycleReport(data);
        commonService.postWebService(request.url, request.param).then(function (response) {
            //$scope.PartLifeCycleReportList = [];
            $scope.PartLifeCycleReportList = response.liToolLifeCycleReport;
            //$('#iReport').attr('src', '../RDLCReports/InvoiceCasewise.aspx?sInvoiceNo=' + response.liInvoicePreview[0].INVOICE_NUMBER);
            $scope.IsListDivVisible = true;
            if ($scope.Initialize) {
                $scope.DatatableInitialize();
                $scope.Initialize = false;
            }
        });
    };

    $scope.GetQuantityReport = function (QuantityReport) {

        var request = new PartLifeCycleReportServices.FetchPartLifeCycleReportExcel(QuantityReport);
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;
            $scope.DownloadTab(response);
        });

    };
    //$scope.FetchMonthlyReport = function (data) {
    //    $scope.IsListDivVisible = true;
    //    $('#iReport').attr('src', '../RDLCReports/Collection_MonthwiseReport.aspx?sFromDate=' + data.FROMDATE + "&sToDate=" + data.TODATE);

    //};

    $scope.init();
    $scope.CancelPartLifeCycleReport = function () {
      
        //$scope.obj = null;
        $scope.filterToolPartNumber = [];
        $scope.filterToolUnicodeList = [];
          $scope.init();
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