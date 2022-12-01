ToolingrequestApp.controller('ToolingrequestCtrl', function (Excel, $timeout, $scope, $filter, ToolingrequestServices, commonService) {
    $scope.PartMasterList = [];
    $scope.ToolVendorList = [];
    $scope.ToolingRequestList = [];
    $scope.ToolLocationList = [];
    $scope.ToolUploadList = [];
    $scope.Min = 1;
    $scope.LineList = [];
    $scope.MachineList = [];
    $scope.ReasonList = [];
    $scope.ToolRequestReason = [];
    $scope.MachineListMaster = [];
    $scope.filterToolUploadList = [];
    $scope.ToolingRegrainList = []
    $scope.RegrainCode = '';
    keyname = 'PartId';
    keys = [];
    $scope.machinecodeError = false;
    $scope.EmployeeMasterList = [];
    $scope.PartGroupMasterList = [];
    $scope.filterToolLocationList = [];
    $scope.PartGroupList = [];

    $scope.RequestReason = false;
    $scope.Request = false;
    $scope.ShiftMaster = false;
    $scope.LineMaster = false;
    $scope.MachineMaster = false;
    $scope.Upload = false;
    $scope.Part_Flag = false;
    $scope.ProductGroup_Flag = false;

    $scope.obj = new ToolingrequestServices.ToolingrequestData(null);

    $scope.GetExcelData = function () {
        commonService.postWebService('Tool/GetExcelToolPartRequestData', { 'P_KEY': 'EXCEL', 'dummycolumn1': 'Part' }).then(function (response) {
            $scope.DownloadTab(response);
        });
    }
    $scope.DownloadTab = function (response) {
        window.location = '/Tool/Download?ID=' + response.ID + '&Name=' + response.FileName;
    };
    $scope.BindFilterData = function () {

        commonService.postWebService('Tool/BindListToolingRequest', { 'P_KEY': 'L', 'dummy_col1': 'Request', 'P_PAGE_INDEX': $scope.currentPage, 'P_PAGE_SIZE': '10' }).then(function (response) {
            $scope.ToolingRequestList = response.ddToolingRequest;
            $scope.ToolReq_plant = response.ddlOrgId;
            $scope.TotalCount = parseInt($scope.ToolingRequestList[0].TotalCount)
            angular.forEach($scope.ToolingRequestList, function (value, key) {
                value.ToolReq_Qty = parseFloat(value.ToolReq_Qty);
                value.ToolReq_AvailableQty = parseFloat(value.ToolReq_AvailableQty);
                value.ToolReq_id = parseFloat(value.ToolReq_id);
            });
        });

    };
    $scope.numPages = function () {
        return Math.ceil($scope.TotalCount / $scope.numPerPage);
    };
    $scope.init = function () {
        debugger;
        $scope.IsListDivVisible = true;
        $scope.IsEditDivVisible = false;
        $scope.currentPage = 1;
        $scope.numPerPage = 10;
        $scope.maxSize = 5;
        $scope.TotalCount = 0;

        commonService.postWebService('Tool/BindListToolingRequest', { 'P_KEY': 'L', 'dummy_col1': 'RequestReason' }).then(function (response) {
            $scope.ToolRequestReason = response.ddlRequestReason;
            $scope.RequestReason = true;
        });


        commonService.postWebService('Tool/BindListToolingRequest', { 'P_KEY': 'L', 'dummy_col1': 'ProductGroup' }).then(function (response) {
            $scope.PartGroupList = response.ddlToolPartGroup;
            $scope.ProductGroup_Flag = true;

        });

        commonService.postWebService('Tool/BindListToolingRequest', { 'P_KEY': 'L', 'dummy_col1': 'Request', 'P_PAGE_INDEX': '1', 'P_PAGE_SIZE': '10' }).then(function (response) {
            $scope.ToolingRequestList = response.ddToolingRequest;
            $scope.ToolReq_plant = response.ddlOrgId;
            $scope.obj.ToolReq_no = $scope.ToolingRequestList[0].Max_ToolReq_no;
            $scope.TotalCount = parseInt($scope.ToolingRequestList[0].TotalCount)
           // if ($scope.ToolReq_plant == 1) {
           //     $scope.PartGroupList = [
           //"MCMM",
           //"CCMM",
           //"CHMM",
           //"ASSEMBLY",
           //"COMMON"
           //     ];
           // }
           // else if ($scope.ToolReq_plant == 2) {
           //     $scope.PartGroupList = [
           // "CEPS"

           //     ];
           // }
           // else if ($scope.ToolReq_plant == 3) {
           //     $scope.PartGroupList = [
           //    "EBSA",
           //    "EBSM",
           //    "EBSU",
           //    "EBSC"

           //     ];
           // }
            angular.forEach($scope.ToolingRequestList, function (value, key) {
                value.ToolReq_Qty = parseFloat(value.ToolReq_Qty);
                value.ToolReq_AvailableQty = parseFloat(value.ToolReq_AvailableQty);
                value.ToolReq_id = parseFloat(value.ToolReq_id);
            });
            $scope.Request = true;

        });
        commonService.postWebService('Tool/BindListToolingRequest', { 'P_KEY': 'L', 'dummy_col1': 'ShiftMaster' }).then(function (response) {
            $scope.ShiftMasterList = response.ddlShiftmaster;
            $scope.ShiftMaster = true;
        });
        commonService.postWebService('Tool/BindListToolingRequest', { 'P_KEY': 'L', 'dummy_col1': 'LineMaster' }).then(function (response) {
            $scope.LineList = response.ddlLine;
            $scope.LineMaster = true;
        });
        commonService.postWebService('Tool/BindListToolingRequest', { 'P_KEY': 'L', 'dummy_col1': 'MachineMaster' }).then(function (response) {
            $scope.MachineListMaster = response.ddlMachine;
            $scope.MachineMaster = true;

        });
        commonService.postWebService('Tool/BindListToolingRequest', { 'P_KEY': 'G', 'dummy_col1': 'Part' }).then(function (response) {
            $scope.PartMasterList = response.ddlPartmaster;
            // $scope.BindPartName(row); //(CHANGE ADD 07 / 04 / 2021)
            $scope.Part_Flag = true;

        });
        commonService.postWebService('Tool/BindListToolingRequest', { 'P_KEY': 'L', 'dummy_col1': 'Upload' }).then(function (response) {
            $scope.ToolUploadList = response.ddlToolUpload;
            angular.forEach($scope.ToolUploadList, function (item) {

                var key = item[keyname];

                if (keys.indexOf(key) === -1) {

                    keys.push(key);

                    $scope.filterToolUploadList.push(item)
                }
            });
            $scope.Upload = true;
        });
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
        var request = new ToolingrequestServices.getLineDetails(row);
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
                // response.ddlLineMachine[0].Machinecode = { id: '' };
                $scope.MachineList = [];
                $scope.obj.Machinecode = { id: '' };
            }
            //$scope.obj.Machinecode = { id: row.ToolReq_MachineCode };
            //   $scope.obj.ToolReq_Reason = { id: row.ToolReq_Reason };
            //$scope.obj.Machinecode = names1;
        });
    }

    $scope.BindPartName = function (row) {
        debugger;
        row.ToolReq_AvailableQty = 0;
        $scope.filterToolLocationList = [];

        keys = [];
     
        angular.forEach($scope.PartMasterList, function (value, key) {
            if (value.PartNumber == row.ToolReq_Partno) {
                row.PartId = value.PartId;
            }
        });
        angular.forEach($scope.PartMasterList, function (value, key) {
            if (value.PartId == row.PartId) {
                //row.ToolReq_Partno = value.PartNumber;
                row.ToolReq_Partname = value.PartName;
                if (parseFloat(value.TotalProductCount) > 0) {
                    row.ToolReq_AvailableQty = parseFloat(row.ToolReq_AvailableQty) + parseFloat(value.TotalProductCount)
                    //row.ToolReq_AvailableQty = parseFloat(value.TotalProductCount);
                }
                //else
                //{
                //    row.ToolReq_AvailableQty = 0;
                //}
                row.Tooltype = value.IsReusable;
                // row.PartId = value.PartId;
            };
            if (value.PartNumber == row.ToolReq_Partno) {
                row.ToolReq_PartSpecification = value.PartSpecification
                //return false;
            };
        });

        angular.forEach($scope.ToolUploadList, function (value, key) {
            if (value.PartId == row.PartId && parseFloat(value.Quantity) > 0) {
                var key = value.Tool_Location;

                if (keys.indexOf(key) === -1) {

                    keys.push(key);

                    //$scope.filterSpareUploadList.push(item)
                    $scope.filterToolLocationList.push({ id: value.Tool_Location, label: value.Tool_Location })
                }
            }

        });

    }

    $scope.filterPartGroupList = function (PartGroupList) {
        return (PartGroupList.IsActive === 'Y');
    }


    $scope.filterPartMasterList = function (filterToolUploadList) {
        return (filterToolUploadList.IsActive === 'Y');
    }
    $scope.filterToolRequestReason = function (ToolRequestReason) {
        return (ToolRequestReason.IsActive === 'Y');
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

    $scope.CancelToolingRequest = function () {
        $scope.IsListDivVisible = true;
        $scope.IsEditDivVisible = false;
        $scope.selectionLimit = 1;
        $scope.obj = null;
        $scope.ToolRequestForm.$setPristine();
    };


    var intervalId = window.setInterval(
    $scope.AddTab_Visblity = function () {
        if ($scope.RequestReason === false || $scope.Request === false || $scope.ShiftMaster === false || $scope.LineMaster === false || $scope.MachineMaster === false || $scope.Upload === false || $scope.Part_Flag === false || $scope.ProductGroup_Flag === false) {
            //return false;
            $scope.isAddTab_Visblity = false
        } else {
            $scope.isAddTab_Visblity = true
            $timeout(function () {
                angular.element('#fakeButton').triggerHandler('click');
            });
            clearInterval(intervalId);
        }
    }
    , 500)


    $scope.editClick = function (row, key, IsActive) {
        if (!$scope.isAddTab_Visblity) {
            return false;
        }
        debugger;
        // if ($scope.ToolReq_plant == 1) {
        //     $scope.PartGroupList = [
        //"MCMM",
        //"CCMM",
        //"CHMM",
        //"ASSEMBLY",
        //"COMMON"
        //     ];
        // }
        // else if ($scope.ToolReq_plant == 2) {
        //     $scope.PartGroupList = [
        // "CEPS"

        //     ];
        // }
        $scope.PartGroupMasterList = [];
        $scope.IsEditDivVisible = true;
        $scope.IsListDivVisible = false;
        $scope.filterToolLocationList = [];
        keys = [];
       // if ($scope.PartMasterList.length == 0) {
            //commonService.postWebService('Tool/BindListToolingRequest', { 'P_KEY': 'G', 'dummy_col1': 'Part' }).then(function (response) {
            //    $scope.PartMasterList = response.ddlPartmaster;
            //    $scope.BindPartName(row); //(CHANGE ADD 07 / 04 / 2021)

            //});
       // }
        if (key == 'E') {
            $scope.disableCtrl = false;
            $scope.BindPartGroupList(row);
            $scope.BindPartName(row);
            $scope.obj = new ToolingrequestServices.ToolingrequestData(row);
            $scope.obj.ToolReq_Qty = parseFloat($scope.obj.ToolReq_Qty);
            $scope.obj.KEY = key;

            $scope.obj.LineMachine_Line_Code = row.ToolReq_Linename;
            $scope.getLineDetails($scope.obj);

            if (row.IsActive == 'N') {
                $scope.obj.IsActive = false;
            }
            else {
                $scope.obj.IsActive = true;
            }
            // $scope.BindCity(row, "E");
            angular.forEach($scope.ToolUploadList, function (value, key) {
                if (value.PartId == row.PartId && parseFloat(value.Quantity) > 0) {
                    var key = value.Tool_Location;

                    if (keys.indexOf(key) === -1) {

                        keys.push(key);

                        //$scope.filterSpareUploadList.push(item)
                        $scope.filterToolLocationList.push({ id: value.Tool_Location, label: value.Tool_Location })
                    }
                }

            });
        }
        else if (key == 'V') {
            $scope.BindPartGroupList(row);
            // $scope.BindPartName(row);
            $scope.obj = new ToolingrequestServices.ToolingrequestData(row);
            $scope.obj.ToolReq_Qty = parseFloat($scope.obj.ToolReq_Qty);
            $scope.obj.KEY = key;

            $scope.obj.LineMachine_Line_Code = row.ToolReq_Linename;
            $scope.getLineDetails($scope.obj);

            if (row.IsActive == 'N') {
                $scope.obj.IsActive = false;
            }
            else {
                $scope.obj.IsActive = true;
            }
            $scope.disableCtrl = true;

        }
        else {
            $scope.disableCtrl = false;
            $scope.obj = new ToolingrequestServices.ToolingrequestData(null);
            if ($scope.ToolingRequestList.length > 0) {
                $scope.obj.ToolReq_no = $scope.ToolingRequestList[0].Max_ToolReq_no;
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
                        $scope.obj.ToolReq_shift = shift.ShiftName;
                    }

                }
                else if (parseFloat(shift.Shift_StartTime.replace(':', '.')) > 12 && parseFloat(shift.Shift_endTime.replace(':', '.')) < 12 && shift.IsUse == "1") {
                    if (parseFloat(shift.Shift_StartTime.replace(':', '.')) >= parseFloat(currHours.replace(':', '.')) && parseFloat(currHours.replace(':', '.')) <= parseFloat(shift.Shift_endTime.replace(':', '.'))) {
                        $scope.obj.ToolReq_shift = shift.ShiftName;
                    }
                    else if (parseFloat(shift.Shift_StartTime.replace(':', '.')) <= parseFloat(currHours.replace(':', '.')) && parseFloat(currHours.replace(':', '.')) >= parseFloat(shift.Shift_endTime.replace(':', '.'))) {
                        $scope.obj.ToolReq_shift = shift.ShiftName;
                    }
                }
                else if (parseFloat(shift.Shift_StartTime.replace(':', '.')) < 12 && parseFloat(shift.Shift_endTime.replace(':', '.')) > 12 && shift.IsUse == "1") {
                    if (parseFloat(currHours.replace(':', '.')) >= parseFloat(shift.Shift_StartTime.replace(':', '.')) && parseFloat(currHours.replace(':', '.')) <= parseFloat(shift.Shift_endTime.replace(':', '.'))) {
                        $scope.obj.ToolReq_shift = shift.ShiftName;
                    }

                }

            })
            $scope.obj.ToolReq_plant = $scope.ToolReq_plant
            $scope.obj.ToolReq_datetime = datetime;
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
        $scope.PartGroupMasterList = $scope.filterToolUploadList.filter(function (o) { return o.ProductGroup === row.ProductGroup });

    }
    $scope.BindVendorName = function (row) {
        debugger;
        angular.forEach($scope.ToolVendorList, function (value, key) {
            if (value.VendorCode == row.VendorCode) { row.VendorName = value.VendorName };
        });
    }
    $scope.submitForm = function (isValid, Toolingrequest) {
        // check to make sure the form is completely valid
        debugger;
        if (isValid) {



            //if (Toolingrequest.Machinecode.id != null) {
            //    $scope.machinecodeError = false;
            //    if (Toolingrequest.Machinecode.id == "") {
            //        $scope.machinecodeError = true;
            //        return false;
            //    }
            //}
            //$scope.machinecodeError = false;
            Toolingrequest.ToolReq_Reason = Toolingrequest.ToolReq_Reason;
            Toolingrequest.RegrainCode = $scope.RegrainCode;
            //            Toolingrequest.ToolReq_Reason = Toolingrequest.ToolReq_Reason;

            $scope.SaveToolingRequest(Toolingrequest);
            $scope.PartGroupMasterList = [];

            $scope.ToolRequestForm.$setPristine();
        }
        else {
            angular.forEach($scope.ToolRequestForm.$error.required, function (field) {
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

    $scope.setRequestReason = function (reason) {
        console.log(reason)

    }

    $scope.validation = function (Toolingrequest) {
        if (Toolingrequest.Machinecode.id != null) {
            $scope.machinecodeError = true;

            if (Toolingrequest.Machinecode.id.length != 0) {
                $scope.machinecodeError = false;
                return true;
            }
            else {
                $scope.machinecodeError = true;
                return false;
            }
            return false;
        }
        else {
            $scope.machinecodeError = true;
            return false;
        }
    }

    $scope.SaveToolingRequest = function (Toolingrequest) {

        var is_valid = $scope.validation(Toolingrequest);
        if (is_valid) {
            if (Toolingrequest.IsActive == true) {
                Toolingrequest.IsActive = "1";

            }
            else {
                Toolingrequest.IsActive = "0";
            }
            Toolingrequest.ToolReq_MachineCode = Toolingrequest.Machinecode["id"];
            //  Toolingrequest.ToolReq_Reason = Toolingrequest.ToolReq_Reason["id"];
            Toolingrequest.ToolReq_Linename = Toolingrequest.LineMachine_Line_Code;
            var request = new ToolingrequestServices.SaveToolingRequest(Toolingrequest);
            commonService.postWebService(request.url, request.param).then(function (response) {
                debugger;

                if (response.liToolingRequest != null) {
                    if (response.liToolingRequest[0].MSG == "Updated Success") {
                        $("#Message").val('Updated !! ');//Messgae
                        $('#Title').html('Tool Request Update Successfully');//Title
                        $scope.filterToolUploadList = [];
                        $scope.init();
                        $scope.obj = null;
                        $scope.ToolRequestForm.$setPristine();
                        $("#Message").trigger("click");
                        //alert("Tool Request Update Successfully")

                        //      $scope.CancelToolingRequest();
                    }
                    else if (response.liToolingRequest[0].MSG == "Tool Already Uploaded") {

                        $("#Message").val('Alter !! ');//Messgae
                        $('#Title').html('Part Number - "' + response.liToolingRequest[0].PartNumber + '" Already Exists');//Title
                        $("#Message").trigger("click");
                        $scope.obj.IsActive = true;
                    }
                    else {
                        $("#Message").val('Saved !! ');//Messgae
                        $('#Title').html('Tool Request Saved Successfully');//Title
                        $scope.filterToolUploadList = [];
                        $scope.init();
                        $scope.obj = null;
                        $scope.ToolRequestForm.$setPristine();
                        $("#Message").trigger("click");
                        //  alert("Tool Requested Successfully")

                        // $scope.CancelToolingRequest();
                    }

                }
                else {
                    $("#Message").val('Failed !! ');//Messgae
                    $('#Title').html('Error Happened while Saving Category');//Title
                    $("#Message").trigger("click");
                }
            });
        }
    };

    $scope.returnAcive = function (act) {
        return act == 1 ? 'Y' : 'N';
    };

    $scope.init();

    $scope.myFunctionCompany = function (row, key) {
        $scope.obj = new ToolingrequestServices.ToolingrequestData(row);
        myFunctionCompany();
    }

});
