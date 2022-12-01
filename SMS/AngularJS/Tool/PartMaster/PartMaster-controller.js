partmasterApp.controller('partmasterCtrl', function (Excel, $timeout, $scope, $filter, partmasterServices, commonService) {
    $scope.PartMasterList = [];
    $scope.StateList = [];
    $scope.CityList = [];
    $scope.ToolLocationList = [];
    $scope.ToolVendorList = [];
    $scope.PartGroupList = [];
    $scope.obj = new partmasterServices.partmasterData(null);
    $scope.disableCtrl = false;
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
        commonService.postWebService('Tool/BindListPartMaster', { 'P_KEY': 'Search', 'SearchField': obj.SearchField, 'SearchData': obj.SearchData }).then(function (response) {
            $scope.PartMasterList = response.ddlToolPartmaster;
            $scope.OrgId = response.ddlOrgId;
            $scope.TotalCount = parseInt($scope.PartMasterList[0].TotalCount);
           // if ($scope.OrgId == 1) {
           //     $scope.PartGroupList = [
           // "MCMM",
           // "CCMM",
           // "CHMM",
           // "ASSEMBLY",
           // "COMMON"
           //     ];
           // }
           // else if ($scope.OrgId == 3) {
           //     $scope.PartGroupList = [
           //"EBSA",
           //"EBSM",
           //"EBSU",
           //"EBSC"

           //     ];
           // }

        });
    }

    $scope.GetExcelData = function () {
        commonService.postWebService('Tool/GetExcelPartData', { 'P_KEY': 'L', 'dummycolumn1': 'Part' }).then(function (response) {

            $scope.DownloadTab(response);
        });
    }
    $scope.DownloadTab = function (response) {
        //alert(response);
        //$("#page-loader").hide();

        window.location = '/Tool/Download?ID=' + response.ID + '&Name=' + response.FileName;
    };

    $scope.init = function () {
        $scope.IsListDivVisible = true;
        $scope.IsEditDivVisible = false;

        $scope.filteredTodos = []
            , $scope.currentPage = 1
            , $scope.numPerPage = 10
            , $scope.maxSize = 5
            , $scope.TotalCount = 0;



        commonService.postWebService('Tool/BindListPartMaster', { 'P_KEY': 'Part', 'P_PAGE_INDEX': '1', 'P_PAGE_SIZE': '10' }).then(function (response) {
            $scope.PartMasterList = response.ddlToolPartmaster;
            $scope.OrgId = response.ddlOrgId;
            $scope.TotalCount = parseInt($scope.PartMasterList[0].TotalCount);

        });
        commonService.postWebService('Tool/BindListPartMaster', { 'P_KEY': 'ProductGroup' }).then(function (response) {
            $scope.PartGroupList = response.ddlToolPartGroup;
        });



    };
    $scope.numPages = function () {
        return Math.ceil($scope.TotalCount / $scope.numPerPage);
    };

    $scope.BindFilterData = function () {
        //var begin = (($scope.currentPage - 1) * $scope.numPerPage)
        //, end = begin + $scope.numPerPage;

        //$scope.SparePartMasterList = $scope.todos.slice(begin, end);
        commonService.postWebService('Tool/BindListPartMaster', { 'P_KEY': 'Part', 'P_PAGE_INDEX': $scope.currentPage, 'P_PAGE_SIZE': '10' }).then(function (response) {
            $scope.PartMasterList = response.ddlToolPartmaster;
            $scope.OrgId = response.ddlOrgId;
            $scope.TotalCount = parseInt($scope.PartMasterList[0].TotalCount);


        });
    };


    $scope.filterToolLocationList = function (ToolLocationList) {
        return (ToolLocationList.IsActive === 'Y');
    };
    $scope.filterToolVendorList = function (ToolVendorList) {
        return (ToolVendorList.IsActive === 'Y');
    };

    $scope.BindVendorName = function (row) {
        debugger;
        angular.forEach($scope.ToolVendorList, function (value, key) {
            if (value.VendorCode == row.VendorCode) {
                row.VendorName = value.VendorName
            };
        });
    }
    $scope.CancelPartMaster = function () {
        $scope.IsListDivVisible = true;
        $scope.IsEditDivVisible = false;
        $scope.obj = null;
        $scope.PartMasterForm.$setPristine();
    };

    $scope.exportToExcel = function (tableId) { // ex: '#my-table'
        debugger;
        var exportHref = Excel.tableToExcel(tableId, 'madasamy');
        $timeout(function () {
            var a = document.createElement('a');
            a.href = exportHref;
            a.download = "PartMaster.xls";
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
                pdfMake.createPdf(docDefinition).download("PartMaster.pdf");
            }
        });
    };



    $scope.editClick = function (row, key, IsActive) {
        debugger;
        //if ($scope.OrgId == 1) {
        //    $scope.PartGroupList = [
        //"MCMM",
        //"CCMM",
        //"CHMM",
        //"ASSEMBLY",
        //"COMMON"
        //    ];
        //}
        //else if ($scope.OrgId == 2) {
        //    $scope.PartGroupList = [
        //   "EBSA",
        //   "EBSM",
        //   "EBSU",
        //   "EBSC"

        //    ];
        //}
        //else if ($scope.OrgId == 3) {
        //    $scope.PartGroupList = [
        //   "EBSA",
        //   "EBSM",
        //   "EBSU",
        //   "EBSC"

        //    ];
        //}
        $scope.IsEditDivVisible = true;
        $scope.IsListDivVisible = false;
        if ($scope.ToolLocationList) {
            if ($scope.ToolLocationList.length == 0) {
                commonService.postWebService('Tool/BindListPartMaster', { 'P_KEY': 'Location' }).then(function (response) {
                    $scope.ToolLocationList = response.ddlToolLocation;
                });
            }
        }
        if (key == 'E') {
            if ($scope.ToolVendorList.length == 0) {
                $scope.disableCtrl = false;
                commonService.postWebService('Tool/BindListPartMaster', { 'P_KEY': 'Vendor' }).then(function (response) {
                    $scope.ToolVendorList = response.ddlVendormaster;
                    angular.forEach($scope.ToolVendorList, function (value, key) {
                        if (value.VendorCode == row.VendorCode) {
                            row.Min_qty = parseFloat(row.Min_qty);
                            row.Max_qty = parseFloat(row.Max_qty);
                            row.VendorName = value.VendorName
                            $scope.obj = new partmasterServices.partmasterData(row);
                            $scope.obj.KEY = key;
                            $scope.obj.ProductGroup = row.ProductGroup;
                            if (row.IsActive == 'N') {
                                $scope.obj.IsActive = false;
                            }
                            else {
                                $scope.obj.IsActive = true;
                            }
                            //$scope.BindCity(row, "E");
                        };
                    });
                });
            }
            else {
                if ($scope.ToolVendorList.length == 0) {

                    commonService.postWebService('Tool/BindListPartMaster', { 'P_KEY': 'Vendor' }).then(function (response) {
                        $scope.ToolVendorList = response.ddlVendormaster;

                    });
                }
                $scope.disableCtrl = true;
                row.Min_qty = parseFloat(row.Min_qty);
                row.Max_qty = parseFloat(row.Max_qty);
                $scope.BindVendorName(row); //commet for tune
                $scope.obj = new partmasterServices.partmasterData(row);//commet for tune
                //commet for tune
                $scope.obj.KEY = key;
                if (row.IsActive == 'N') {
                    $scope.obj.IsActive = false;
                }
                else {
                    $scope.obj.IsActive = true;
                }
            }
        }
        else {
            if ($scope.ToolVendorList.length == 0) {

                commonService.postWebService('Tool/BindListPartMaster', { 'P_KEY': 'Vendor' }).then(function (response) {
                    $scope.ToolVendorList = response.ddlVendormaster;

                });
            }
            $scope.obj = new partmasterServices.partmasterData(null);
            $scope.disablecode = false;
            $scope.obj.IsActive = true;
            $scope.obj.KEY = key;
            $scope.disableCtrl = false;
        }
    };

    $scope.submitForm = function (isValid, partmaster) {
        // check to make sure the form is completely valid
        debugger;
        if (isValid) {
            $scope.SavePartMaster(partmaster);
            $scope.PartMasterForm.$setPristine();
        }
        else {
            angular.forEach($scope.PartMasterForm.$error.required, function (field) {
                field.$setDirty();
            });
            var PartNumber = document.getElementById("PartNumber");
            var PartName = document.getElementById("PartName");
            var PartSpecification = document.getElementById("PartSpecification");
            //var CostPerUnit = document.getElementById("CostPerUnit");

            var SubInv = document.getElementById("SubInv");
            var ItemType = document.getElementById("ItemType");
            var Min_qty = document.getElementById("Min_qty");
            var Max_qty = document.getElementById("Max_qty");
            var Reorder_qty = document.getElementById("Reorder_qty");
            var LifeTime = document.getElementById("LifeTime");

            //if (SubInv.value == "") {
            //    SubInv.focus();
            //}
            if (ItemType.value == "") {
                ItemType.focus();
            }
            else if (PartNumber.value == "") {
                PartNumber.focus();
            }

            else if (PartName.value == "") {

                PartName.focus();
            }
            else if (PartSpecification.value == "") {

                PartSpecification.focus();
            }
                //else if (CostPerUnit.value == "") {

                //    CostPerUnit.focus();
                //}
            else if (Min_qty.value == "") {
                Min_qty.focus();
            }
            else if (Max_qty.value == "") {
                Max_qty.focus();
            }
            else if (Reorder_qty.value == "") {
                Reorder_qty.focus();
            }
            //else if (LifeTime.value == "") {
            //    LifeTime.focus();
            //}

        }
    };

    $scope.SavePartMaster = function (partmaster) {
        if (partmaster.IsActive == true) {
            partmaster.IsActive = "1";

        }
        else {
            partmaster.IsActive = "0";
        }
        var request = new partmasterServices.SavePartMaster(partmaster);
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;

            if (response.liPartmaster != null) {
                if (response.liPartmaster[0].MSG == "Updated Success") {
                    $("#Message").val('Updated !! ');//Messgae
                    $('#Title').html('Tool PartMaster Updated Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = null;
                    $scope.PartMasterForm.$setPristine();
                }
                else if (response.liPartmaster[0].MSG == "Part Number Already Exists") {

                    $("#Message").val('Alter !! ');//Messgae
                    $('#Title').html('Part Number - "' + response.liPartmaster[0].PartNumber + '" Already Exists');//Title
                    $("#Message").trigger("click");
                    $scope.obj.IsActive = true;
                }
                else {
                    $("#Message").val('Saved !! ');//Messgae
                    $('#Title').html('Tool PartMaster Saved Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = null;
                    $scope.PartMasterForm.$setPristine();
                }

            }
            else {
                $("#Message").val('Failed !! ');//Messgae
                $('#Title').html('Error Happened while Saving Category');//Title
                $("#Message").trigger("click");
            }
        });

    };


    $scope.c = function (partmaster) {
        if (partmaster.IsActive == true) {
            partmaster.IsActive = "1";

        }
        else {
            partmaster.IsActive = "0";
        }
        var request = new partmasterServices.c(partmaster);
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;

            if (response.liPartmaster != null) {
                if (response.liPartmaster[0].MSG == "Updated Success") {
                    $("#Message").val('Updated !! ');//Messgae
                    $('#Title').html('Tool PartMaster Updated Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = null;
                    $scope.PartMasterForm.$setPristine();
                }
                else if (response.liPartmaster[0].MSG == "Part Number Already Exists") {

                    $("#Message").val('Alter !! ');//Messgae
                    $('#Title').html('Part Number - "' + response.liPartmaster[0].PartNumber + '" Already Exists');//Title
                    $("#Message").trigger("click");
                    $scope.obj.IsActive = true;
                }
                else {
                    $("#Message").val('Saved !! ');//Messgae
                    $('#Title').html('Tool PartMaster Saved Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = null;
                    $scope.PartMasterForm.$setPristine();
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
        $scope.obj = new partmasterServices.partmasterData(row);
        myFunctionCompany();
    }

});