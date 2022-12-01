ToolRegrindcheckApp.controller('ToolingregrindcheckCtrl', function (Excel, $timeout, $scope, $filter, ToolingregrindcheckServices, commonService, DTOptionsBuilder, DTColumnBuilder) {
    $scope.disableTabCtrl = true;
    $scope.PartMasterList = [];
    $scope.ToolVendorList = [];
    $scope.ToolingReturnList = [];
    $scope.ToolLocationList = [];
    $scope.ToolUploadList = [];
    $scope.Min = 1;
    $scope.LineList = [];
    $scope.MachineList = [];
    $scope.ReasonList = [];
    $scope.ToolReturnReason = [];
    $scope.ToolIssueList = [];
    $scope.ToolingRegrain = [];
    $scope.machinecodeError = false;
    $scope.tmp_Regrain_data = false;
    $scope.tmp_Location_error = false;
    $scope.ShowLocationCtrl = false;

    $scope.Part_Flag = false;
    $scope.Location_Flag = false;
    $scope.Return_Flag = false;
    $scope.Vendor_Flag = false;
    $scope.Shift_Flag = false;
    $scope.Line_Flag = false;
    $scope.Issue_Flag = false;
    $scope.Regrain = false;
    $scope.Upload_Flag = false;

    $scope.obj = new ToolingregrindcheckServices.ToolingreturnData(null);

    $scope.init = function () {
        debugger;
        commonService.postWebService('Tool/BindListRegrindCheck', { 'P_KEY': 'L', 'dummy_col1': 'Part' }).then(function (response) {
            $scope.PartMasterList = response.ddlPartmaster;
            $scope.Part_Flag = true;
        });
        commonService.postWebService('Tool/BindListRegrindCheck', { 'P_KEY': 'L', 'dummy_col1': 'Location' }).then(function (response) {
            $scope.ToolLocationList = response.ddlToolLocation;
            $scope.Location_Flag = true;
        });
        commonService.postWebService('Tool/BindListRegrindCheck', { 'P_KEY': 'L', 'dummy_col1': 'Return' }).then(function (response) {
            $scope.ToolingReturnList = response.ddToolingReturn;
            $scope.Return_Flag = true;
        });
        commonService.postWebService('Tool/BindListRegrindCheck', { 'P_KEY': 'L', 'dummy_col1': 'Vendor' }).then(function (response) {
            $scope.ToolVendorList = response.ddlVendormaster;
            $scope.Vendor_Flag = true;
        });
        commonService.postWebService('Tool/BindListRegrindCheck', { 'P_KEY': 'L', 'dummy_col1': 'Shift' }).then(function (response) {
            $scope.ShiftMasterList = response.ddlShiftmaster;
            $scope.ToolRts_plant = response.ddlOrgId;
            $scope.Shift_Flag = true;
        });
        commonService.postWebService('Tool/BindListRegrindCheck', { 'P_KEY': 'L', 'dummy_col1': 'Line' }).then(function (response) {
            $scope.LineList = response.ddlLine;
            $scope.Line_Flag = true;
        });
        commonService.postWebService('Tool/BindListRegrindCheck', { 'P_KEY': 'L', 'dummy_col1': 'Issue' }).then(function (response) {
            $scope.ToolIssueList = response.ddlToolingIssue;
            $scope.Issue_Flag = true;
        });
        commonService.postWebService('Tool/BindListRegrindCheck', { 'P_KEY': 'L', 'dummy_col1': 'Regrain' }).then(function (response) {
            $scope.ToolingRegrain = response.ddlToolingRegrain;
            $scope.Regrain = true;
        });

        commonService.postWebService('Tool/BindListRegrindCheck', { 'P_KEY': 'L', 'dummy_col1': 'Upload' }).then(function (response) {
            $scope.ToolUploadList = response.ddlToolUpload;

            angular.forEach($scope.ToolingRegrain, function (value, key) {
                value.ToolReg_Qty = parseFloat(value.ToolReg_Qty);
                value.ToolReg_Unit_Cost = parseFloat(value.ToolReg_Unit_Cost);
                value.ToolReg_id = parseFloat(value.ToolReg_id);
                angular.forEach($scope.ToolVendorList, function (value1, key) {
                    if (value1.VendorCode == value.ToolReg_VendorCode) {
                        value.ToolReg_VendorName = value1.VendorName;
                    }

                });
            });

            angular.forEach($scope.ToolingReturnList, function (value, key) {
                value.ToolRts_Qty = parseFloat(value.ToolRts_Qty);
            });

            angular.forEach($scope.ToolUploadList, function (value, key) {
                value.Quantity = parseFloat(value.Quantity);

            });
            $scope.Upload_Flag = true;
            $scope.IsListDivVisible = true;
            $scope.IsEditDivVisible = false;
            $scope.obj.ToolRts_Return_no = $scope.ToolingReturnList[0].ToolRts_no;
        });
        $scope.DatatableInitialize();
    };

    $scope.GetExcelData = function () {
        commonService.postWebService('Tool/GetExcelToolPartRegrindingData', { 'P_KEY': 'EXCEL_RC', 'dummycolumn1': 'Part' }).then(function (response) {

            $scope.DownloadTab(response);
        });
    }
    $scope.DownloadTab = function (response) {
        window.location = '/Tool/Download?ID=' + response.ID + '&Name=' + response.FileName;
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
        var request = new ToolingregrindcheckServices.getLineDetails(row);
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;
            if (response.ddlLineMachine != null) {
                if (response.ddlLineMachine.length > 0) {
                    var names = response.ddlLineMachine.map(function (item) {
                        return item['LineMachine_Machine_Code'];
                    });
                    var names1 = response.ddlLineMachine.map(function (item) {
                        return { id: item['LineMachine_Machine_Code'], label: item['LineMachine_Machine_Code'] + '-' + item['MachineName']+ ' - ' + item['MachineNumber'] };
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

    var intervalId = window.setInterval(
 $scope.ShowTab = function () {
     if ($scope.Part_Flag === false || $scope.Location_Flag === false || $scope.Return_Flag === false || $scope.Vendor_Flag === false || $scope.Shift_Flag === false || $scope.Line_Flag === false || $scope.Issue_Flag === false || $scope.Regrain === false || $scope.Upload_Flag === false) {
         $scope.disableTabCtrl = true;
     }
     else {
         $scope.disableTabCtrl = false;
         $timeout(function () {
             angular.element('#fakeButton').triggerHandler('click');
         });
         clearInterval(intervalId);
     }
 }
, 500)

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
        angular.forEach($scope.PartMasterList, function (value, key) {
            if (value.PartNumber == row.ToolRts_Partno.substr(0, 8)) {
                row.ToolRts_Partname = value.PartName,
                row.ToolRts_AvailableQty = parseFloat(value.TotalProductCount)
            };
            if (value.PartNumber == row.ToolRts_Partno.substr(0, 8)) {
                row.ToolRts_PartSpecification = value.PartSpecification
                return false;
            };
        });

        angular.forEach($scope.ToolIssueList, function (value, key) {
            if (value.ToolIsu_Partno == row.ToolRts_Partno) {
                row.ToolIsu_datetime = value.ToolIsu_Date,
                row.ToolRqt_datetime = value.ToolReq_Date,
                row.ToolIsu_id = value.ToolIsu_id
            };

        });
    }

    //$scope.filterPartMasterList = function (ToolUploadList) {
    //    return (ToolUploadList.IsActive === 'Y' && ToolUploadList.Tool_Status === 'I');
    //}
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

    $scope.CancelToolingReturn = function () {
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
        $scope.ShowLocationCtrl = false;
        $scope.machinecodeError = false;
        $scope.tmp_Regrain_data = false;
        $scope.tmp_Location_error = false;

        if (key == 'E') {
            $scope.tmp_Return_Status = row.Return_Status;
            $scope.disableCtrl = false;
            $scope.BindPartName(row);
            $scope.obj = new ToolingregrindcheckServices.ToolingreturnData(row);
            $scope.obj.KEY = key;

            $scope.obj.LineMachine_Line_Code = row.ToolRts_Linename;
            $scope.getLineDetails($scope.obj);

            if (row.IsActive == 'N') {
                $scope.obj.IsActive = false;
            }
            else {
                $scope.obj.IsActive = true;
            }
            // $scope.BindCity(row, "E");
        }
       else if (key == 'V') {
            $scope.BindPartName(row);
            $scope.obj = new ToolingregrindcheckServices.ToolingreturnData(row);
            $scope.obj.KEY = key;

            $scope.obj.LineMachine_Line_Code = row.ToolRts_Linename;
            $scope.getLineDetails($scope.obj);

            if (row.IsActive == 'N') {
                $scope.obj.IsActive = false;
            }
            else {
                $scope.obj.IsActive = true;
            }
            $scope.disableCtrl = true;
            // $scope.BindCity(row, "E");
        }
        else {
            $scope.obj = new ToolingregrindcheckServices.ToolingreturnData(null);
            if ($scope.ToolingReturnList.length > 0) {
                $scope.obj.ToolRts_Return_no = $scope.ToolingReturnList[0].ToolRts_no;

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
    $scope.ActionForStatus = function (row) {
        debugger;
        $scope.ShowLocationCtrl = false;

        if (row.Return_Status == 'ST') {
            $scope.tmp_Regrain_data = false;
            $scope.ShowLocationCtrl = true;
        }
       
    }
    $scope.submitForm = function (isValid, Toolingreturn) {
        // check to make sure the form is completely valid
        $scope.machinecodeError = false;
        $scope.tmp_Regrain_data = false;
        $scope.tmp_Location_error = false;

        debugger;
        if (Toolingreturn.Return_Status == "ST") {
        }
        else if (isValid == false) {
            if ($scope.ToolReturnForm.$error.required.length == 1) {
                if ($scope.ToolReturnForm.$error.required[0].$name == 'Tool_Location') {
                    isValid = true;

                }
            }
        }
        else {
            isValid = isValid;
        }
        if (isValid) {
            if (Toolingreturn.Machinecode.id == null) {
                $scope.machinecodeError = true;
                return false;
            }
            else if (Toolingreturn.Machinecode.id == "") {
                $scope.machinecodeError = true;
                return false;
            }
            if ($scope.tmp_Return_Status == Toolingreturn.Return_Status) {
                $scope.tmp_Regrain_data = true;
                return false;
            }
            if (Toolingreturn.Return_Status=="RE") {
                $scope.tmp_Location_error = true;
                return false;
            }
        

            Toolingreturn.ToolRts_Reason = Toolingreturn.ToolRts_Reason;
            //Toolingreturn.ToolReg_RegrainPartNo = Toolingreturn.ToolRts_Partno
            $scope.SaveToolingReturn(Toolingreturn);
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

    $scope.SaveToolingReturn = function (Toolingreturn) {
        if (Toolingreturn.IsActive == true) {
            Toolingreturn.IsActive = "1";

        }
        else {
            Toolingreturn.IsActive = "0";
        }
        Toolingreturn.ToolRts_MachineName = Toolingreturn.Machinecode["id"];
        //Toolingreturn.ToolRts_Reason = Toolingreturn.ToolRts_Reason["id"];
        Toolingreturn.ToolRts_Linename = Toolingreturn.LineMachine_Line_Code;
        var request = new ToolingregrindcheckServices.SaveRegrindCheck(Toolingreturn);
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
                    //   alert("Tool Return Update Successfully")

                    //  $scope.CancelToolingReturn();
                }
                else if (response.liToolingReturn[0].MSG == "Tool Already Uploaded") {

                    $("#Message").val('Alter !! ');//Messgae
                    $('#Title').html('Part Number - "' + response.liToolingReturn[0].PartNumber + '" Already Exists');//Title
                    $("#Message").trigger("click");
                    $scope.obj.IsActive = true;
                }
                else if (response.liToolingReturn[0].MSG == "Stock Added Success") {

                    $("#Message").val('Updated !! ');//Messgae
                    $('#Title').html('Regrain Tool Added to Stock Successfully');//Title
                    $scope.init();
                    $scope.obj = null;
                    $scope.ToolReturnForm.$setPristine();
                    $("#Message").trigger("click");
                }
                else if (response.liToolingReturn[0].MSG == "Scraped Success") {

                    $("#Message").val('Updated !! ');//Messgae
                    $('#Title').html('Regrain Tool Scraped Successfully');//Title
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
                    $("#Message").val('Saved !! ');//Messgae
                    $('#Title').html('Regrain Tool Saved Successfully');//Title
                    $scope.init();
                    $scope.obj = null;
                    $scope.ToolReturnForm.$setPristine();
                    $("#Message").trigger("click");
                    // alert("Tool Returned Successfully")

                    //  $scope.CancelToolingReturn();
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
        $scope.obj = new ToolingregrindcheckServices.ToolingreturnData(row);
        myFunctionCompany();
    }

});
