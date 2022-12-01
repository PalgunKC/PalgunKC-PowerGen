SpareingrequestApp.controller('SpareingrequestCtrl', function (Excel, $timeout, $scope, $filter, SpareingrequestServices, commonService) {//, DTOptionsBuilder, DTColumnBuilder
    $scope.PartMasterList = [];
    $scope.SpareVendorList = [];
    $scope.SpareingRequestList = [];
    $scope.SpareLocationList = [];
    $scope.SpareUploadList = [];
    $scope.Min = 1;
    $scope.LineList = [];
    $scope.MachineList = [];
    $scope.ReasonList = [];
    $scope.SpareRequestReason = [];
    $scope.MachineListMaster = [];
    $scope.filterSpareUploadList = [];
    $scope.SpareingRegrainList = []
    $scope.RegrainCode = '';
    keyname = 'PartId';
    keys = [];
    $scope.machinecodeError = false;
    $scope.EmployeeMasterList = [];
    $scope.filterSpareLocationList = [];

    $scope.RequestReason = false;
    $scope.Request = false;
    $scope.ShiftMaster = false;
    $scope.LineMaster = false;
    $scope.MachineMaster = false;
    $scope.Upload = false;


    $scope.obj = new SpareingrequestServices.SpareingrequestData(null);

    $scope.BindFilterData = function () {

        commonService.postWebService('Spare/BindListSpareingRequest', { 'P_KEY': 'L', 'dummy_col1': 'Request', 'P_PAGE_INDEX': $scope.currentPage, 'P_PAGE_SIZE': '10' }).then(function (response) {
            $scope.SpareingRequestList = response.ddSpareingRequest;
            $scope.SpareReq_plant = response.ddlOrgId;
            $scope.TotalCount = parseInt($scope.SpareingRequestList[0].TotalCount)
            angular.forEach($scope.SpareingRequestList, function (value, key) {
                value.SpareReq_Qty = parseFloat(value.SpareReq_Qty);
                value.SpareReq_AvailableQty = parseFloat(value.SpareReq_AvailableQty);
                value.SpareReq_id = parseFloat(value.SpareReq_id);
                //angular.forEach($scope.MachineListMaster, function (value1, key) {
                //    if (value1.Machinecode == value.SpareReq_MachineCode) {
                //        value.SpareReq_Machinename = value1.MachineName;
                //    }

                //});
            });
        });

    };
    $scope.numPages = function () {
        return Math.ceil($scope.TotalCount / $scope.numPerPage);
    };
    $scope.init = function () {
        $scope.IsListDivVisible = true;
        $scope.IsEditDivVisible = false;
        $scope.currentPage = 1;
        $scope.numPerPage = 10;
        $scope.maxSize = 5;
        $scope.TotalCount = 0;
        commonService.postWebService('Spare/BindListSpareingRequest', { 'P_KEY': 'L', 'dummy_col1': 'RequestReason' }).then(function (response) {
            $scope.SpareRequestReason = response.ddlRequestReason;
            $scope.RequestReason = true;
        });
        commonService.postWebService('Spare/BindListSpareingRequest', { 'P_KEY': 'L', 'dummy_col1': 'Request', 'P_PAGE_INDEX': '1', 'P_PAGE_SIZE': '10' }).then(function (response) {
            $scope.SpareingRequestList = response.ddSpareingRequest;
            $scope.SpareReq_plant = response.ddlOrgId;
            $scope.obj.SpareReq_no = $scope.SpareingRequestList[0].Max_SpareReq_no;
            $scope.TotalCount = parseInt($scope.SpareingRequestList[0].TotalCount)
            angular.forEach($scope.SpareingRequestList, function (value, key) {
                value.SpareReq_Qty = parseFloat(value.SpareReq_Qty);
                value.SpareReq_AvailableQty = parseFloat(value.SpareReq_AvailableQty);
                value.SpareReq_id = parseFloat(value.SpareReq_id);
                //angular.forEach($scope.MachineListMaster, function (value1, key) {
                //    if (value1.Machinecode == value.SpareReq_MachineCode) {
                //        value.SpareReq_Machinename = value1.MachineName;
                //    }

                //});
            });
            $scope.Request = true;
        });
    
        commonService.postWebService('Spare/BindListSpareingRequest', { 'P_KEY': 'L', 'dummy_col1': 'ShiftMaster' }).then(function (response) {
            $scope.ShiftMasterList = response.ddlShiftmaster;
            $scope.ShiftMaster = true;
        });
        commonService.postWebService('Spare/BindListSpareingRequest', { 'P_KEY': 'L', 'dummy_col1': 'LineMaster' }).then(function (response) {
            $scope.LineList = response.ddlLine;
            $scope.LineMaster = true;
        });
        commonService.postWebService('Spare/BindListSpareingRequest', { 'P_KEY': 'L', 'dummy_col1': 'MachineMaster' }).then(function (response) {
            $scope.MachineListMaster = response.ddlMachine;
            $scope.MachineMaster = true;
        });
      
            commonService.postWebService('Spare/BindListSpareingRequest', { 'P_KEY': 'L', 'dummy_col1': 'Upload' }).then(function (response) {
                $scope.SpareUploadList = response.ddlSpareUpload;
                angular.forEach($scope.SpareUploadList, function (item) {

                    var key = item[keyname];

                    if (keys.indexOf(key) === -1) {

                        keys.push(key);

                        $scope.filterSpareUploadList.push(item)
                    }
                });
                $scope.Upload = true;
            });
        //}
        
        //$scope.DatatableInitialize();
    };

    $scope.GetExcelData = function () {
        commonService.postWebService('Spare/GetExcelSpareRequestData', { 'P_KEY': 'EXCEL', 'dummycolumn1': 'Part' }).then(function (response) {

            $scope.DownloadTab(response);
        });
    }
    $scope.DownloadTab = function (response) {
        window.location = '/Spare/Download?ID=' + response.ID + '&Name=' + response.FileName;
    };

    $scope.FunctionSearch = function (obj) {
        debugger;
        commonService.postWebService('Spare/BindListSpareingRequest', { 'P_KEY': 'Search', 'SearchField': obj.SearchField, 'SearchData': obj.SearchData }).then(function (response) {
            $scope.SpareingRequestList = response.ddSpareingRequest;
            $scope.SpareReq_plant = response.ddlOrgId;
            $scope.TotalCount = parseInt($scope.SpareingRequestList[0].TotalCount)
            angular.forEach($scope.SpareingRequestList, function (value, key) {
                value.SpareReq_Qty = parseFloat(value.SpareReq_Qty);
                value.SpareReq_AvailableQty = parseFloat(value.SpareReq_AvailableQty);
                value.SpareReq_id = parseFloat(value.SpareReq_id);
                //angular.forEach($scope.MachineListMaster, function (value1, key) {
                //    if (value1.Machinecode == value.SpareReq_MachineCode) {
                //        value.SpareReq_Machinename = value1.MachineName;
                //    }

                //});
            });
        });
    }
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
        var request = new SpareingrequestServices.getLineDetails(row);
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
                // response.ddlLineMachine[0].Machinecode = { id: '' };
                $scope.MachineList = [];
                $scope.obj.Machinecode = { id: '' };
            }
            //$scope.obj.Machinecode = { id: row.SpareReq_MachineCode };
            //   $scope.obj.SpareReq_Reason = { id: row.SpareReq_Reason };
            //$scope.obj.Machinecode = names1;
        });
    }

    $scope.BindPartName = function (row) {
        debugger;
        row.SpareReq_AvailableQty = 0;
        $scope.filterSpareLocationList = [];
        keys = [];
        
        angular.forEach($scope.PartMasterList, function (value, key) {
            if (value.PartNumber == row.SpareReq_Partno) {
                row.PartId = value.PartId;
            }
        });
             angular.forEach($scope.PartMasterList, function (value, key) {
                if (value.PartId == row.PartId) {
                //row.SpareReq_Partno = value.PartNumber;
                row.SpareReq_Partname = value.PartName;
                if (parseFloat(value.TotalProductCount) > 0) {
                    row.SpareReq_AvailableQty = parseFloat(row.SpareReq_AvailableQty) + parseFloat(value.TotalProductCount)//(Comment on 05/04/2021)
                   // row.SpareReq_AvailableQty = parseFloat(value.TotalProductCount);
                }
                //else
                //{
                //    row.SpareReq_AvailableQty = 0;
                //}
                row.Sparetype = value.IsReusable;
               // row.PartId = value.PartId;
            };
            if (value.PartNumber == row.SpareReq_Partno) {
                row.SpareReq_PartSpecification = value.PartSpecification
                //return false;
            };
        });

        //angular.forEach($scope.SpareingRegrainList, function (value2, key) {

        //    if (value2.PartNumber == row.SpareReq_Partno) {

        //        row.RegrainCode = SpareReg_Regrain_no;

        //    }

        //});

             angular.forEach($scope.SpareUploadList, function (value, key) {
                 if (value.PartId == row.PartId && parseFloat(value.Quantity)>0) {
                     var key = value.Spare_Location;
                    
                     if (keys.indexOf(key) === -1) {
                        
                         keys.push(key);
                        
                         //$scope.filterSpareUploadList.push(item)
                         $scope.filterSpareLocationList.push({ id: value.Spare_Location, label: value.Spare_Location })
                     }
                    

                 }

             });



    }

    $scope.filterPartMasterList = function (filterSpareUploadList) {
        return (filterSpareUploadList.IsActive === 'Y');
    }
    $scope.filterSpareRequestReason = function (SpareRequestReason) {
        return (SpareRequestReason.IsActive === 'Y');
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

    $scope.CancelSpareingRequest = function () {
        $scope.IsListDivVisible = true;
        $scope.IsEditDivVisible = false;
        $scope.selectionLimit = 1;
        $scope.obj = null;
       // $scope.SpareRequestForm.$setPristine();
    };

    var intervalId = window.setInterval(
    $scope.AddTab_Visblity = function () {
      if ($scope.RequestReason === false || $scope.Request === false || $scope.ShiftMaster === false || $scope.LineMaster === false || $scope.MachineMaster === false || $scope.Upload === false) {
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
        debugger;
        if (!$scope.isAddTab_Visblity) {
            return false;
        }
        $scope.IsEditDivVisible = true;
        $scope.IsListDivVisible = false;
        $scope.filterSpareLocationList = [];
        keys = [];
     
        if ($scope.PartMasterList.length == 0) {
            commonService.postWebService('Spare/BindListSpareingRequest', { 'P_KEY': 'G', 'dummy_col1': 'Part' }).then(function (response) {
                $scope.PartMasterList = response.ddlPartmaster;
                $scope.BindPartName(row); //(CHANGE ADD 07 / 04 / 2021)
                //angular.forEach($scope.PartMasterList, function (value, key) {
                    //angular.forEach($scope.SpareUploadList, function (value1, key) {
                    //    value1.Quantity = parseFloat(value1.Quantity);
                    //    if (value1.PartNumber == value.PartNumber) {
                    //        value1.PartName = value.PartName;
                    //        value1.PartSpecification = value.PartSpecification;
                    //    }

                    //});


                    //angular.forEach($scope.SpareUploadList, function (item) {

                    //    var key = item[keyname];

                    //    if (keys.indexOf(key) === -1) {

                    //        keys.push(key);

                    //        $scope.filterSpareUploadList.push(item)
                    //    }
                    //});

                //});
            });
        }
        //else
        //{
        //    angular.forEach($scope.PartMasterList, function (value, key) {
        //        angular.forEach($scope.SpareUploadList, function (value1, key) {
        //            value1.Quantity = parseFloat(value1.Quantity);
        //            if (value1.PartNumber == value.PartNumber) {
        //                value1.PartName = value.PartName;
        //                value1.PartSpecification = value.PartSpecification;
        //            }

        //        });


        //        angular.forEach($scope.SpareUploadList, function (item) {

        //            var key = item[keyname];

        //            if (keys.indexOf(key) === -1) {

        //                keys.push(key);

        //                $scope.filterSpareUploadList.push(item)
        //            }
        //        });

        //    });
        //}
        if (key == 'E') {
            $scope.disableCtrl = false;
            //$scope.BindPartName(row);
            $scope.obj = new SpareingrequestServices.SpareingrequestData(row);
            $scope.obj.SpareReq_Qty = parseFloat($scope.obj.SpareReq_Qty);
            $scope.obj.KEY = key;

            $scope.obj.LineMachine_Line_Code = row.SpareReq_Linename;
            $scope.getLineDetails($scope.obj);

            if (row.IsActive == 'N') {
                $scope.obj.IsActive = false;
            }
            else {
                $scope.obj.IsActive = true;
            }
            // $scope.BindCity(row, "E");
            
            angular.forEach($scope.SpareUploadList, function (value, key) {
                if (value.PartId == row.PartId && parseFloat(value.Quantity) > 0) {
                    var key = value.Spare_Location;

                    if (keys.indexOf(key) === -1) {

                        keys.push(key);

                        //$scope.filterSpareUploadList.push(item)
                        $scope.filterSpareLocationList.push({ id: value.Spare_Location, label: value.Spare_Location })
                    }
                }

            });
        }
        else if (key == 'V') {
           // $scope.BindPartName(row);(CHANGE 07/04/2021)
            $scope.obj = new SpareingrequestServices.SpareingrequestData(row);
            $scope.obj.SpareReq_Qty = parseFloat($scope.obj.SpareReq_Qty);
            $scope.obj.KEY = key;

            $scope.obj.LineMachine_Line_Code = row.SpareReq_Linename;
            $scope.getLineDetails($scope.obj);

            if (row.IsActive == 'N') {
                $scope.obj.IsActive = false;
            }
            else {
                $scope.obj.IsActive = true;
            }
            $scope.disableCtrl = true;

            angular.forEach($scope.filterSpareUploadList, function (value, key) {
                if (value.PartId == row.PartId && parseFloat(value.Quantity) > 0) {
                    var key = value.Spare_Location;

                    if (keys.indexOf(key) === -1) {

                        keys.push(key);

                        //$scope.filterSpareUploadList.push(item)
                        $scope.filterSpareLocationList.push({ id: value.Spare_Location, label: value.Spare_Location })
                    }
                }

            });
        }
        else {
            $scope.disableCtrl = false;
            $scope.obj = new SpareingrequestServices.SpareingrequestData(null);
            if ($scope.SpareingRequestList.length > 0) {
                $scope.obj.SpareReq_no = $scope.SpareingRequestList[0].Max_SpareReq_no;
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
                        $scope.obj.SpareReq_shift = shift.ShiftName;
                    }

                }
                else if (parseFloat(shift.Shift_StartTime.replace(':', '.')) > 12 && parseFloat(shift.Shift_endTime.replace(':', '.')) < 12 && shift.IsUse == "1") {
                    if (parseFloat(shift.Shift_StartTime.replace(':', '.')) >= parseFloat(currHours.replace(':', '.')) && parseFloat(currHours.replace(':', '.')) <= parseFloat(shift.Shift_endTime.replace(':', '.'))) {
                        $scope.obj.SpareReq_shift = shift.ShiftName;
                    }
                    else if (parseFloat(shift.Shift_StartTime.replace(':', '.')) <= parseFloat(currHours.replace(':', '.')) && parseFloat(currHours.replace(':', '.')) >= parseFloat(shift.Shift_endTime.replace(':', '.'))) {
                        $scope.obj.SpareReq_shift = shift.ShiftName;
                    }
                }
                else if (parseFloat(shift.Shift_StartTime.replace(':', '.')) < 12 && parseFloat(shift.Shift_endTime.replace(':', '.')) > 12 && shift.IsUse == "1") {
                    if (parseFloat(currHours.replace(':', '.')) >= parseFloat(shift.Shift_StartTime.replace(':', '.')) && parseFloat(currHours.replace(':', '.')) <= parseFloat(shift.Shift_endTime.replace(':', '.'))) {
                        $scope.obj.SpareReq_shift = shift.ShiftName;
                    }

                }

            })


            $scope.obj.SpareReq_plant = $scope.SpareReq_plant
            $scope.obj.SpareReq_datetime = datetime;
        }
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
            if (value.VendorCode == row.VendorCode) { row.VendorName = value.VendorName };
        });
    }
    $scope.submitForm = function (isValid, Spareingrequest) {
        // check to make sure the form is completely valid
        debugger;
        if (isValid) {



            //if (Spareingrequest.Machinecode.id != null) {
            //    $scope.machinecodeError = false;
            //    if (Spareingrequest.Machinecode.id == "") {
            //        $scope.machinecodeError = true;
            //        return false;
            //    }
            //}
            //$scope.machinecodeError = false;
            Spareingrequest.SpareReq_Reason = Spareingrequest.SpareReq_Reason;
            Spareingrequest.RegrainCode = $scope.RegrainCode;
            //            Spareingrequest.SpareReq_Reason = Spareingrequest.SpareReq_Reason;

            $scope.SaveSpareingRequest(Spareingrequest);
            $scope.SpareRequestForm.$setPristine();
        }
        else {
            angular.forEach($scope.SpareRequestForm.$error.required, function (field) {
                field.$setDirty();
            });
            //var PartNumber = document.getElementById("PartNumber");
            //var PartName = document.getElementById("PartName");
            //var VendorCode = document.getElementById("VendorCode");
            //var CostPerUnit = document.getElementById("CostPerUnit");
            //var Quantity = document.getElementById("Quantity");
            //var Spare_Location = document.getElementById("Spare_Location");
            //if (PartNumber.value == "") {
            //    PartNumber.focus();
            //}

            //else if (PartName.value == "") {

            //    PartName.focus();
            //}

            //else if (CostPerUnit.value == "") {

            //    CostPerUnit.focus();
            //}
            //else if (Spare_Location.value == "") {

            //    Spare_Location.focus();
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

    $scope.validation = function (Spareingrequest) {
        if (Spareingrequest.Machinecode.id != null) {
            $scope.machinecodeError = true;

            if (Spareingrequest.Machinecode.id.length != 0) {
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

    $scope.SaveSpareingRequest = function (Spareingrequest) {

        var is_valid = $scope.validation(Spareingrequest);
        if (is_valid) {
            if (Spareingrequest.IsActive == true) {
                Spareingrequest.IsActive = "1";

            }
            else {
                Spareingrequest.IsActive = "0";
            }
            Spareingrequest.SpareReq_MachineCode = Spareingrequest.Machinecode["id"];
            //  Spareingrequest.SpareReq_Reason = Spareingrequest.SpareReq_Reason["id"];
            Spareingrequest.SpareReq_Linename = Spareingrequest.LineMachine_Line_Code;
            var request = new SpareingrequestServices.SaveSpareingRequest(Spareingrequest);
            commonService.postWebService(request.url, request.param).then(function (response) {
                debugger;

                if (response.liSpareingRequest != null) {
                    if (response.liSpareingRequest[0].MSG == "Updated Success") {
                        $("#Message").val('Updated !! ');//Messgae
                        $('#Title').html('Spare Request Update Successfully');//Title
                        //$scope.init();
                        $scope.IsListDivVisible = true;
                        $scope.IsEditDivVisible = false;
                        commonService.postWebService('Spare/BindListSpareingRequest', { 'P_KEY': 'L', 'dummy_col1': 'Request', 'P_PAGE_INDEX': '1', 'P_PAGE_SIZE': '10' }).then(function (response) {
                            $scope.SpareingRequestList = response.ddSpareingRequest;
                            $scope.SpareReq_plant = response.ddlOrgId;
                            $scope.TotalCount = parseInt($scope.SpareingRequestList[0].TotalCount)
                            angular.forEach($scope.SpareingRequestList, function (value, key) {
                                value.SpareReq_Qty = parseFloat(value.SpareReq_Qty);
                                value.SpareReq_AvailableQty = parseFloat(value.SpareReq_AvailableQty);
                                value.SpareReq_id = parseFloat(value.SpareReq_id);
                                
                            });

                        });
                        $scope.obj = null;
                        $scope.SpareRequestForm.$setPristine();
                        $("#Message").trigger("click");
                        //alert("Spare Request Update Successfully")

                        //      $scope.CancelSpareingRequest();
                    }
                    else if (response.liSpareingRequest[0].MSG == "Spare Already Uploaded") {

                        $("#Message").val('Alter !! ');//Messgae
                        $('#Title').html('Part Number - "' + response.liSpareingRequest[0].PartNumber + '" Already Exists');//Title
                        $("#Message").trigger("click");
                        $scope.obj.IsActive = true;
                    }
                    else {
                        $("#Message").val('Saved !! ');//Messgae
                        $('#Title').html('Spare Request Saved Successfully');//Title
                       //$scope.init();
                        $scope.IsListDivVisible = true;
                        $scope.IsEditDivVisible = false;
                        commonService.postWebService('Spare/BindListSpareingRequest', { 'P_KEY': 'L', 'dummy_col1': 'Request', 'P_PAGE_INDEX': '1', 'P_PAGE_SIZE': '10' }).then(function (response) {
                            $scope.SpareingRequestList = response.ddSpareingRequest;
                            $scope.SpareReq_plant = response.ddlOrgId;
                            $scope.TotalCount = parseInt($scope.SpareingRequestList[0].TotalCount)
                            angular.forEach($scope.SpareingRequestList, function (value, key) {
                                value.SpareReq_Qty = parseFloat(value.SpareReq_Qty);
                                value.SpareReq_AvailableQty = parseFloat(value.SpareReq_AvailableQty);
                                value.SpareReq_id = parseFloat(value.SpareReq_id);
                                
                            });
                        });
                        $scope.obj = null;
                        $scope.SpareRequestForm.$setPristine();
                        $("#Message").trigger("click");
                        //  alert("Spare Requested Successfully")

                        // $scope.CancelSpareingRequest();
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
        $scope.obj = new SpareingrequestServices.SpareingrequestData(row);
        myFunctionCompany();
    }

});
