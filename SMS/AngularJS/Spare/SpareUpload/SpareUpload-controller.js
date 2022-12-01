spareuploadApp.controller('spareuploadCtrl', function (Excel, $timeout, $scope, $filter, spareuploadServices, commonService) {
    $scope.PartMasterList = [];
    $scope.SpareVendorList = [];
    $scope.SpareUploadList = [];
    $scope.SpareLocationList = [];
    $scope.FullSpareUploadList = [];
    $scope.ErrChkReusableQty = false;
    $scope.ErrUnicodeMust = false;
    $scope.UnicodeValueRows = [{ 'ROWID': '1', 'UNICODE_VALUE': '' }];
    $scope.OrgId = 0;

    $scope.Inward_Flag = false;
    $scope.Inward1_Flag = false;



    $scope.obj = new spareuploadServices.spareuploadData(null);

      $scope.FunctionSearch = function (obj) {
          debugger;
          if (obj.SearchField == '')
          {
              $scope.init()
              return false;
          }
          if (obj.SearchData == '') {
              $scope.init()
              return false;
          }
        commonService.postWebService('Spare/BindListSpareUpload', { 'P_KEY': 'Search', 'SearchField': obj.SearchField, 'SearchData': obj.SearchData }).then(function (response) {
            $scope.SpareUploadList = response.ddlSpareUpload;
            $scope.OrgId = response.ddlSpareUpload[0].OrgID;
            $scope.obj.SpareInward_no = $scope.SpareUploadList[0].Max_SpareInward_no;
            $scope.TotalCount = parseInt($scope.SpareUploadList[0].TotalCount)
        });
    }
    $scope.BindFilterData = function () {
       
        commonService.postWebService('Spare/BindListSpareUpload', { 'P_KEY': 'CL', 'dummycolumn1': 'Inward', 'P_PAGE_INDEX': $scope.currentPage, 'P_PAGE_SIZE': '10' }).then(function (response) {
            $scope.SpareUploadList = response.ddlSpareUpload;
            $scope.obj.SpareInward_no = $scope.SpareUploadList[0].Max_SpareInward_no;
            $scope.TotalCount = parseInt($scope.SpareUploadList[0].TotalCount)
        });

    };
    $scope.GetExcelData = function () {
        commonService.postWebService('Spare/GetExcelInwardData', { 'P_KEY': 'L', 'dummycolumn1': 'Part' }).then(function (response) {

            $scope.DownloadTab(response);
        });
    }
    $scope.DownloadTab = function (response) {
        //alert(response);
        //$("#page-loader").hide();

        window.location = '/Spare/Download?ID=' + response.ID + '&Name=' + response.FileName;
    };
    $scope.init = function () {
        debugger;
        $scope.obj.SearchField = '';
        $scope.obj.SearchData = '';
        $scope.UnicodeValueRows = [{ 'ROWID': '1', 'UNICODE_VALUE': '' }];
        $scope.IsListDivVisible = true;
        $scope.IsEditDivVisible = false;
        $scope.Data = [{ 'P_KEY': 'CL', 'dummycolumn1': 'Inward' }];
        $scope.currentPage = 1;
        $scope.numPerPage = 10;
        $scope.maxSize = 5;
        $scope.TotalCount = 0;

        commonService.postWebService('Spare/BindListSpareUpload', { 'P_KEY': 'CL', 'dummycolumn1': 'Inward', 'P_PAGE_INDEX': '1', 'P_PAGE_SIZE': '10' }).then(function (response) {
            $scope.SpareUploadList = response.ddlSpareUpload;
            $scope.OrgId = response.ddlSpareUpload[0].OrgID;
            $scope.obj.SpareInward_no = $scope.SpareUploadList[0].Max_SpareInward_no;
            $scope.TotalCount = parseInt($scope.SpareUploadList[0].TotalCount)
            $scope.Inward_Flag = true;
        });

        commonService.postWebService('Spare/BindListSpareUpload', { 'P_KEY': 'L', 'dummycolumn1': 'Inward' }).then(function (response) {
            $scope.FullSpareUploadList = response.ddlSpareUploadList;
            $scope.Inward1_Flag = true;
        });

    };
    $scope.numPages = function () {
        return Math.ceil($scope.TotalCount / $scope.numPerPage);
    };
    $scope.filterPartMasterList = function (PartMasterList) {
        return (PartMasterList.IsActive === 'Y');
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

    $scope.CancelSpareUpload = function () {
        $scope.IsListDivVisible = true;
        $scope.IsEditDivVisible = false;
        $scope.obj = new spareuploadServices.spareuploadData(null);
        $scope.obj.PartNumber = "";
        $scope.obj.VendorCode = "";
        $scope.obj.Spare_Location = "";
        $scope.SpareUploadMasterForm.$setPristine();
    };
    $scope.addUnicodeValNewRow = function (obj) {
        debugger;
        if (obj.Sparetype == 'Y') {
            $scope.UnicodeValueRows = [{ 'ROWID': '1', 'UNICODE_VALUE': '' }];
            //if (Action == 'R' && isFirst == false) {
            //    $scope.PivotValueRows.splice($scope.PivotValueRows.indexOf(row), 1);
            //} else if (Action == 'A') {
            for (i = 1; i <= obj.Quantity - 1; i++) {
                var maxID = (Math.max.apply(null, $scope.UnicodeValueRows.map(x => x.ROWID)) || 0) + 1;
                $scope.UnicodeValueRows.push({ 'ROWID': maxID.toString(), 'UNICODE_VALUE': '' });
            }
        }

        //}
    };

    var intervalId = window.setInterval(
    $scope.AddTab_Visblity = function () {
      if (    $scope.Inward_Flag === false || $scope.Inward1_Flag === false) {
          //return false;
          $scope.isAddTab_Visblity = false
      } else {
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
        $scope.IsEditDivVisible = true;
        $scope.IsListDivVisible = false;

       
        $scope.UnicodeValueRows = [{ 'ROWID': '1', 'UNICODE_VALUE': '' }];


        if ($scope.PartMasterList == 0) {
            commonService.postWebService('Spare/BindListSpareUpload', { 'P_KEY': 'L', 'dummycolumn1': 'Part' }).then(function (response) {

                $scope.PartMasterList = response.ddlPartmaster;
                if ($scope.SpareLocationList == 0) {
                    commonService.postWebService('Spare/BindListSpareUpload', { 'P_KEY': 'L', 'dummycolumn1': 'Location' }).then(function (response) {

                        $scope.SpareLocationList = response.ddlSpareLocation;
                        if ($scope.SpareVendorList == 0) {
                            commonService.postWebService('Spare/BindListSpareUpload', { 'P_KEY': 'L', 'dummycolumn1': 'Vendor' }).then(function (response) {

                                $scope.SpareVendorList = response.ddlVendormaster;

                                //angular.forEach($scope.PartMasterList, function (value, key) {
                                //    angular.forEach($scope.SpareUploadList, function (value1, key) {
                                //        value1.Quantity = parseFloat(value1.Quantity);
                                //        if (value1.PartId == value.PartId) {
                                //            value1.PartName = value.PartName;
                                //            value1.PartSpecification = value.PartSpecification;
                                //        }
                                //    });
                                //});



                            });
                        }

                    });
                }
            });
        }

        if (key == 'E') {
            row.Quantity = parseFloat(row.Quantity);
            if ($scope.OrgId == 1) {
                row.BusinessUnit = 'Brakes';
            }
            else if ($scope.OrgId == 2) {
                row.BusinessUnit = 'Steering';
            }
            else if ($scope.OrgId == 3) {
                row.BusinessUnit = 'EBS';
            }
            $scope.disableCtrl = true;

            $scope.GetInwardDetails(row, key);

        }
        else {
            //row.P_KEY = 'S';
            $scope.disableCtrl = false;

            $scope.obj = new spareuploadServices.spareuploadData(null);
            if ($scope.OrgId == 1) {
                $scope.obj.BusinessUnit = 'Brakes';
            }
            else if ($scope.OrgId == 2) {
                $scope.obj.BusinessUnit = 'Steering';
            }
            else if ($scope.OrgId == 3) {
                $scope.obj.BusinessUnit = 'EBS';
            }
            if ($scope.SpareUploadList.length > 0) {
                $scope.obj.SpareInward_no = $scope.SpareUploadList[0].Max_SpareInward_no;

            }
            $scope.disablecode = false;
            $scope.obj.IsActive = true;
            $scope.obj.KEY = key;
        }


    };


    $scope.GetInwardDetails = function (row, key) {
        // $scope.obj = new spareuploadServices.spareuploadData(row);
        //$scope.obj.P_KEY = 'U';
        var request = new spareuploadServices.GetInwardDetails(row);
        //request.P_KEY = 'U';
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;

            if (response.liSpareUpload != null) {
                $scope.BindInwarDetails(response.liSpareUpload[0], key);

            }
            else {
                $("#Message").val('Failed !! ');//Messgae
                $('#Title').html('Error Happened while Saving Category');//Title
                $("#Message").trigger("click");
            }
        });
    }
    $scope.BindInwarDetails = function (row, key) {
        $scope.BindPartName(row, key);
        row.Quantity = parseFloat(row.Quantity);

        $scope.UnicodeValueRows.splice(0, 1)
        var str_array = row.SpareUniqueCode.split(',');
        for (var i = 0; i < str_array.length; i++) {
            $scope.UnicodeValueRows.push({ 'ROWID': '1', 'UNICODE_VALUE': str_array[i] });
        }
        $scope.obj = new spareuploadServices.spareuploadData(row);
        $scope.obj.KEY = key;
        if (row.IsActive == 'N') {
            $scope.obj.IsActive = false;
        }
        else {
            $scope.obj.IsActive = true;
        }
    }
    $scope.BindPartName = function (row, keyno) {
        debugger;
        $scope.obj.Quantity = ''

        if (keyno != 'E') {
            $scope.UnicodeValueRows = [{ 'ROWID': '1', 'UNICODE_VALUE': '' }];
        }
        $scope.ErrUnicodeMust = false;
        angular.forEach($scope.PartMasterList, function (value, key) {
            if (value.PartNumber == row.PartNumber) { row.PartName = value.PartName };
            if (value.PartNumber == row.PartNumber) {
                row.Sparetype = value.IsReusable
                if (value.IsReusable == 'Y') {
                    //row.Quantity = 1;

                    if (row.SpareUniqueCode == null) {
                        //$scope.ErrUnicodeMust = true;
                    }

                }
                else {
                    $scope.ErrChkReusableQty = false;
                    // row.Quantity = null;
                }
            };
            if (value.PartNumber == row.PartNumber) { row.UOM = value.UOM };
            if (value.PartNumber == row.PartNumber) {
                row.PartSpecification = value.PartSpecification;
                row.PartId = value.PartId;
                if (keyno != 'E') {
                    row.VendorCode = value.VendorCode;
                    row.Spare_Location = value.Spare_Location
                    $scope.BindVendorName(row);

                }
            };
            if (value.PartNumber == row.PartNumber) { $scope.Min = value.Min_qty };
            if (value.PartNumber == row.PartNumber) { $scope.Max = value.Max_qty };

        });
        //$scope.ChkReusableQty(row);
    }
    $scope.ChkReusableQty = function (row, action) {
        debugger;
        //if (row.PartNumber == "") {
        //     $scope.ErrChkPartSelect = true;
        //     return false;
        if (row.PartNumber == null) {
            $scope.ErrChkPartSelect = true;

        }
        else {
            $scope.ErrChkPartSelect = false;
        }

        // }

        if (row.Sparetype == 'Y') {
            //if (row.Quantity > 1) {
            //    $scope.ErrChkReusableQty = true;
            //}
            //else {
            //    $scope.ErrChkReusableQty = false;
            //}
        }

        if (row.Sparetype == 'Y') {
            //if (row.SpareUniqueCode == null) {
            //    $scope.ErrUnicodeMust = true;
            //}
            //else if (row.SpareUniqueCode == '') {
            //    $scope.ErrUnicodeMust = true;
            //}
            //else {
            //    $scope.ErrUnicodeMust = false;
            //}
        }

        // {
        $scope.ErrChkAlreadyExists = false;
        // }
        //if (row.Sparetype == 'Y') {
        //    angular.forEach($scope.SpareUploadList, function (value, key) {
        //        //value.Quantity = parseFloat(value.Quantity);
        //        if (row.PartNumber == value.PartNumber && row.SpareUniqueCode == value.SpareUniqueCode) {
        //            $scope.ErrChkAlreadyExists = true;
        //            //return false;
        //        }
        //    });
        //}

    }
    $scope.ChkAlreadyExitsUnicode = function (row, index) {
        debugger;
        //for(i=0;i<=$scope.SpareUploadList.Length;i++)
        angular.forEach($scope.FullSpareUploadList, function (value, key) {
            if ($scope.obj.PartNumber == value.PartNumber && row.UNICODE_VALUE == value.SpareUniqueCode) {
                $scope.ErrChkAlreadyExists = true;

                //return false;
                $("#Message").val('Alter !! ');//Messgae
                $('#Title').html('UniqueCode - "' + row.UNICODE_VALUE + '" Already Exists');//Title
                $("#Message").trigger("click");
                row.UNICODE_VALUE = "";
            }
            else {
                $scope.ErrChkAlreadyExists = false;
            }

        });

        angular.forEach($scope.UnicodeValueRows, function (value, key) {
            if (index != key) {
                if (row.UNICODE_VALUE == value.UNICODE_VALUE) {
                    $scope.ErrChkAlreadyExists = true;

                    //return false;
                    $("#Message").val('Alter !! ');//Messgae
                    $('#Title').html('UniqueCode - "' + row.UNICODE_VALUE + '" Already Entered in Above List ');//Title
                    $("#Message").trigger("click");
                    row.UNICODE_VALUE = "";
                }
            }
        });
    }


    $scope.BindVendorName = function (row) {
        debugger;
        angular.forEach($scope.SpareVendorList, function (value, key) {
            if (value.VendorCode == row.VendorCode) { row.VendorName = value.VendorName };
        });
    }
    $scope.submitForm = function (isValid, spareupload) {
        // check to make sure the form is completely valid
        var i;
        debugger;
        if (spareupload.KEY == 'E') {
            spareupload.P_KEY = 'U';
        }
        var a = "";
        //var aa = [];
        angular.forEach($scope.UnicodeValueRows, function (value, key) {
            if (value.UNICODE_VALUE != "") {
                a = a + "," + value.UNICODE_VALUE;
                $scope.ErrUnicodeMust = false;
            }
            else {
                if (spareupload.Sparetype == 'Y') {
                    $scope.ErrUnicodeMust = true;
                    $("#Message").val('Alter !! ');//Messgae
                    $('#Title').html('Please Enter Unicode');//Title
                    $("#Message").trigger("click");
                }
            }
        });
        //aa = a.split(',');
        //$scope.obj.DEFAULT_TYPE = a.substr(1);
        //aa = a.substr(1).split(',');
        spareupload.SpareUniqueCode = a.substr(1);

        if (isValid == true) {
            isValid = false;
            i = 0;
        }
        if (i == 0) {
            if (!$scope.ErrUnicodeMust && !$scope.ErrChkPartSelect && !$scope.ErrChkAlreadyExists) {
                isValid = true;
            }
        }
        if (isValid) {
            if (spareupload.Sparetype == 'Y') {
                spareupload.Quantity = 1;
            }
            $scope.SaveSpareUpload(spareupload);
            $scope.SpareUploadMasterForm.$setPristine();
        }
        else {
            angular.forEach($scope.SpareUploadMasterForm.$error.required, function (field) {
                field.$setDirty();
            });
            var PartNumber = document.getElementById("PartNumber");
            var PartName = document.getElementById("PartName");
            var VendorCode = document.getElementById("VendorCode");
            var CostPerUnit = document.getElementById("CostPerUnit");
            var Quantity = document.getElementById("Quantity");
            var Spare_Location = document.getElementById("Spare_Location");
            if (PartNumber.value == "") {
                PartNumber.focus();
            }

            else if (PartName.value == "") {

                PartName.focus();
            }

            else if (CostPerUnit.value == "") {

                CostPerUnit.focus();
            }
            else if (Spare_Location.value == "") {

                Spare_Location.focus();
            }
            else if (Quantity.value == "") {

                Quantity.focus();
            }
            else if (VendorCode.value == "") {

                VendorCode.focus();
            }
        }
    };

    $scope.SaveSpareUpload = function (spareupload) {
        if (spareupload.IsActive == true) {
            spareupload.IsActive = "1";

        }
        else {
            spareupload.IsActive = "0";
        }
        var request = new spareuploadServices.SaveSpareUpload(spareupload);
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;

            if (response.liSpareUpload != null) {
                if (response.liSpareUpload[0].MSG == "Updated Success") {
                    $("#Message").val('Updated !! ');//Messgae
                    $('#Title').html('Spare Inward Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = new spareuploadServices.spareuploadData(null);
                    $scope.SpareUploadMasterForm.$setPristine();
                }
                else if (response.liSpareUpload[0].MSG == "Spare Already Uploaded") {

                    $("#Message").val('Alter !! ');//Messgae
                    $('#Title').html('Part Number - "' + response.liSpareUpload[0].PartNumber + '" Already Exists');//Title
                    $("#Message").trigger("click");
                    $scope.obj.IsActive = true;
                }
                else {
                    $("#Message").val('Saved !! ');//Messgae
                    $('#Title').html('Spare Inward Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = new spareuploadServices.spareuploadData(null);
                    $scope.SpareUploadMasterForm.$setPristine();
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
        $scope.obj = new spareuploadServices.spareuploadData(row);
        myFunctionCompany();
    }

});