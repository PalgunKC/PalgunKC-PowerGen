TooluploadApp.controller('TooluploadCtrl', function (Excel, $timeout, $scope, $filter, TooluploadServices, commonService) {
    $scope.PartMasterList = [];
    $scope.ToolVendorList = [];
    $scope.ToolUploadList = [];
    $scope.ToolLocationList = [];
    $scope.FullToolUploadList = [];
    $scope.ErrChkReusableQty = false;
    $scope.ErrUnicodeMust = false;
    $scope.UnicodeValueRows = [{ 'ROWID': '1', 'UNICODE_VALUE': '' }];
    $scope.PartGroupMasterList = [];
    $scope.PartGroupList = [];
    $scope.OrgId = 0;

    $scope.Inward_Flag = false;
    $scope.Inward1_Flag = false;
    $scope.ProductGroup_Flag = false;



    $scope.obj = new TooluploadServices.TooluploadData(null);

    $scope.FunctionSearch = function (obj) {
        debugger;
        if (obj.SearchField == '') {
            $scope.init()
            return false;
        }
        if (obj.SearchData == '') {
            $scope.init()
            return false;
        }
        commonService.postWebService('Tool/BindListToolUpload', { 'P_KEY': 'Search', 'SearchField': obj.SearchField, 'SearchData': obj.SearchData }).then(function (response) {
            $scope.ToolUploadList = response.ddlToolUpload;
            $scope.OrgId = response.ddlToolUpload[0].OrgID;
            $scope.obj.ToolInward_no = $scope.ToolUploadList[0].Max_ToolInward_no;
            $scope.TotalCount = parseInt($scope.ToolUploadList[0].TotalCount)
        });
    }
    $scope.BindFilterData = function () {

        commonService.postWebService('Tool/BindListToolUpload', { 'P_KEY': 'CL', 'dummycolumn1': 'Inward', 'P_PAGE_INDEX': $scope.currentPage, 'P_PAGE_SIZE': '10' }).then(function (response) {
            $scope.ToolUploadList = response.ddlToolUpload;
            $scope.obj.ToolInward_no = $scope.ToolUploadList[0].Max_ToolInward_no;
            $scope.TotalCount = parseInt($scope.ToolUploadList[0].TotalCount)
        });

    };
    $scope.GetExcelData = function () {
        commonService.postWebService('Tool/GetExcelToolPartUploadData', { 'P_KEY': 'EXCEL', 'dummycolumn1': 'Part' }).then(function (response) {

            $scope.DownloadTab(response);
        });
    }
    $scope.DownloadTab = function (response) {
        window.location = '/Tool/Download?ID=' + response.ID + '&Name=' + response.FileName;
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

        commonService.postWebService('Tool/BindListToolUpload', { 'P_KEY': 'CL', 'dummycolumn1': 'Inward', 'P_PAGE_INDEX': '1', 'P_PAGE_SIZE': '10' }).then(function (response) {
            $scope.ToolUploadList = response.ddlToolUpload;
            $scope.OrgId = response.ddlToolUpload[0].OrgID;
            $scope.obj.ToolInward_no = $scope.ToolUploadList[0].Max_ToolInward_no;
            $scope.TotalCount = parseInt($scope.ToolUploadList[0].TotalCount)
            $scope.Inward_Flag = true;
        });

        commonService.postWebService('Tool/BindListToolUpload', { 'P_KEY': 'L', 'dummycolumn1': 'Inward' }).then(function (response) {
            $scope.FullToolUploadList = response.ddlToolUploadList;
            $scope.Inward1_Flag = true;
        });

        commonService.postWebService('Tool/BindListToolUpload', { 'P_KEY': 'L', 'dummycolumn1': 'ProductGroup' }).then(function (response) {
            $scope.PartGroupList = response.ddlToolPartGroup;
            $scope.ProductGroup_Flag = true;
        });



    };
    $scope.numPages = function () {
        return Math.ceil($scope.TotalCount / $scope.numPerPage);
    };
    $scope.filterPartMasterList = function (PartMasterList) {
        return (PartMasterList.IsActive === 'Y');
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

    $scope.CancelToolUpload = function () {
        $scope.IsListDivVisible = true;
        $scope.IsEditDivVisible = false;
        $scope.obj = new TooluploadServices.TooluploadData(null);
        $scope.obj.PartNumber = "";
        $scope.obj.VendorCode = "";
        $scope.obj.Tool_Location = "";
        $scope.ToolUploadMasterForm.$setPristine();
    };
    $scope.addUnicodeValNewRow = function (obj) {
        debugger;
        if (obj.Tooltype == 'Y') {
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
        if ($scope.Inward_Flag === false || $scope.Inward1_Flag === false || $scope.ProductGroup_Flag === false) {
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
        $scope.PartGroupMasterList = [];
        $scope.IsEditDivVisible = true;
        $scope.IsListDivVisible = false;
        $scope.UnicodeValueRows = [{ 'ROWID': '1', 'UNICODE_VALUE': '' }];

        if ($scope.PartMasterList == 0) {
            commonService.postWebService('Tool/BindListToolUpload', { 'P_KEY': 'L', 'dummycolumn1': 'Part' }).then(function (response) {

                $scope.PartMasterList = response.ddlPartmaster;
                if ($scope.ToolLocationList == 0) {
                    commonService.postWebService('Tool/BindListToolUpload', { 'P_KEY': 'L', 'dummycolumn1': 'Location' }).then(function (response) {

                        $scope.ToolLocationList = response.ddlToolLocation;
                        if ($scope.ToolVendorList == 0) {
                            commonService.postWebService('Tool/BindListToolUpload', { 'P_KEY': 'L', 'dummycolumn1': 'Vendor' }).then(function (response) {

                                $scope.ToolVendorList = response.ddlVendormaster;

                                //angular.forEach($scope.PartMasterList, function (value, key) {
                                //    angular.forEach($scope.ToolUploadList, function (value1, key) {
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
            //$scope.UnicodeValueRows.splice(0, 1)
            //$scope.UnicodeValueRows.push({ 'ROWID': '1', 'UNICODE_VALUE': row.ToolUniqueCode });
            $scope.BindPartGroupList(row);
            $scope.GetInwardDetails(row, key);
            //$scope.BindPartName(row, key);
            //$scope.obj = new TooluploadServices.TooluploadData(row);
            //$scope.obj.KEY = key;
            //if (row.IsActive == 'N') {
            //    $scope.obj.IsActive = false;
            //}
            //else {
            //    $scope.obj.IsActive = true;
            //}
        }
        else {
            //row.P_KEY = 'S';
            $scope.disableCtrl = false;

            $scope.obj = new TooluploadServices.TooluploadData(null);


            if ($scope.OrgId == 1) {
                $scope.obj.BusinessUnit = 'Brakes';
            }
            else if ($scope.OrgId == 2) {
                $scope.obj.BusinessUnit = 'Steering';
            }
            else if ($scope.OrgId == 3) {
                $scope.obj.BusinessUnit = 'EBS';
            }
            if ($scope.ToolUploadList.length > 0) {
                $scope.obj.ToolInward_no = $scope.ToolUploadList[0].Max_ToolInward_no;

            }
            $scope.disablecode = false;
            $scope.obj.IsActive = true;
            $scope.obj.KEY = key;
        }
    };


    $scope.GetInwardDetails = function (row, key) {
        // $scope.obj = new TooluploadServices.TooluploadData(row);
        //$scope.obj.P_KEY = 'U';
        $scope.ProductGroup = row.ProductGroup;
        var request = new TooluploadServices.GetInwardDetails(row);
        //request.P_KEY = 'U';
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;

            if (response.liToolUpload != null) {
                response.liToolUpload[0].ProductGroup = $scope.ProductGroup;
                $scope.BindInwarDetails(response.liToolUpload[0], key);

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
        var str_array = row.ToolUniqueCode.split(',');
        for (var i = 0; i < str_array.length; i++) {
            $scope.UnicodeValueRows.push({ 'ROWID': '1', 'UNICODE_VALUE': str_array[i] });
        }
        $scope.obj = new TooluploadServices.TooluploadData(row);
        $scope.obj.KEY = key;
        if (row.IsActive == 'N') {
            $scope.obj.IsActive = false;
        }
        else {
            $scope.obj.IsActive = true;
        }
    }
    $scope.BindPartGroupList = function (row) {
        $scope.PartGroupMasterList = [];
        $scope.PartGroupMasterList = $scope.PartMasterList.filter(function (o) { return o.ProductGroup === row.ProductGroup });

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
                row.Tooltype = value.IsReusable
                if (value.IsReusable == 'Y') {
                    //row.Quantity = 1;

                    if (row.ToolUniqueCode == null) {
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

                //row.Tool_Location = value.Tool_Location
                if (keyno != 'E') {
                    row.Tool_Location = value.Tool_Location;
                    row.VendorCode = value.VendorCode;
                    $scope.BindVendorName(row);

                    if (value.ItemType == 'MRO') {
                        row.CostPerUnit = value.CostPerUnit;
                    }
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

        if (row.Tooltype == 'Y') {
            //if (row.Quantity > 1) {
            //    $scope.ErrChkReusableQty = true;
            //}
            //else {
            //    $scope.ErrChkReusableQty = false;
            //}
        }

        if (row.Tooltype == 'Y') {
            //if (row.ToolUniqueCode == null) {
            //    $scope.ErrUnicodeMust = true;
            //}
            //else if (row.ToolUniqueCode == '') {
            //    $scope.ErrUnicodeMust = true;
            //}
            //else {
            //    $scope.ErrUnicodeMust = false;
            //}
        }

        // {
        $scope.ErrChkAlreadyExists = false;
        // }
        //if (row.Tooltype == 'Y') {
        //    angular.forEach($scope.ToolUploadList, function (value, key) {
        //        //value.Quantity = parseFloat(value.Quantity);
        //        if (row.PartNumber == value.PartNumber && row.ToolUniqueCode == value.ToolUniqueCode) {
        //            $scope.ErrChkAlreadyExists = true;
        //            //return false;
        //        }
        //    });
        //}

    }
    $scope.ChkAlreadyExitsUnicode = function (row, index) {
        debugger;
        //for(i=0;i<=$scope.ToolUploadList.Length;i++)
        //if (row.Tooltype == "Y")
        //    {
        angular.forEach($scope.FullToolUploadList, function (value, key) {
            if ($scope.obj.PartNumber == value.PartNumber && row.UNICODE_VALUE == value.ToolUniqueCode) {
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
        //}
    }


    $scope.BindVendorName = function (row) {
        debugger;
        angular.forEach($scope.ToolVendorList, function (value, key) {
            if (value.VendorCode == row.VendorCode) { row.VendorName = value.VendorName };
        });
    }
    $scope.submitForm = function (isValid, Toolupload) {
        // check to make sure the form is completely valid
        var i;
        debugger;
        if (Toolupload.KEY == 'E') {
            Toolupload.P_KEY = 'U';
        }
        var a = "";
        //var aa = [];
        angular.forEach($scope.UnicodeValueRows, function (value, key) {
            if (value.UNICODE_VALUE != "") {
                a = a + "," + value.UNICODE_VALUE;
                $scope.ErrUnicodeMust = false;
            }
            else {
                if (Toolupload.Tooltype == 'Y') {
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
        Toolupload.ToolUniqueCode = a.substr(1);

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
            if (Toolupload.Tooltype == 'Y') {
                Toolupload.Quantity = 1;
            }
            $scope.SaveToolUpload(Toolupload);
            $scope.ToolUploadMasterForm.$setPristine();
        }
        else {
            angular.forEach($scope.ToolUploadMasterForm.$error.required, function (field) {
                field.$setDirty();
            });
            var PartNumber = document.getElementById("PartNumber");
            var PartName = document.getElementById("PartName");
            var VendorCode = document.getElementById("VendorCode");
            var CostPerUnit = document.getElementById("CostPerUnit");
            var Quantity = document.getElementById("Quantity");
            var Tool_Location = document.getElementById("Tool_Location");
            if (PartNumber.value == "") {
                PartNumber.focus();
            }

            else if (PartName.value == "") {

                PartName.focus();
            }

            else if (CostPerUnit.value == "") {

                CostPerUnit.focus();
            }
            else if (Tool_Location.value == "") {

                Tool_Location.focus();
            }
            else if (Quantity.value == "") {

                Quantity.focus();
            }
            else if (VendorCode.value == "") {

                VendorCode.focus();
            }
        }
    };

    $scope.SaveToolUpload = function (Toolupload) {
        if (Toolupload.IsActive == true) {
            Toolupload.IsActive = "1";

        }
        else {
            Toolupload.IsActive = "0";
        }
        var request = new TooluploadServices.SaveToolUpload(Toolupload);
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;

            if (response.liToolUpload != null) {
                if (response.liToolUpload[0].MSG == "Updated Success") {
                    $("#Message").val('Updated !! ');//Messgae
                    $('#Title').html('Tool Inward Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = new TooluploadServices.TooluploadData(null);
                    $scope.ToolUploadMasterForm.$setPristine();
                }
                else if (response.liToolUpload[0].MSG == "Tool Already Uploaded") {

                    $("#Message").val('Alter !! ');//Messgae
                    $('#Title').html('Part Number - "' + response.liToolUpload[0].PartNumber + '" Already Exists');//Title
                    $("#Message").trigger("click");
                    $scope.obj.IsActive = true;
                }
                else {
                    $("#Message").val('Saved !! ');//Messgae
                    $('#Title').html('Tool Inward Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = new TooluploadServices.TooluploadData(null);
                    $scope.ToolUploadMasterForm.$setPristine();
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

    $scope.filterPartGroupList = function (PartGroupList) {
        return (PartGroupList.IsActive === 'Y');
    }

    $scope.myFunctionCompany = function (row, key) {
        $scope.obj = new TooluploadServices.TooluploadData(row);
        myFunctionCompany();
    }

});