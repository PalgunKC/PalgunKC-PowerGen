ToolingreturnchkApp.controller('ToolingreturnchkCtrl', function (Excel, $timeout, $scope, $filter, ToolingreturnchkServices, commonService, DTOptionsBuilder, DTColumnBuilder) {
    $scope.disableTabCtrl = true;
    $scope.PartMasterList = [];
    $scope.ToolVendorList = [];
    $scope.ToolingReturnChkList = [];
    $scope.ToolLocationList = [];
    $scope.ToolUploadList = [];
    $scope.Min = 1;
    $scope.LineList = [];
    $scope.MachineList = [];
    $scope.ReasonList = [];
    $scope.ToolReturnReason = [];
    $scope.ToolIssueList = [];
    $scope.machinecodeError = false;

    $scope.Part_Flag = false;
    $scope.Location_Flag = false;
    $scope.Return_Flag = false;
    $scope.Reason_Flag = false;
    $scope.Vendor_Flag = false;
    $scope.Shift_Flag = false;
    $scope.Line_Flag = false;
    $scope.Issue_Flag = false;

    $scope.obj = new ToolingreturnchkServices.ToolingreturnchkData(null);
    $scope.init = function () {
        debugger;
       
        commonService.postWebService('Tool/BindListToolingReturn', { 'P_KEY': 'L', 'dummy_col1': 'Part' }).then(function (response) {
            $scope.PartMasterList = response.ddlPartmaster;
            $scope.Part_Flag = true;
        });
        commonService.postWebService('Tool/BindListToolingReturn', { 'P_KEY': 'L', 'dummy_col1': 'Location' }).then(function (response) {
            $scope.ToolLocationList = response.ddlToolLocation;  
            $scope.Location_Flag = true;
        });
        commonService.postWebService('Tool/BindListToolingReturn', { 'P_KEY': 'L', 'dummy_col1': 'Return' }).then(function (response) {

            $scope.ToolingReturnChkList = response.ddToolingReturn;
            $scope.obj.ToolRts_Return_no = $scope.ToolingReturnChkList[0].ToolRts_no;
            angular.forEach($scope.ToolingReturnChkList, function (value, key) {
                value.ToolRts_Qty = parseFloat(value.ToolRts_Qty);
            });

            $scope.Return_Flag = true;
        });

        commonService.postWebService('Tool/BindListToolingReturn', { 'P_KEY': 'L', 'dummy_col1': 'Reason' }).then(function (response) {
            $scope.ToolReturnReason = response.ddlReturnReason;
            $scope.Reason_Flag = true;
        });

        commonService.postWebService('Tool/BindListToolingReturn', { 'P_KEY': 'L', 'dummy_col1': 'Vendor' }).then(function (response) {

            $scope.ToolVendorList = response.ddlVendormaster;
            $scope.Vendor_Flag = true;
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
        commonService.postWebService('Tool/BindListToolingReturn', { 'P_KEY': 'L', 'dummy_col1': 'Issue' }).then(function (response) {

            $scope.ToolIssueList = response.ddlToolingIssue;
            $scope.ToolUploadList = response.ddlToolUpload;
            angular.forEach($scope.ToolUploadList, function (value, key) {
                value.Quantity = parseFloat(value.Quantity);

            });
            $scope.IsListDivVisible = true;
            $scope.IsEditDivVisible = false;
            $scope.Issue_Flag = true;
        });
        $scope.DatatableInitialize();
    };
    $scope.Machinesettings = {
        scrollableHeight: '200px',
        scrollable: true,
        enableSearch: true,
        dynamicTitle: true,
        smartButtonMaxItems: 1,
        selectionLimit: 1,
        showCheckAll: false,
        showUncheckAll: false,
        closeOnSelect: true,
        Width: true,
        dropdownWidth: '100%'
    };

    $scope.getLineDetails = function (row) {
        debugger;
        var request = new ToolingreturnchkServices.getLineDetails(row);
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;
            if (response.ddlLineMachine != null) {
                if (response.ddlLineMachine.length > 0) {
                    var names = response.ddlLineMachine.map(function (item) {
                        return item['LineMachine_Machine_Code'];
                    });
                    var names1 = response.ddlLineMachine.map(function (item) {
                        return { id: item['LineMachine_Machine_Code'], label: item['LineMachine_Machine_Code'] + '-' + item['MachineName'] + ' - ' + item['MachineNumber']};
                    });
                    $scope.MachineList = names1;
                    $scope.obj.Machinecode = { id: row.ToolReq_MachineCode };
                }
                else {
                    $scope.MachineList = [];
                    $scope.obj.Machinecode = { id: '' };
                }
            }
            else {

                $scope.MachineList = [];
                $scope.obj.Machinecode = { id: '' };
            }
            //var names = response.ddlLineMachine.map(function (item) {
            //    return item['LineMachine_Machine_Code'];
            //});
            //var names1 = response.ddlLineMachine.map(function (item) {
            //    return { id: item['LineMachine_Machine_Code'], label: item['LineMachine_Machine_Code'] + '-' + item['MachineName'] };
            //});

            $scope.MachineList = names1;
            $scope.obj.Machinecode = { id: row.ToolRts_MachineName };
            //$scope.obj.ToolRts_Reason = { id: row.ToolRts_Reason };
            //$scope.obj.Machinecode = names1;
        });
    }

    $scope.BindPartName = function (row) {
        debugger;
        // $scope.obj.Quantity = ''
        //angular.forEach($scope.ToolUploadList, function (value, key) {
        //    if (value.PartNumber == row.ToolReq_Partno) {
        //        row.ToolReq_Partname = value.PartName

        //    };
        //    //if (value.PartNumber == row.ToolReq_Partno) {
        //    //    row.ToolReq_uniquecode = value.ToolUniqueCode
        //    //    return false;
        //    //};
        //    //if (value.PartNumber == row.PartNumber) { row.UOM = value.UOM };
        //    //if (value.PartNumber == row.PartNumber) { $scope.Min = value.Min_qty };
        //    //if (value.PartNumber == row.PartNumber) { $scope.Max = value.Max_qty };


        //});
        //var selectedReason = $scope.ToolReturnReason.filter(function (obj) {
        //    return obj.ReasonCode === row.ToolReq_Reason
        //});
        //row.ToolReq_Reason = selectedReason;

        angular.forEach($scope.ToolIssueList, function (value, key) {
            //if (value.ToolIsu_Partno == row.ToolRts_Partno) {
            if (value.ToolIsu_id == row.ToolIsu_id) {

                row.ToolIsu_datetime = value.ToolIsu_datetime,
                //row.ToolRqt_datetime = value.ToolReq_Date,
                row.ToolRts_Partno = value.ToolIsu_Partno
                // row.ToolIsu_id = value.ToolIsu_id
            };

        });
        angular.forEach($scope.PartMasterList, function (value, key) {
            if (value.PartNumber == row.ToolRts_Partno) {
                row.PartId = value.PartId;
            }
        });

        angular.forEach($scope.PartMasterList, function (value, key) {
            if (value.PartId == row.PartId) {
                //if (value.PartNumber == row.ToolRts_Partno) {
                value.PartNumber = row.ToolRts_Partno
                row.ToolRts_Partname = value.PartName,
                row.ToolRts_AvailableQty = parseFloat(value.TotalProductCount),
                 row.Tooltype = value.IsReusable
            };
            if (value.PartNumber == row.ToolRts_Partno) {
                row.ToolRts_PartSpecification = value.PartSpecification
                return false;
            };
        });

        //angular.forEach($scope.ToolIssueList, function (value, key) {
        //    if (value.ToolIsu_Partno == row.ToolRts_Partno) {
        //        row.ToolIsu_datetime = value.ToolIsu_Date,
        //        row.ToolRqt_datetime = value.ToolReq_Date,
        //        row.ToolIsu_id = value.ToolIsu_id
        //    };

        //});
    }

    $scope.filterToolReturnReason = function (ToolReturnReason) {
        return (ToolReturnReason.IsActive === 'Y');
    }

    $scope.filterToolingReturnChkList = function (ToolingReturnChkList) {
        return (ToolingReturnChkList.IsActive === 'Y' && ToolingReturnChkList.Tool_Status === 'RT' && ToolingReturnChkList.Return_Status == '');
    }
    $scope.filterToolLocationList = function (ToolLocationList) {
        return (ToolLocationList.IsActive === 'Y');
    }
    $scope.filterToolVendorList = function (ToolVendorList) {
        return (ToolVendorList.IsActive === 'Y');
    }
    $scope.DatatableInitialize = function () {
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
		  .withOption('order', [0, 'asc']);;
    };
    $scope.exportToExcel = function (tableId) { // ex: '#my-table'
        debugger;
        var exportHref = Excel.tableToExcel(tableId, 'madasamy');
        $timeout(function () {
            var a = document.createElement('a');
            a.href = exportHref;
            a.download = "ToolInward.xls";
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
                pdfMake.createPdf(docDefinition).download("ToolInward.pdf");
            }
        });
    };

        var intervalId = window.setInterval(
        $scope.ShowTab = function () {
            if (  $scope.Part_Flag === false || $scope.Location_Flag === false || $scope.Return_Flag === false ||$scope.Reason_Flag === false || $scope.Vendor_Flag === false ||$scope.Shift_Flag === false ||$scope.Line_Flag === false || $scope.Issue_Flag === false) {
                $scope.disableTabCtrl = true;
            }
            else
            {
                $scope.disableTabCtrl = false;
                $timeout(function() {
                    angular.element('#fakeButton').triggerHandler('click');
                });
                clearInterval(intervalId);
            }
        }
 , 500)


    $scope.GetExcelData = function () {
        commonService.postWebService('Tool/GetExcelToolPartReturnData', { 'P_KEY': 'EXCEL_RC', 'dummycolumn1': 'Part' }).then(function (response) {

            $scope.DownloadTab(response);
        });
    }
    $scope.DownloadTab = function (response) {
        window.location = '/Tool/Download?ID=' + response.ID + '&Name=' + response.FileName;
    };

    $scope.CancelToolingReturnChk = function () {
        $scope.IsListDivVisible = true;
        $scope.IsEditDivVisible = false;
        $scope.selectionLimit = 1;
        $scope.obj = null;
        $scope.ToolReturnForm.$setPristine();
    };


    $scope.editClick = function (row, key, IsActive) {
        debugger;
        $scope.IsEditDivVisible = true;
        $scope.IsListDivVisible = false;
        if (key == 'E') {
            $scope.BindPartName(row);
            $scope.obj = new ToolingreturnchkServices.ToolingreturnchkData(row);
            $scope.obj.KEY = key;

            $scope.obj.LineMachine_Line_Code = row.ToolRts_Linename;
            $scope.getLineDetails($scope.obj);
            $scope.obj.ToolRts_Unicode = row.ToolRts_Unicode;
            if (row.IsActive == 'N') {
                $scope.obj.IsActive = false;
            }
            else {
                $scope.obj.IsActive = true;
            }
            // $scope.BindCity(row, "E");
        }
        else {
            $scope.obj = new ToolingreturnchkServices.ToolingreturnchkData(null);
            if ($scope.ToolingReturnChkList.length > 0) {
                $scope.obj.ToolRts_Return_no = $scope.ToolingReturnChkList[0].ToolRts_no;

            }


            $scope.disablecode = false;
            $scope.obj.IsActive = true;
            $scope.obj.KEY = key;
            var currentdate = new Date();

            var currDate = (currentdate.getFullYear() < 10 ? '0' : '') + currentdate.getFullYear() + "/"
            + (currentdate.getMonth() < 10 ? '0' : '') + (currentdate.getMonth() + 1) + "/"
            + (currentdate.getDate() < 10 ? '0' : '') + currentdate.getDate() + " "
            + (currentdate.getHours() < 10 ? '0' : '') + currentdate.getHours() + ":"
            + (currentdate.getMinutes() < 10 ? '0' : '') + currentdate.getMinutes() + ":"
            + (currentdate.getSeconds() < 10 ? '0' : '') + currentdate.getSeconds();

            var datetime = (currentdate.getFullYear() < 10 ? '0' : '') + currentdate.getFullYear() + "-"
            + (currentdate.getMonth() < 10 ? '0' : '') + (currentdate.getMonth() + 1) + "-"
            + (currentdate.getDate() < 10 ? '0' : '') + currentdate.getDate() + " "
            + (currentdate.getHours() < 10 ? '0' : '') + currentdate.getHours() + ":"
            + (currentdate.getMinutes() < 10 ? '0' : '') + currentdate.getMinutes() + ":"
            + (currentdate.getSeconds() < 10 ? '0' : '') + currentdate.getSeconds();

            var currHours = (currentdate.getHours() < 10 ? '0' : '') + currentdate.getHours() + ":"
            + (currentdate.getMinutes() < 10 ? '0' : '') + currentdate.getMinutes();

            $scope.ShiftMasterList.map(function (shift) {
                debugger;
                // currHours = '05:31';

                console.log(shift)
                if (parseFloat(shift.Shift_StartTime.replace(':', '.')) > 12 && parseFloat(shift.Shift_endTime.replace(':', '.')) > 12 && shift.IsUse == "1") {
                    if (parseFloat(currHours.replace(':', '.')) >= parseFloat(shift.Shift_StartTime.replace(':', '.')) && parseFloat(currHours.replace(':', '.')) <= parseFloat(shift.Shift_endTime.replace(':', '.'))) {
                        $scope.obj.ToolRts_shift = shift.ShiftName;
                    }

                }
                else if (parseFloat(shift.Shift_StartTime.replace(':', '.')) > 12 && parseFloat(shift.Shift_endTime.replace(':', '.')) < 12 && shift.IsUse == "1") {
                    if (parseFloat(shift.Shift_StartTime.replace(':', '.')) >= parseFloat(currHours.replace(':', '.')) && parseFloat(currHours.replace(':', '.')) <= parseFloat(shift.Shift_endTime.replace(':', '.'))) {
                        $scope.obj.ToolRts_shift = shift.ShiftName;
                    }
                    else if (parseFloat(shift.Shift_StartTime.replace(':', '.')) <= parseFloat(currHours.replace(':', '.')) && parseFloat(currHours.replace(':', '.')) >= parseFloat(shift.Shift_endTime.replace(':', '.'))) {
                        $scope.obj.ToolRts_shift = shift.ShiftName;
                    }
                }
                else if (parseFloat(shift.Shift_StartTime.replace(':', '.')) < 12 && parseFloat(shift.Shift_endTime.replace(':', '.')) > 12 && shift.IsUse == "1") {
                    if (parseFloat(currHours.replace(':', '.')) >= parseFloat(shift.Shift_StartTime.replace(':', '.')) && parseFloat(currHours.replace(':', '.')) <= parseFloat(shift.Shift_endTime.replace(':', '.'))) {
                        $scope.obj.ToolRts_shift = shift.ShiftName;
                    }

                }

            })


            $scope.obj.ToolRts_plant = $scope.ToolRts_plant
            $scope.obj.ToolRts_datetime = datetime;
        }
    };
    //$scope.BindPartName = function (row) {
    //    debugger;
    //    $scope.obj.Quantity = ''
    //    angular.forEach($scope.PartMasterList, function (value, key) {
    //        if (value.PartNumber == row.PartNumber) { row.PartName = value.PartName };
    //        //if (value.PartNumber == row.PartNumber) { row.Tooltype = value.IsReusable };
    //        //if (value.PartNumber == row.PartNumber) { row.UOM = value.UOM };
    //        //if (value.PartNumber == row.PartNumber) { $scope.Min = value.Min_qty };
    //        //if (value.PartNumber == row.PartNumber) { $scope.Max = value.Max_qty };

    //    });
    //}
    $scope.BindVendorName = function (row) {
        debugger;
        angular.forEach($scope.ToolVendorList, function (value, key) {
            if (value.VendorCode == row.VendorCode) { row.VendorName = value.VendorName };
        });
    }
    $scope.submitForm = function (isValid, Toolingreturnchk) {
        // check to make sure the form is completely valid
        debugger;
        if (isValid) {
            if (Toolingreturnchk.Machinecode.id == null) {
                $scope.machinecodeError = true;
                return false;
            }
            else if (Toolingreturnchk.Machinecode.id == "") {
                $scope.machinecodeError = true;
                return false;
            }
            $scope.machinecodeError = false;
            Toolingreturnchk.ToolRts_Reason = Toolingreturnchk.ToolRts_Reason;
            $scope.SaveToolingReturnChk(Toolingreturnchk);
            $scope.ToolReturnForm.$setPristine();
        }
        else {
            angular.forEach($scope.ToolReturnForm.$error.required, function (field) {
                field.$setDirty();
            });
            //var PartNumber = document.getElementById("PartNumber");
            //var PartName = document.getElementById("PartName");
            //var VendorCode = document.getElementById("VendorCode");
            //var CostPerUnit = document.getElementById("CostPerUnit");
            //var Quantity = document.getElementById("Quantity");
            //var Tool_Location = document.getElementById("Tool_Location");
            //if (PartNumber.value == "") {
            //    PartNumber.focus();
            //}

            //else if (PartName.value == "") {

            //    PartName.focus();
            //}

            //else if (CostPerUnit.value == "") {

            //    CostPerUnit.focus();
            //}
            //else if (Tool_Location.value == "") {

            //    Tool_Location.focus();
            //}
            //else if (Quantity.value == "") {

            //    Quantity.focus();
            //}
            //else if (VendorCode.value == "") {

            //    VendorCode.focus();
            //}
        }
    };

    $scope.setReturnReason = function (reason) {
        console.log(reason)

    }

    $scope.SaveToolingReturnChk = function (Toolingreturnchk) {
        if (Toolingreturnchk.IsActive == true) {
            Toolingreturnchk.IsActive = "1";

        }
        else {
            Toolingreturnchk.IsActive = "0";
        }
        Toolingreturnchk.ToolRts_MachineName = Toolingreturnchk.Machinecode["id"];
        //Toolingreturnchk.ToolRts_Reason = Toolingreturnchk.ToolRts_Reason["id"];
        Toolingreturnchk.ToolRts_Linename = Toolingreturnchk.LineMachine_Line_Code;
        var request = new ToolingreturnchkServices.SaveToolingReturnChk(Toolingreturnchk);
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;

            if (response.liToolingReturn != null) {
                if (response.liToolingReturn[0].MSG == "Updated Success") {
                    $("#Message").val('Updated !! ');//Messgae
                    $('#Title').html('Tool Return Update Successfully');//Title
                    $scope.init();
                    $scope.obj = null;
                    $scope.ToolReturnForm.$setPristine();
                    $("#Message").trigger("click");
                }
                else if (response.liToolingReturn[0].MSG == "Tool Already Uploaded") {

                    $("#Message").val('Alter !! ');//Messgae
                    $('#Title').html('Part Number - "' + response.liToolingReturn[0].PartNumber + '" Already Exists');//Title
                    $("#Message").trigger("click");
                    $scope.obj.IsActive = true;
                }
                else if (response.liToolingReturn[0].MSG == "Stock Added Success") {

                    $("#Message").val('Updated !! ');//Messgae
                    $('#Title').html('Return Tool Added to Stock Successfully');//Title
                    $scope.init();
                    $scope.obj = null;
                    $scope.ToolReturnForm.$setPristine();
                    $("#Message").trigger("click");
                }
                else if (response.liToolingReturn[0].MSG == "Scraped Success") {

                    $("#Message").val('Updated !! ');//Messgae
                    $('#Title').html('Return Tool Scraped Successfully');//Title
                    $scope.init();
                    $scope.obj = null;
                    $scope.ToolReturnForm.$setPristine();
                    $("#Message").trigger("click");
                }
                else if (response.liToolingReturn[0].MSG == "Already Issued") {

                    $("#Message").val('Alter !! ');//Messgae
                    $('#Title').html('Already This Item Has Been Moved');//Title
                    $scope.init();
                    $scope.obj = null;
                    $scope.ToolReturnForm.$setPristine();
                    $("#Message").trigger("click");
                }
                else {
                    window.location.href = "ToolingRegrindingWithParameter?SRNo=" + response.liToolingReturn[0].ToolRts_Return_no;
                }

            }
            else {
                $("#Message").val('Failed !! ');//Messgae
                $('#Title').html('Error Happened while Saving Category');//Title
                $("#Message").trigger("click");
            }
        });

    };

    $scope.returnAcive = function (act) {
        return act == 1 ? 'Y' : 'N';
    };

    $scope.init();

    $scope.myFunctionCompany = function (row, key) {
        $scope.obj = new ToolingreturnchkServices.ToolingreturnchkData(row);
        myFunctionCompany();
    }

});
