spareingreturnchkApp.controller('spareingreturnchkCtrl', function (Excel, $timeout, $scope, $filter, spareingreturnchkServices, commonService, DTOptionsBuilder, DTColumnBuilder) {
    $scope.disableTabCtrl = true;
    $scope.PartMasterList = [];
    $scope.SpareVendorList = [];
    $scope.SpareingReturnChkList = [];
    $scope.SpareLocationList = [];
    $scope.SpareUploadList = [];
    $scope.Min = 1;
    $scope.LineList = [];
    $scope.MachineList = [];
    $scope.ReasonList = [];
    $scope.SpareReturnReason = [];
    $scope.SpareIssueList = [];
    $scope.machinecodeError = false;

    $scope.Part_Flag = false;
    $scope.Location_Flag = false;
    $scope.Return_Flag = false;
    $scope.Reason_Flag = false;
    $scope.Vendor_Flag = false;
    $scope.Shift_Flag = false;
    $scope.Line_Flag = false;
    $scope.Issue_Flag = false;



    $scope.obj = new spareingreturnchkServices.spareingreturnchkData(null);

    $scope.init = function () {
        debugger;
        
        commonService.postWebService('Spare/BindListSpareingReturn', { 'P_KEY': 'L', 'dummy_col1': 'Part' }).then(function (response) {
            $scope.PartMasterList = response.ddlPartmaster;
            $scope.Part_Flag = true;
        });
        commonService.postWebService('Spare/BindListSpareingReturn', { 'P_KEY': 'L', 'dummy_col1': 'Location' }).then(function (response) {
            $scope.SpareLocationList = response.ddlSpareLocation;
            $scope.Location_Flag = true;
        });
        commonService.postWebService('Spare/BindListSpareingReturn', { 'P_KEY': 'L', 'dummy_col1': 'Return' }).then(function (response) {
            $scope.SpareingReturnChkList = response.ddSpareingReturn;
            $scope.obj.SpareRts_Return_no = $scope.SpareingReturnChkList[0].SpareRts_no;
            angular.forEach($scope.SpareingReturnChkList, function (value, key) {
                value.SpareRts_Qty = parseFloat(value.SpareRts_Qty);
            });
            $scope.Return_Flag = true;
        });
        commonService.postWebService('Spare/BindListSpareingReturn', { 'P_KEY': 'L', 'dummy_col1': 'Reason' }).then(function (response) {
            $scope.SpareReturnReason = response.ddlReturnReason;
            $scope.Reason_Flag = true;
        });
        commonService.postWebService('Spare/BindListSpareingReturn', { 'P_KEY': 'L', 'dummy_col1': 'Vendor' }).then(function (response) {
            $scope.SpareVendorList = response.ddlVendormaster;
            $scope.Vendor_Flag = true;
        });
        commonService.postWebService('Spare/BindListSpareingReturn', { 'P_KEY': 'L', 'dummy_col1': 'Shift' }).then(function (response) {
            $scope.ShiftMasterList = response.ddlShiftmaster;
            $scope.SpareRts_plant = response.ddlOrgId;
            $scope.Shift_Flag = true;
        });
        commonService.postWebService('Spare/BindListSpareingReturn', { 'P_KEY': 'L', 'dummy_col1': 'Line' }).then(function (response) {
            $scope.LineList = response.ddlLine;
            $scope.Line_Flag = true;
        });
        commonService.postWebService('Spare/BindListSpareingReturn', { 'P_KEY': 'L', 'dummy_col1': 'Issue' }).then(function (response) {
            $scope.SpareIssueList = response.ddlSpareingIssue;
            $scope.SpareUploadList = response.ddlSpareUpload;
            angular.forEach($scope.SpareUploadList, function (value, key) {
                value.Quantity = parseFloat(value.Quantity);

            });
            $scope.Issue_Flag = true;
            $scope.IsListDivVisible = true;
            $scope.IsEditDivVisible = false;
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
        commonService.postWebService('Spare/GetExcelSpareReturnData', { 'P_KEY': 'EXCEL_RC', 'dummycolumn1': 'Part' }).then(function (response) {

            $scope.DownloadTab(response);
        });
    }
    $scope.DownloadTab = function (response) {
        //alert(response);
        //$("#page-loader").hide();

        window.location = '/Spare/Download?ID=' + response.ID + '&Name=' + response.FileName;
    };

    $scope.getLineDetails = function (row) {
        debugger;
        var request = new spareingreturnchkServices.getLineDetails(row);
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

                row.SpareIsu_datetime = value.SpareIsu_datetime,
                //row.SpareRqt_datetime = value.SpareReq_Date,
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
                //if (value.PartNumber == row.ToolRts_Partno) {
                value.PartNumber = row.ToolRts_Partno
                row.SpareRts_Partname = value.PartName,
                row.SpareRts_AvailableQty = parseFloat(value.TotalProductCount),
                 row.Sparetype = value.IsReusable
            };
            if (value.PartNumber == row.SpareRts_Partno) {
                row.SpareRts_PartSpecification = value.PartSpecification
                return false;
            };
        });

        //angular.forEach($scope.SpareIssueList, function (value, key) {
        //    if (value.SpareIsu_Partno == row.SpareRts_Partno) {
        //        row.SpareIsu_datetime = value.SpareIsu_Date,
        //        row.SpareRqt_datetime = value.SpareReq_Date,
        //        row.SpareIsu_id = value.SpareIsu_id
        //    };

        //});
    }


    $scope.filterSpareReturnReason = function (SpareReturnReason) {
        return (SpareReturnReason.IsActive === 'Y');
    }

    $scope.filterSpareingReturnChkList = function (SpareingReturnChkList) {
        return (SpareingReturnChkList.IsActive === 'Y' && SpareingReturnChkList.Spare_Status === 'RT' && SpareingReturnChkList.Return_Status == '');
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

    var intervalId = window.setInterval(
      $scope.ShowTab = function () {
          if ($scope.Part_Flag === false || $scope.Location_Flag === false || $scope.Return_Flag === false || $scope.Reason_Flag === false || $scope.Vendor_Flag === false || $scope.Shift_Flag === false || $scope.Line_Flag === false || $scope.Issue_Flag === false) {
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

    $scope.CancelSpareingReturnChk = function () {
        $scope.IsListDivVisible = true;
        $scope.IsEditDivVisible = false;
        $scope.selectionLimit = 1;
        $scope.obj = null;
        $scope.SpareReturnForm.$setPristine();
    };


    $scope.editClick = function (row, key, IsActive) {
        debugger;
        $scope.IsEditDivVisible = true;
        $scope.IsListDivVisible = false;
        if (key == 'E') {
            $scope.BindPartName(row);
            $scope.obj = new spareingreturnchkServices.spareingreturnchkData(row);
            $scope.obj.KEY = key;

            $scope.obj.LineMachine_Line_Code = row.SpareRts_Linename;
            $scope.getLineDetails($scope.obj);
            $scope.obj.SpareRts_Unicode = row.SpareRts_Unicode;
            if (row.IsActive == 'N') {
                $scope.obj.IsActive = false;
            }
            else {
                $scope.obj.IsActive = true;
            }
            // $scope.BindCity(row, "E");
        }
        else {
            $scope.obj = new spareingreturnchkServices.spareingreturnchkData(null);
            if ($scope.SpareingReturnChkList.length > 0) {
                $scope.obj.SpareRts_Return_no = $scope.SpareingReturnChkList[0].SpareRts_no;

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
                        $scope.obj.SpareRts_shift = shift.ShiftName;
                    }

                }
                else if (parseFloat(shift.Shift_StartTime.replace(':', '.')) > 12 && parseFloat(shift.Shift_endTime.replace(':', '.')) < 12 && shift.IsUse == "1") {
                    if (parseFloat(shift.Shift_StartTime.replace(':', '.')) >= parseFloat(currHours.replace(':', '.')) && parseFloat(currHours.replace(':', '.')) <= parseFloat(shift.Shift_endTime.replace(':', '.'))) {
                        $scope.obj.SpareRts_shift = shift.ShiftName;
                    }
                    else if (parseFloat(shift.Shift_StartTime.replace(':', '.')) <= parseFloat(currHours.replace(':', '.')) && parseFloat(currHours.replace(':', '.')) >= parseFloat(shift.Shift_endTime.replace(':', '.'))) {
                        $scope.obj.SpareRts_shift = shift.ShiftName;
                    }
                }
                else if (parseFloat(shift.Shift_StartTime.replace(':', '.')) < 12 && parseFloat(shift.Shift_endTime.replace(':', '.')) > 12 && shift.IsUse == "1") {
                    if (parseFloat(currHours.replace(':', '.')) >= parseFloat(shift.Shift_StartTime.replace(':', '.')) && parseFloat(currHours.replace(':', '.')) <= parseFloat(shift.Shift_endTime.replace(':', '.'))) {
                        $scope.obj.SpareRts_shift = shift.ShiftName;
                    }

                }

            })


            $scope.obj.SpareRts_plant = $scope.SpareRts_plant
            $scope.obj.SpareRts_datetime = datetime;
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
    $scope.submitForm = function (isValid, spareingreturnchk) {
        // check to make sure the form is completely valid
        debugger;
        if (isValid) {
            if (spareingreturnchk.Machinecode.id == null) {
                $scope.machinecodeError = true;
                return false;
            }
            else if (spareingreturnchk.Machinecode.id == "") {
                $scope.machinecodeError = true;
                return false;
            }
            $scope.machinecodeError = false;
            spareingreturnchk.SpareRts_Reason = spareingreturnchk.SpareRts_Reason;
            $scope.SaveSpareingReturnChk(spareingreturnchk);
            $scope.SpareReturnForm.$setPristine();
        }
        else {
            angular.forEach($scope.SpareReturnForm.$error.required, function (field) {
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

    $scope.setReturnReason = function (reason) {
        console.log(reason)

    }

    $scope.SaveSpareingReturnChk = function (spareingreturnchk) {
        if (spareingreturnchk.IsActive == true) {
            spareingreturnchk.IsActive = "1";

        }
        else {
            spareingreturnchk.IsActive = "0";
        }
        spareingreturnchk.SpareRts_MachineName = spareingreturnchk.Machinecode["id"];
        //spareingreturnchk.SpareRts_Reason = spareingreturnchk.SpareRts_Reason["id"];
        spareingreturnchk.SpareRts_Linename = spareingreturnchk.LineMachine_Line_Code;
        var request = new spareingreturnchkServices.SaveSpareingReturnChk(spareingreturnchk);
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;

            if (response.liSpareingReturn != null) {
                if (response.liSpareingReturn[0].MSG == "Updated Success") {
                    $("#Message").val('Updated !! ');//Messgae
                    $('#Title').html('Spare Return Update Successfully');//Title
                    $scope.init();
                    $scope.obj = null;
                    $scope.SpareReturnForm.$setPristine();
                    $("#Message").trigger("click");
                    //   alert("Spare Return Update Successfully")

                    //  $scope.CancelSpareingReturnChk();
                }
                else if (response.liSpareingReturn[0].MSG == "Spare Already Uploaded") {

                    $("#Message").val('Alter !! ');//Messgae
                    $('#Title').html('Part Number - "' + response.liSpareingReturn[0].PartNumber + '" Already Exists');//Title
                    $("#Message").trigger("click");
                    $scope.obj.IsActive = true;
                }
                else if (response.liSpareingReturn[0].MSG == "Stock Added Success") {

                    $("#Message").val('Updated !! ');//Messgae
                    $('#Title').html('Return Spare Added to Stock Successfully');//Title
                    $scope.init();
                    $scope.obj = null;
                    $scope.SpareReturnForm.$setPristine();
                    $("#Message").trigger("click");
                }
                else if (response.liSpareingReturn[0].MSG == "Scraped Success") {

                    $("#Message").val('Updated !! ');//Messgae
                    $('#Title').html('Return Spare Scraped Successfully');//Title
                    $scope.init();
                    $scope.obj = null;
                    $scope.SpareReturnForm.$setPristine();
                    $("#Message").trigger("click");
                }
                else if (response.liSpareingReturn[0].MSG == "Already Issued") {
                    $("#Message").val('Alter !! ');//Messgae
                    $('#Title').html('Already This item has been returned');//Title
                    $scope.init();
                    $scope.obj = null;
                    $scope.SpareReturnForm.$setPristine();
                    $("#Message").trigger("click");
                    $scope.CancelSpareingReturnChk();
                }
                else {           
                    window.location.href = "SpareingRegrindingWithParameter?SRNo=" + response.liSpareingReturn[0].SpareRts_Return_no;
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
        $scope.obj = new spareingreturnchkServices.spareingreturnchkData(row);
        myFunctionCompany();
    }

});
