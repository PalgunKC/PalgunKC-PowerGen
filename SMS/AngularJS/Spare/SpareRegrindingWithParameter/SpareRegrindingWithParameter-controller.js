spareingregrindApp.controller('spareingregrindCtrl', function (Excel, $timeout, $scope, $filter, spareingregrindServices, commonService, DTOptionsBuilder, DTColumnBuilder) {
    $scope.PartMasterList = [];
    $scope.SpareVendorList = [];
    $scope.SpareingReturnList = [];
    $scope.SpareLocationList = [];
    $scope.SpareUploadList = [];
    $scope.Min = 1;
    $scope.LineList = [];
    $scope.MachineList = [];
    $scope.ReasonList = [];
    $scope.SpareReturnReason = [];
    $scope.SpareIssueList = [];

    $scope.machinecodeError = false;
    $scope.spareReturn_Flag = 0;
    $scope.DateTime_Flag = false;
    $scope.currentdate = new Date();
    $scope.obj = new spareingregrindServices.spareingreturnData(null);

    $scope.init = function () {
        debugger;
        //console.log(window.location.search);
        commonService.postWebService('Spare/BindListRegrindingWithParameter', { 'SRNo': window.location.search.substring(6), 'P_KEY': 'L', 'dummy_col1': 'Return' }).then(function (response) {
            $scope.SpareingReturnList = response.ddSpareingReturn;
            $scope.spareReturn_Flag = 1;

        });
        commonService.postWebService('Spare/BindListRegrindingWithParameter', { 'P_KEY': 'L', 'dummy_col1': 'Part' }).then(function (response) {
            $scope.PartMasterList = response.ddlPartmaster;
        });
        commonService.postWebService('Spare/BindListRegrindingWithParameter', { 'P_KEY': 'L', 'dummy_col1': 'Location' }).then(function (response) {
            $scope.SpareLocationList = response.ddlSpareLocation;
        });
        
        commonService.postWebService('Spare/BindListRegrindingWithParameter', { 'P_KEY': 'L', 'dummy_col1': 'Vendor' }).then(function (response) {

            $scope.SpareVendorList = response.ddlVendormaster;
        });
        commonService.postWebService('Spare/BindListRegrindingWithParameter', { 'P_KEY': 'L', 'dummy_col1': 'Shift' }).then(function (response) {

            $scope.ShiftMasterList = response.ddlShiftmaster;
            $scope.SpareRts_plant = response.ddlOrgId;

            $scope.disablecode = false;
            $scope.obj.IsActive = true;
           // $scope.obj.KEY = key;

            //var currentdate = new Date();
            //alert($scope.currentdate);
            var currDate = ($scope.currentdate.getFullYear() < 10 ? '0' : '') + $scope.currentdate.getFullYear() + "/"
            + ($scope.currentdate.getMonth() < 10 ? '0' : '') + ($scope.currentdate.getMonth() + 1) + "/"
            + ($scope.currentdate.getDate() < 10 ? '0' : '') + $scope.currentdate.getDate() + " "
            + ($scope.currentdate.getHours() < 10 ? '0' : '') + $scope.currentdate.getHours() + ":"
            + ($scope.currentdate.getMinutes() < 10 ? '0' : '') + $scope.currentdate.getMinutes() + ":"
            + ($scope.currentdate.getSeconds() < 10 ? '0' : '') + $scope.currentdate.getSeconds();

            var datetime = ($scope.currentdate.getFullYear() < 10 ? '0' : '') + $scope.currentdate.getFullYear() + "-"
            + ($scope.currentdate.getMonth() < 10 ? '0' : '') + ($scope.currentdate.getMonth() + 1) + "-"
            + ($scope.currentdate.getDate() < 10 ? '0' : '') + $scope.currentdate.getDate() + " "
            + ($scope.currentdate.getHours() < 10 ? '0' : '') + $scope.currentdate.getHours() + ":"
            + ($scope.currentdate.getMinutes() < 10 ? '0' : '') + $scope.currentdate.getMinutes() + ":"
            + ($scope.currentdate.getSeconds() < 10 ? '0' : '') + $scope.currentdate.getSeconds();

            var currHours = ($scope.currentdate.getHours() < 10 ? '0' : '') + $scope.currentdate.getHours() + ":"
            + ($scope.currentdate.getMinutes() < 10 ? '0' : '') + $scope.currentdate.getMinutes();
            //var intervalId = window.setInterval(
            $scope.ShiftMasterList.map(function (shift) {
                debugger;
                // currHours = '05:31';

                console.log(shift)
                if (parseFloat(shift.Shift_StartTime.replace(':', '.')) > 12 && parseFloat(shift.Shift_endTime.replace(':', '.')) > 12 && shift.IsUse == "1") {
                    if (parseFloat(currHours.replace(':', '.')) >= parseFloat(shift.Shift_StartTime.replace(':', '.')) && parseFloat(currHours.replace(':', '.')) <= parseFloat(shift.Shift_endTime.replace(':', '.'))) {
                        $scope.obj.SpareReg_shift = shift.ShiftName;
                    }

                }
                else if (parseFloat(shift.Shift_StartTime.replace(':', '.')) > 12 && parseFloat(shift.Shift_endTime.replace(':', '.')) < 12 && shift.IsUse == "1") {
                    if (parseFloat(shift.Shift_StartTime.replace(':', '.')) >= parseFloat(currHours.replace(':', '.')) && parseFloat(currHours.replace(':', '.')) <= parseFloat(shift.Shift_endTime.replace(':', '.'))) {
                        $scope.obj.SpareReg_shift = shift.ShiftName;
                    }
                    else if (parseFloat(shift.Shift_StartTime.replace(':', '.')) <= parseFloat(currHours.replace(':', '.')) && parseFloat(currHours.replace(':', '.')) >= parseFloat(shift.Shift_endTime.replace(':', '.'))) {
                        $scope.obj.SpareReg_shift = shift.ShiftName;
                    }
                }
                else if (parseFloat(shift.Shift_StartTime.replace(':', '.')) < 12 && parseFloat(shift.Shift_endTime.replace(':', '.')) > 12 && shift.IsUse == "1") {
                    if (parseFloat(currHours.replace(':', '.')) >= parseFloat(shift.Shift_StartTime.replace(':', '.')) && parseFloat(currHours.replace(':', '.')) <= parseFloat(shift.Shift_endTime.replace(':', '.'))) {
                        $scope.obj.SpareReg_shift = shift.ShiftName;
                    }

                }

            })
            //}),2000)

            $scope.obj.SpareRts_plant = $scope.SpareRts_plant
            $scope.obj.SpareReg_datetime = datetime;
        });
        commonService.postWebService('Spare/BindListRegrindingWithParameter', { 'P_KEY': 'L', 'dummy_col1': 'Line' }).then(function (response) {

            $scope.LineList = response.ddlLine;
        });
        commonService.postWebService('Spare/BindListRegrindingWithParameter', { 'P_KEY': 'L', 'dummy_col1': 'Issue' }).then(function (response) {

            $scope.SpareIssueList = response.ddlSpareingIssue;
        });

        var intervalId = window.setInterval(

        commonService.postWebService('Spare/BindListRegrindingWithParameter', { 'P_KEY': 'L', 'dummy_col1': 'Upload' }).then(function (response) {
            $scope.spareReturn_Flag==2
            $scope.SpareUploadList = response.ddlSpareUpload;
            angular.forEach($scope.SpareingReturnList, function (value, key) {
                value.SpareRts_Qty = parseFloat(value.SpareRts_Qty);
            });


            angular.forEach($scope.PartMasterList, function (value, key) {
                angular.forEach($scope.SpareingReturnList, function (value2, key) {
                    if (value2.PartId == value.PartId) {
                        value2.SpareRts_Partno = value.PartNumber;
                        value2.SpareRts_Partname = value.PartName;
                        value2.SpareRts_PartSpecification = value.PartSpecification;
                    }
                });
            });

            angular.forEach($scope.SpareUploadList, function (value, key) {
                value.Quantity = parseFloat(value.Quantity);

            });

            $scope.obj.SpareReg_Regrain_no = $scope.SpareingReturnList[0].SpareReg_Regrain_no;
            $scope.editClick($scope.SpareingReturnList[0], 'E', '');
            //$window.location.reload();
        }),2000)
        if ($scope.spareReturn_Flag==2) {
            clearInterval(intervalId);
        }
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
        var request = new spareingregrindServices.getLineDetails(row);
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
                    $scope.obj.Machinecode = { id: row.SpareReq_MachineCode };
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
            $scope.obj.Machinecode = { id: row.SpareRts_MachineName };
            //$scope.obj.SpareRts_Reason = { id: row.SpareRts_Reason };
            //$scope.obj.Machinecode = names1;
        });
    }

    $scope.BindPartName = function (row) {
        debugger;
        // $scope.obj.Quantity = ''
        //angular.forEach($scope.SpareUploadList, function (value, key) {
        //    if (value.PartNumber == row.SpareReq_Partno) {
        //        row.SpareReq_Partname = value.PartName

        //    };
        //    //if (value.PartNumber == row.SpareReq_Partno) {
        //    //    row.SpareReq_uniquecode = value.SpareUniqueCode
        //    //    return false;
        //    //};
        //    //if (value.PartNumber == row.PartNumber) { row.UOM = value.UOM };
        //    //if (value.PartNumber == row.PartNumber) { $scope.Min = value.Min_qty };
        //    //if (value.PartNumber == row.PartNumber) { $scope.Max = value.Max_qty };


        //});
        //var selectedReason = $scope.SpareReturnReason.filter(function (obj) {
        //    return obj.ReasonCode === row.SpareReq_Reason
        //});
        //row.SpareReq_Reason = selectedReason;
        angular.forEach($scope.SpareIssueList, function (value, key) {
            //if (value.SpareIsu_Partno == row.SpareRts_Partno) {
            if (value.SpareIsu_id == row.SpareIsu_id) {
            
                row.SpareIsu_datetime = value.SpareIsu_Date,
                row.SpareRqt_datetime = value.SpareReq_Date,
                row.SpareRts_Partno = value.SpareIsu_Partno
               // row.SpareIsu_id = value.SpareIsu_id
            };

        });

        angular.forEach($scope.PartMasterList, function (value, key) {
            if (value.PartNumber == row.SpareRts_Partno) {
                row.PartId = value.PartId;
            }
        });
        angular.forEach($scope.PartMasterList, function (value, key) {
            if (value.PartId == row.PartId) {
            // if (value.PartNumber == row.SpareRts_Partno) {
                row.SpareRts_Partname = value.PartName,
                row.SpareRts_AvailableQty = parseFloat(value.TotalProductCount)
            };
            if (value.PartNumber == row.SpareRts_Partno) {
                row.SpareRts_PartSpecification = value.PartSpecification
                //return false;
            };
        });

        
    }

    //$scope.filterPartMasterList = function (SpareUploadList) {
    //    return (SpareUploadList.IsActive === 'Y' && SpareUploadList.Spare_Status === 'I');
    //}
    $scope.filterSpareingReturnList = function (SpareingReturnList) {
        return (SpareingReturnList.IsActive === 'Y' && SpareingReturnList.Spare_Status === 'RT' && SpareingReturnList.Return_Status == 'RE');
    }
    $scope.filterSpareLocationList = function (SpareLocationList) {
        return (SpareLocationList.IsActive === 'Y');
    }
    $scope.filterSpareVendorList = function (SpareVendorList) {
        return (SpareVendorList.IsActive === 'Y');
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
            a.download = "SpareInward.xls";
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
                pdfMake.createPdf(docDefinition).download("SpareInward.pdf");
            }
        });
    };

    $scope.CancelSpareingReturn = function () {
        $scope.IsListDivVisible = true;
        $scope.IsEditDivVisible = false;
        $scope.selectionLimit = 1;
        $scope.obj = null;
        $scope.SpareReturnForm.$setPristine();
        window.location.href = "SpareingRegrinding";

    };


    $scope.editClick = function (row, key, IsActive) {
        debugger;
        $scope.IsEditDivVisible = true;
        $scope.IsListDivVisible = false;
        if (key == 'E') {
            $scope.BindPartName(row);
            
            $scope.obj = new spareingregrindServices.spareingreturnData(row);
            $scope.obj.KEY = key;
            $scope.obj.SpareReg_Unicode = row.SpareRts_Unicode;
            $scope.obj.LineMachine_Line_Code = row.SpareRts_Linename;
            $scope.obj.SpareReg_LifeAchived = row.SpareRts_LifeAchived;
            $scope.obj.SpareReg_Model = row.SpareRts_Model;
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
            $scope.obj = new spareingregrindServices.spareingreturnData(null);
            if ($scope.SpareingReturnList.length > 0) {
                $scope.obj.SpareRts_Return_no = $scope.SpareingReturnList[0].SpareRts_no;

            }
        }

           
   
        //}
    };
    //$scope.BindPartName = function (row) {
    //    debugger;
    //    $scope.obj.Quantity = ''
    //    angular.forEach($scope.PartMasterList, function (value, key) {
    //        if (value.PartNumber == row.PartNumber) { row.PartName = value.PartName };
    //        //if (value.PartNumber == row.PartNumber) { row.Sparetype = value.IsReusable };
    //        //if (value.PartNumber == row.PartNumber) { row.UOM = value.UOM };
    //        //if (value.PartNumber == row.PartNumber) { $scope.Min = value.Min_qty };
    //        //if (value.PartNumber == row.PartNumber) { $scope.Max = value.Max_qty };

    //    });
    //}
    $scope.BindVendorName = function (row) {
        debugger;
        angular.forEach($scope.SpareVendorList, function (value, key) {
            if (value.VendorCode == row.SpareReg_VendorCode) { row.SpareReg_VendorName = value.VendorName };
        });
    }
    $scope.submitForm = function (isValid, spareingreturn) {
        // check to make sure the form is completely valid
        debugger;
        if (isValid) {
            if (spareingreturn.Machinecode.id == null) {
                $scope.machinecodeError = true;
                return false;
            }
            else if (spareingreturn.Machinecode.id == "") {
                $scope.machinecodeError = true;
                return false;
            }
            $scope.machinecodeError = false;
            spareingreturn.SpareRts_Reason = spareingreturn.SpareRts_Reason;
            $scope.SaveSpareingReturn(spareingreturn);
            $scope.SpareReturnForm.$setPristine();
        }
        else {
            angular.forEach($scope.SpareReturnForm.$error.required, function (field) {
                field.$setDirty();
            });
        }
    };

    $scope.setReturnReason = function (reason) {
        console.log(reason)

    }

    $scope.SaveSpareingReturn = function (spareingreturn) {
        if (spareingreturn.IsActive == true) {
            spareingreturn.IsActive = "1";

        }
        else {
            spareingreturn.IsActive = "0";
        }
        spareingreturn.SpareRts_MachineName = spareingreturn.Machinecode["id"];
        //spareingreturn.SpareRts_Reason = spareingreturn.SpareRts_Reason["id"];
        spareingreturn.SpareRts_Linename = spareingreturn.LineMachine_Line_Code;
        var request = new spareingregrindServices.SaveSpareingReturn(spareingreturn);
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;

            if (response.liSpareingReturn != null) {
                if (response.liSpareingReturn[0].MSG == "Updated Success") {
                    $("#Message").val('Updated !! ');//Messgae
                    $('#Title').html('Spare Regrinding Update Successfully');//Title
                    $scope.init();
                    $scope.obj = null;
                    $scope.SpareReturnForm.$setPristine();
                    $("#Message").trigger("click");
                }
                else if (response.liSpareingReturn[0].MSG == "Spare Already Uploaded") {

                    $("#Message").val('Alter !! ');//Messgae
                    $('#Title').html('Part Number - "' + response.liSpareingReturn[0].PartNumber + '" Already Exists');//Title
                    $("#Message").trigger("click");
                    $scope.obj.IsActive = true;
                }
                else {
                    $("#Message").val('Saved !! ');//Messgae
                    $('#Title').html('Spare Regrinding Saved Successfully');//Title
                    //$scope.init();
                    //$scope.obj = null;
                    window.location.href = "SpareingRegrinding";
                    $scope.SpareReturnForm.$setPristine();
                    $("#Message").trigger("click");
                    window.location.href = "SpareingRegrinding";
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
        $scope.obj = new spareingregrindServices.spareingreturnData(row);
        myFunctionCompany();
    }

});
