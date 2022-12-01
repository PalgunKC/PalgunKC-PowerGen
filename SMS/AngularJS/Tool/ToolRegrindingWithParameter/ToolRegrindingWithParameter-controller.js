ToolingregrindApp.controller('ToolingregrindCtrl', function (Excel, $timeout, $scope, $filter, ToolingregrindServices, commonService, DTOptionsBuilder, DTColumnBuilder) {
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

    $scope.machinecodeError = false;

    $scope.obj = new ToolingregrindServices.ToolingreturnData(null);

    $scope.init = function () {
        debugger;
        //console.log(window.location.search);
        commonService.postWebService('Tool/BindListRegrindingWithParameter', {
            "SRNo":  window.location.search.substring(6)
        }).then(function (response) {
            $scope.PartMasterList = response.ddlPartmaster;
            $scope.ToolLocationList = response.ddlToolLocation;
            $scope.ToolingReturnList = response.ddToolingReturn;
            $scope.ToolVendorList = response.ddlVendormaster;
            //$scope.ToolReturnReason = response.ddlReturnReason.map(function (item) {
            //    return { id: item['ReasonCode'], label: item['ReasonCode'] + '-' + item['ReasonDetails'] };
            //});
            $scope.ShiftMasterList = response.ddlShiftmaster;
            $scope.ToolRts_plant = response.ddlOrgId;
            $scope.LineList = response.ddlLine;
            $scope.ToolIssueList = response.ddlToolingIssue;
            //angular.forEach($scope.ToolIssueList, function (value, key) {
            //    value.ToolReq_Qty = (value.ToolReq_Qty);
            //    value.ToolReq_AvailableQty = (value.ToolReq_AvailableQty);

            //});
            //$scope.obj.ToolReq_no = $scope.ToolingReturnList[0].Max_ToolReq_no;

            angular.forEach($scope.ToolingReturnList, function (value, key) {
                value.ToolRts_Qty = parseFloat(value.ToolRts_Qty);


            });
            $scope.ToolUploadList = response.ddlToolUpload;
            angular.forEach($scope.ToolUploadList, function (value, key) {
                value.Quantity = parseFloat(value.Quantity);

            });
            //$scope.IsListDivVisible = true;
            //$scope.IsEditDivVisible = false;
            $scope.obj.ToolReg_Regrain_no = $scope.ToolingReturnList[0].ToolReg_Regrain_no;
            $scope.editClick($scope.ToolingReturnList[0],'E','');
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
        var request = new ToolingregrindServices.getLineDetails(row);
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
            
                row.ToolIsu_datetime = value.ToolIsu_Date,
                row.ToolRqt_datetime = value.ToolReq_Date,
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
            // if (value.PartNumber == row.ToolRts_Partno) {
                row.ToolRts_Partname = value.PartName,
                row.ToolRts_AvailableQty = parseFloat(value.TotalProductCount)
            };
            if (value.PartNumber == row.ToolRts_Partno) {
                row.ToolRts_PartSpecification = value.PartSpecification
                //return false;
            };
        });

        
    }

    //$scope.filterPartMasterList = function (ToolUploadList) {
    //    return (ToolUploadList.IsActive === 'Y' && ToolUploadList.Tool_Status === 'I');
    //}
    $scope.filterToolingReturnList = function (ToolingReturnList) {
        return (ToolingReturnList.IsActive === 'Y' && ToolingReturnList.Tool_Status === 'RT' && ToolingReturnList.Return_Status == 'RE');
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
        window.location.href = "ToolingRegrinding";
    };


    $scope.editClick = function (row, key, IsActive) {
        debugger;
        $scope.IsEditDivVisible = true;
        $scope.IsListDivVisible = false;
        if (key == 'E') {
            $scope.BindPartName(row);
            
            $scope.obj = new ToolingregrindServices.ToolingreturnData(row);
            $scope.obj.KEY = key;
            $scope.obj.ToolReg_Unicode = row.ToolRts_Unicode;
            $scope.obj.LineMachine_Line_Code = row.ToolRts_Linename;
            $scope.obj.ToolReg_LifeAchived = row.ToolRts_LifeAchived;
            $scope.obj.ToolReg_Model = row.ToolRts_Model;
            $scope.getLineDetails($scope.obj);

            if (row.IsActive == 'N') {
                $scope.obj.IsActive = false;
            }
            else {
                $scope.obj.IsActive = true;
            }
            // $scope.BindCity(row, "E");
        }
        else {
            $scope.obj = new ToolingregrindServices.ToolingreturnData(null);
            if ($scope.ToolingReturnList.length > 0) {
                $scope.obj.ToolRts_Return_no = $scope.ToolingReturnList[0].ToolRts_no;

            }
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
                        $scope.obj.ToolReg_shift = shift.ShiftName;
                    }

                }
                else if (parseFloat(shift.Shift_StartTime.replace(':', '.')) > 12 && parseFloat(shift.Shift_endTime.replace(':', '.')) < 12 && shift.IsUse == "1") {
                    if (parseFloat(shift.Shift_StartTime.replace(':', '.')) >= parseFloat(currHours.replace(':', '.')) && parseFloat(currHours.replace(':', '.')) <= parseFloat(shift.Shift_endTime.replace(':', '.'))) {
                        $scope.obj.ToolReg_shift = shift.ShiftName;
                    }
                    else if (parseFloat(shift.Shift_StartTime.replace(':', '.')) <= parseFloat(currHours.replace(':', '.')) && parseFloat(currHours.replace(':', '.')) >= parseFloat(shift.Shift_endTime.replace(':', '.'))) {
                        $scope.obj.ToolReg_shift = shift.ShiftName;
                    }
                }
                else if (parseFloat(shift.Shift_StartTime.replace(':', '.')) < 12 && parseFloat(shift.Shift_endTime.replace(':', '.')) > 12 && shift.IsUse == "1") {
                    if (parseFloat(currHours.replace(':', '.')) >= parseFloat(shift.Shift_StartTime.replace(':', '.')) && parseFloat(currHours.replace(':', '.')) <= parseFloat(shift.Shift_endTime.replace(':', '.'))) {
                        $scope.obj.ToolReg_shift = shift.ShiftName;
                    }

                }

            })


            $scope.obj.ToolRts_plant = $scope.ToolRts_plant
            $scope.obj.ToolReg_datetime = datetime;
        //}
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
            if (value.VendorCode == row.ToolReg_VendorCode) { row.ToolReg_VendorName = value.VendorName };
        });
    }
    $scope.submitForm = function (isValid, Toolingreturn) {
        // check to make sure the form is completely valid
        debugger;
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
        var request = new ToolingregrindServices.SaveToolingReturn(Toolingreturn);
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;

            if (response.liToolingReturn != null) {
                if (response.liToolingReturn[0].MSG == "Updated Success") {
                    $("#Message").val('Updated !! ');//Messgae
                    $('#Title').html('Tool Regrinding Update Successfully');//Title
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
                    $('#Title').html('Tool Regrinding Saved Successfully');//Title
                    window.location.href = "ToolingRegrinding";
                    $scope.ToolReturnForm.$setPristine();
                    $("#Message").trigger("click");
                    window.location.href = "ToolingRegrinding";
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
        $scope.obj = new ToolingregrindServices.ToolingreturnData(row);
        myFunctionCompany();
    }

});
