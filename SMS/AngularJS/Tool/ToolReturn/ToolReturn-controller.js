ToolingreturnApp.controller('ToolingreturnCtrl', function (Excel, $timeout, $scope, $filter, ToolingreturnServices, commonService, DTOptionsBuilder, DTColumnBuilder) {
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
    //keyname = 'ToolIsu_Partno';
    keyname = 'PartId';
    keyname1 = 'ToolIsu_CurUnicode';
    keys = [];
    keys1 = [];
    $scope.filterToolPartNumber = [];
    $scope.machinecodeError = false;
    $scope.IsRequired = false;
    $scope.EmployeeMasterList = [];
    $scope.PartGroupMasterList = [];
    $scope.PartGroupList = [];
    $scope.obj = new ToolingreturnServices.ToolingreturnData(null);

    $scope.Part_Flag = false;
    $scope.Location_Flag = false;
    $scope.Return_Flag = false;
    $scope.Vendor_Flag = false;
    $scope.Shift_Flag = false;
    $scope.Line_Flag = false;
    $scope.Issue_Flag = false;
    $scope.Employee_Flag = false;
    $scope.ReturnReason_Flag = false;


    $scope.init = function () {
        debugger;

        commonService.postWebService('Tool/BindListToolingReturn', { 'P_KEY': 'L', 'dummy_col1': 'Reason' }).then(function (response) {
            $scope.ToolReturnReason = response.ddlReturnReason;
            $scope.ReturnReason_Flag = true;
        });

        commonService.postWebService('Tool/BindListToolingReturn', { 'P_KEY': 'L', 'dummy_col1': 'Part' }).then(function (response) {

            $scope.PartMasterList = response.ddlPartmaster;
            $scope.Part_Flag = true;
        });

        commonService.postWebService('Tool/BindListToolingReturn', { 'P_KEY': 'L', 'dummy_col1': 'ProductGroup' }).then(function (response) {
            $scope.PartGroupList = response.ddlToolPartGroup;
            $scope.ProductGroup_Flag = true;
        });

        commonService.postWebService('Tool/BindListToolingReturn', { 'P_KEY': 'L', 'dummy_col1': 'Location' }).then(function (response) {
            $scope.ToolLocationList = response.ddlToolLocation;
            $scope.Location_Flag = true;
        });
        commonService.postWebService('Tool/BindListToolingReturn', { 'P_KEY': 'L', 'dummy_col1': 'Return' }).then(function (response) {

            $scope.ToolingReturnList = response.ddToolingReturn;
            $scope.Return_Flag = true;
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
            $scope.Issue_Flag = true;
        });

        commonService.postWebService('Tool/BindListToolingReturn', { 'P_KEY': 'L', 'dummy_col1': 'Employee' }).then(function (response) {

            $scope.EmployeeMasterList = response.ddlEmployeeMaster;
            angular.forEach($scope.ToolingReturnList, function (value, key) {
                value.ToolRts_Qty = parseFloat(value.ToolRts_Qty);
                value.ToolRts_id = parseFloat(value.ToolRts_id);
            });
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

                angular.forEach($scope.ToolingReturnList, function (value2, key) {
                    if (value2.PartId == value.PartId) {
                        value2.ToolRts_Partno = value.PartNumber;
                        value2.ToolRts_Partname = value.PartName;
                        value2.ToolRts_PartSpecification = value.PartSpecification;
                    }
                });
            });

            angular.forEach($scope.ToolIssueList, function (item) {

                var key = item[keyname];
                if (keys.indexOf(key) === -1 && item['Tool_Status']==='I') {
                    keys.push(key);
                    $scope.filterToolPartNumber.push(item)
                }
            });

            $scope.Employee_Flag = true;

            $scope.IsListDivVisible = true;
            $scope.IsEditDivVisible = false;
            $scope.obj.ToolRts_Return_no = $scope.ToolingReturnList[0].ToolRts_no;

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

    $scope.GetExcelData = function () {
        commonService.postWebService('Tool/GetExcelToolPartReturnData', { 'P_KEY': 'EXCEL', 'dummycolumn1': 'Part' }).then(function (response) {

            $scope.DownloadTab(response);
        });
    }
    $scope.DownloadTab = function (response) {
        window.location = '/Tool/Download?ID=' + response.ID + '&Name=' + response.FileName;
    };

    $scope.getLineDetails = function (row) {
        debugger;
        var request = new ToolingreturnServices.getLineDetails(row);
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;
            if (response.ddlLineMachine != null) {
                if (response.ddlLineMachine.length > 0) {
                    var names = response.ddlLineMachine.map(function (item) {
                        return item['LineMachine_Machine_Code'];
                    });
                    var names1 = response.ddlLineMachine.map(function (item) {
                        return { id: item['LineMachine_Machine_Code'], label: item['LineMachine_Machine_Code'] + '-' + item['MachineName'] + ' - ' + item['MachineNumber'] };
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

    $scope.BindPartName = function (row, Key) {
        debugger;
        $scope.IsRequired = false;
        $scope.filterToolUnicodeList = [];
        keys1 = [];
        if (Key == 'A') {
            row.ToolRts_Unicode = '';
        }
        angular.forEach($scope.PartMasterList, function (value, key) {
            if (value.PartNumber == row.ToolRts_Partno) {
                row.PartId = value.PartId;
            }
        });
        angular.forEach($scope.PartMasterList, function (value, key) {
            if (value.PartId == row.PartId) {
                // if (value.PartNumber == row.ToolRts_Partno) {
                row.ToolRts_Partname = value.PartName,
                row.ToolRts_AvailableQty = parseFloat(value.TotalProductCount),
                 row.Tooltype = value.IsReusable
            };
            if (value.PartNumber == row.ToolRts_Partno) {
                row.ToolRts_PartSpecification = value.PartSpecification
                if (value.IsReusable == 'Y') {
                    if (!row.ToolRts_Unicode) {
                        $scope.IsRequired = true;
                    }
                }

                //return false;
            };
        });

        angular.forEach($scope.ToolIssueList, function (value, key) {
            if (value.ToolIsu_CurUnicode) {
                //if (value.ToolIsu_Partno == row.ToolRts_Partno) {
                if (value.PartId === row.PartId) {
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

    $scope.BindIsuId = function (row) {
        debugger;
        var i = '';

        $scope.IsRequired = false;
        angular.forEach($scope.ToolIssueList, function (value, key) {

            //if (value.ToolIsu_Partno == row.ToolRts_Partno && value.ToolIsu_CurUnicode == row.ToolRts_Unicode) {
            if (value.PartId == row.PartId && value.ToolIsu_CurUnicode == row.ToolRts_Unicode) {
                i = '';
                row.RegrainCode = value.RegrainCode;
                //row.PartId = value.PartId;
                row.ToolIsu_datetime = value.ToolIsu_datetime;
                row.ToolIsu_id = value.ToolIsu_id;
                if (value.Is_Return == 'Y') {

                    i = row.ToolRts_Unicode;
                }
            }
        });
        if (i != '') {
            $("#Message").val('Alter !! ');//Messgae
            $('#Title').html(i + ' Already Returned');//Title
            row.ToolRts_Unicode = '';
            $scope.IsRequired = true;
            $("#Message").trigger("click");

        }

        if (!row.ToolRts_Unicode) {
            $scope.IsRequired = true;
        }

        //angular.forEach($scope.filterToolUnicodeList, function (value, key) {
        //if (row.ToolRts_Unicode.ToolIsu_CurUnicode)
        //    {
        //if (value.ToolIsu_CurUnicode == row.ToolRts_Unicode.ToolIsu_CurUnicode) {
        //    row.ToolIsu_datetime = value.ToolIsu_datetime,
        //    //row.ToolRqt_datetime = value.ToolReq_Date,
        //    row.ToolIsu_id = value.ToolIsu_id
        //    //$scope.filterToolUnicodeList.push(item)
        //};
        //}
        //else
        //{
        //if (value.ToolIsu_CurUnicode == row.ToolRts_Unicode) {
        //    row.ToolIsu_datetime = value.ToolIsu_datetime,
        //    //row.ToolRqt_datetime = value.ToolReq_Date,
        //    row.ToolIsu_id = value.ToolIsu_id
        //    //$scope.filterToolUnicodeList.push(item)
        //};
        //}

        //});
    }
    //$scope.filterPartMasterList = function (ToolUploadList) {
    //    return (ToolUploadList.IsActive === 'Y' && ToolUploadList.Tool_Status === 'I');
    //}

    $scope.filterPartGroupList = function (PartGroupList) {
        return (PartGroupList.IsActive === 'Y');
    }
    $scope.filterToolReturnReason = function (ToolReturnReason) {
        return (ToolReturnReason.IsActive === 'Y');
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

    $scope.CancelToolingReturn = function () {
        $scope.IsListDivVisible = true;
        $scope.IsEditDivVisible = false;
        $scope.selectionLimit = 1;
        $scope.obj = null;
        $scope.ToolReturnForm.$setPristine();
    };

    var intervalId = window.setInterval(
    $scope.AddTab_Visblity = function () {
        if ($scope.Part_Flag === false || $scope.Location_Flag === false || $scope.Return_Flag === false || $scope.Vendor_Flag === false || $scope.Shift_Flag === false || $scope.Line_Flag === false || $scope.Issue_Flag === false || $scope.Employee_Flag === false || $scope.ReturnReason_Flag===false)
        {
            //return false;
            $scope.isAddTab_Visblity = false
        } else
        {
            $scope.isAddTab_Visblity = true
            $timeout(function () {
                angular.element('#fakeButton').triggerHandler('click');
            });
            clearInterval(intervalId);
           // return true;
        }
    }
    , 500)

    $scope.editClick = function (row, key, IsActive) {
        debugger;
        if (!$scope.isAddTab_Visblity) {
            return false;
        }
       
        $scope.PartGroupMasterList = [];
        $scope.IsEditDivVisible = true;
        $scope.IsListDivVisible = false;
        $scope.IsRequired = false;
        if (key == 'E') {
            $scope.disableCtrl = false;
            $scope.BindPartGroupList(row);
            $scope.BindPartName(row, key);
            $scope.obj = new ToolingreturnServices.ToolingreturnData(row);
            $scope.obj.ToolRts_Qty = parseFloat($scope.obj.ToolRts_Qty);
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
        else if (key == 'V') {
            $scope.BindPartGroupList(row);
            $scope.BindPartName(row, key);
            $scope.obj = new ToolingreturnServices.ToolingreturnData(row);
            $scope.obj.ToolRts_Qty = parseFloat($scope.obj.ToolRts_Qty);
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
            $scope.disableCtrl = true;
        }
        else {
            $scope.disableCtrl = false;
            $scope.obj = new ToolingreturnServices.ToolingreturnData(null);
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


            $scope.obj.ToolRts_plant = $scope.ToolRts_plant;
            $scope.obj.ToolRqt_datetime = datetime;
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
    $scope.BindPartGroupList = function (row) {
        $scope.PartGroupMasterList = [];
        $scope.PartGroupMasterList = $scope.filterToolPartNumber.filter(function (o) {
            return o.ProductGroup === row.ProductGroup && o.Tool_Status==='I'});

    }
    $scope.BindVendorName = function (row) {
        debugger;
        angular.forEach($scope.ToolVendorList, function (value, key) {
            if (value.VendorCode == row.VendorCode) { row.VendorName = value.VendorName };
        });
    }
    $scope.submitForm = function (isValid, Toolingreturn) {
        // check to make sure the form is completely valid
        debugger;
        if ($scope.IsRequired) {
            isValid = false;
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
            $scope.machinecodeError = false;
            Toolingreturn.ToolRts_Reason = Toolingreturn.ToolRts_Reason;
            //Toolingreturn.ToolRts_Unicode = Toolingreturn.ToolRts_Unicode.ToolIsu_CurUnicode;
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
        var request = new ToolingreturnServices.SaveToolingReturn(Toolingreturn);
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
                else {
                    $("#Message").val('Saved !! ');//Messgae
                    $('#Title').html('Tool Return Saved Successfully');//Title
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
        $scope.obj = new ToolingreturnServices.ToolingreturnData(row);
        myFunctionCompany();
    }

});
