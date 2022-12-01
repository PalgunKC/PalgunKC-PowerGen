PartLifeCycleReportApp.controller('PartLifeCycleReportCtrl', function (Excel, $timeout, $scope, $filter, PartLifeCycleReportServices, commonService, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {
    $scope.PartLifeCycleReportList = [];
    $scope.Initialize = true;

     $scope.PartMasterList = [];
    //$scope.SpareVendorList = [];
    $scope.SpareingReturnList = [];
    $scope.SpareLocationList = [];
    $scope.SpareUploadList = [];
    $scope.Min = 1;
    $scope.LineList = [];
    $scope.MachineList = [];
    $scope.ReasonList = [];
    $scope.SpareReturnReason = [];
    $scope.SpareIssueList = [];
    keyname = 'SpareIsu_Partno';
    keyname1 = 'SpareIsu_CurUnicode';
    keys = [];
    keys1 = [];
    $scope.filterSparePartNumber = [];
    $scope.machinecodeError = false;
    $scope.IsRequired = false;

    //$scope.init = function () {
    //    $scope.IsListDivVisible = false;
    //};
    $scope.init = function () {
        debugger;
        keys = [];
        commonService.postWebService('Spare/BindListSpareingReturn', { 'P_KEY': 'L', 'dummy_col1': 'Part' }).then(function (response) {
            $scope.PartMasterList = response.ddlPartmaster;
            $scope.Part_Flag = true;
        });
        commonService.postWebService('Spare/BindListSpareingReturn', { 'P_KEY': 'L', 'dummy_col1': 'Location' }).then(function (response) {

            $scope.SpareLocationList = response.ddlSpareLocation;
            $scope.Location_Flag = true;
        });
        commonService.postWebService('Spare/BindListSpareingReturn', { 'P_KEY': 'L', 'dummy_col1': 'Return' }).then(function (response) {

            $scope.SpareingReturnList = response.ddSpareingReturn;
            $scope.Return_Flag = true;
        });
        commonService.postWebService('Spare/BindListSpareingReturn', { 'P_KEY': 'L', 'dummy_col1': 'Shift' }).then(function (response) {
            $scope.ShiftMasterList = response.ddlShiftmaster;
            $scope.SpareRts_plant = response.ddlOrgId;
            $scope.Shift_Flag = true;
        });
        commonService.postWebService('Spare/BindListSpareingReturn', { 'P_KEY': 'L', 'dummy_col1': 'Line' }).then(function (response) {
            $scope.LineList = response.ddlLine;
            $scope.Shift_Flag1 = true;
        });
        commonService.postWebService('Spare/BindListSpareingReturn', { 'P_KEY': 'L', 'dummy_col1': 'Regrain' }).then(function (response) {

            angular.forEach($scope.SpareingReturnList, function (value, key) {
                value.SpareRts_Qty = parseFloat(value.SpareRts_Qty);


            });
            $scope.SpareUploadList = response.ddlSpareUpload;
            angular.forEach($scope.SpareUploadList, function (value, key) {
                value.Quantity = parseFloat(value.Quantity);

            });


            angular.forEach($scope.PartMasterList, function (value, key) {
                angular.forEach($scope.SpareIssueList, function (value1, key) {

                    if (value1.SpareIsu_Partno == value.PartNumber) {
                        value1.PartName = value.PartName;
                        value1.PartSpecification = value.PartSpecification;


                    }

                });
            });

            angular.forEach($scope.SpareIssueList, function (item) {
                // we check to see whether our object exists
                //if (item['Is_Return'] != 'Y')
                //    {
                var key = item[keyname];
                // if it's not already part of our keys array
                if (keys.indexOf(key) === -1 && item['Spare_Status'] === 'I') {
                    // add it to our keys array
                    keys.push(key);
                    // push this item to our final output array
                    //output.push(item);
                    $scope.filterSparePartNumber.push(item)
                }
                ///}
            });

            $scope.IsListDivVisible = false;
        });
        //commonService.postWebService('Spare/BindListSpareingReturn', {}).then(function (response) {
        //    $scope.PartMasterList = response.ddlPartmaster;
        //    $scope.SpareLocationList = response.ddlSpareLocation;
        //   // $scope.SpareVendorList = response.ddlVendormaster;
        //    $scope.SpareingReturnList = response.ddSpareingReturn;
        //    //$scope.SpareReturnReason = response.ddlReturnReason.map(function (item) {
        //    //    return { id: item['ReasonCode'], label: item['ReasonCode'] + '-' + item['ReasonDetails'] };
        //    //});
        //    $scope.ShiftMasterList = response.ddlShiftmaster;
        //    $scope.SpareRts_plant = response.ddlOrgId;
        //    $scope.LineList = response.ddlLine;
        //    $scope.SpareIssueList = response.ddlSpareingIssue;
        //    //angular.forEach($scope.SpareIssueList, function (value, key) {
        //    //    value.SpareReq_Qty = (value.SpareReq_Qty);
        //    //    value.SpareReq_AvailableQty = (value.SpareReq_AvailableQty);

        //    //});
        //    //$scope.obj.SpareReq_no = $scope.SpareingReturnList[0].Max_SpareReq_no;

        //    angular.forEach($scope.SpareingReturnList, function (value, key) {
        //        value.SpareRts_Qty = parseFloat(value.SpareRts_Qty);


        //    });
        //    $scope.SpareUploadList = response.ddlSpareUpload;
        //    angular.forEach($scope.SpareUploadList, function (value, key) {
        //        value.Quantity = parseFloat(value.Quantity);

        //    });


        //    angular.forEach($scope.PartMasterList, function (value, key) {
        //        angular.forEach($scope.SpareIssueList, function (value1, key) {

        //            if (value1.SpareIsu_Partno == value.PartNumber) {
        //                value1.PartName = value.PartName;
        //                value1.PartSpecification = value.PartSpecification;


        //            }

        //        });
        //    });

        //    angular.forEach($scope.SpareIssueList, function (item) {
        //        // we check to see whether our object exists
        //        //if (item['Is_Return'] != 'Y')
        //        //    {
        //        var key = item[keyname];
        //        // if it's not already part of our keys array
        //        if (keys.indexOf(key) === -1) {
        //            // add it to our keys array
        //            keys.push(key);
        //            // push this item to our final output array
        //            //output.push(item);
        //            $scope.filterSparePartNumber.push(item)
        //        }
        //        ///}
        //    });

        //    $scope.IsListDivVisible = false;
        //   // $scope.IsEditDivVisible = false;
        //});
       // $scope.DatatableInitialize();
    };

    $scope.BindPartName = function (row) {
        debugger;
        $scope.IsRequired = false;
        $scope.filterSpareUnicodeList = [];
        keys1 = [];
        //angular.forEach($scope.PartMasterList, function (value, key) {
        //    if (value.PartNumber == row.SpareRts_Partno) {
        //        row.SpareRts_Partname = value.PartName,
        //        row.SpareRts_AvailableQty = parseFloat(value.TotalProductCount),
        //         row.Sparetype = value.IsReusable
        //    };
        //    if (value.PartNumber == row.SpareRts_Partno) {
        //        row.SpareRts_PartSpecification = value.PartSpecification
        //        if (value.IsReusable == 'Y') {
        //            if (!row.SpareRts_Unicode) {
        //                $scope.IsRequired = true;
        //            }
        //        }

        //        //return false;
        //    };
        //});
        //angular.forEach($scope.filterSparePartNumber, function (value, key) {
        //    if (value.SpareIsu_Partno == row.SpareRts_Partno) {
        //        if (value.Is_Return == 'Y') {

        //            $("#Message").val('Alter !! ');//Messgae
        //            $('#Title').html(row.SpareRts_Partno + ' Already Returned');//Title
        //            row.SpareRts_Partno = '';
        //            $("#Message").trigger("click");

        //        }
        //    }
        //});
        angular.forEach($scope.SpareIssueList, function (value, key) {
            if (value.SpareIsu_CurUnicode) {
                if (value.SpareIsu_Partno == row.PartNumber) {
                    var key = value[keyname1];
                    // if it's not already part of our keys array
                    if (keys1.indexOf(key) === -1) {
                        // add it to our keys array
                        keys1.push(key);
                        // push this item to our final output array
                        //output.push(item);
                        $scope.filterSpareUnicodeList.push(value)
                    }
                    // $scope.filterSpareUnicodeList.push(value)
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
            $scope.PartLifeCycleReportList = response.liSpareLifeCycleReport;
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
        $scope.filterSparePartNumber = [];
        $scope.filterSpareUnicodeList = [];
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

        window.location = '/Spare/Download?ID=' + response.ID + '&Name=' + response.FileName;
    };

});