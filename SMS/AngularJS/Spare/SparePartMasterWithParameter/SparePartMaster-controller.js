sparepartmasterApp.controller('sparepartmasterCtrl', function (Excel, $timeout, $scope, $filter, sparepartmasterServices, commonService, DTOptionsBuilder, DTColumnBuilder) {
    $scope.SpareSparePartMasterList = [];
    $scope.StateList = [];
    $scope.CityList = [];
    $scope.SpareLocationList = [];
    $scope.ToolVendorList = [];

    $scope.obj = new sparepartmasterServices.sparepartmasterData(null);

    $scope.init = function () {
        debugger;
        commonService.postWebService('Spare/BindListSparePartMasterWithParameter', {}).then(function (response) {
            $scope.SparePartMasterList = response.ddlSparePartmaster;
            $scope.SpareLocationList = response.ddlSpareLocation;
            $scope.ToolVendorList = response.ddlVendormaster;

            angular.forEach($scope.SparePartMasterList, function (value, key) {
                value.Min_qty = parseFloat(value.Min_qty);
                value.Max_qty = parseFloat(value.Max_qty);
            });
            //$scope.CityList = response.liCityMaster;
            $scope.StateList = response.liStateMaster;
            $scope.IsListDivVisible = true;
            $scope.IsEditDivVisible = false;
        });
        $scope.DatatableInitialize();
    };

    $scope.DatatableInitialize = function () {
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
		  .withOption('order', [0, 'asc']);;
    };
    $scope.filterSpareLocationList = function (SpareLocationList) {
        return (SpareLocationList.IsActive === 'Y');
    }
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
    $scope.CancelSparePartMaster = function () {
        $scope.IsListDivVisible = true;
        $scope.IsEditDivVisible = false;
        $scope.obj = null;
        $scope.SparePartMasterForm.$setPristine();
    };

    $scope.exportToExcel = function (tableId) { // ex: '#my-table'
        debugger;
        var exportHref = Excel.tableToExcel(tableId, 'madasamy');
        $timeout(function () {
            var a = document.createElement('a');
            a.href = exportHref;
            a.download = "SparePartMaster.xls";
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
                pdfMake.createPdf(docDefinition).download("SparePartMaster.pdf");
            }
        });
    };



    $scope.editClick = function (row, key, IsActive) {
        debugger;
        $scope.IsEditDivVisible = true;
        $scope.IsListDivVisible = false;
        if (key == 'E') {
            $scope.BindVendorName(row);
            $scope.obj = new sparepartmasterServices.sparepartmasterData(row);
            $scope.obj.KEY = key;
            if (row.IsActive == 'N') {
                $scope.obj.IsActive = false;
            }
            else {
                $scope.obj.IsActive = true;
            }
            $scope.BindCity(row, "E");
        }
        else {
            $scope.obj = new sparepartmasterServices.sparepartmasterData(null);
            $scope.disablecode = false;
            $scope.obj.IsActive = true;
            $scope.obj.KEY = key;
        }
    };

    $scope.submitForm = function (isValid, sparepartMaster) {
        // check to make sure the form is completely valid
        debugger;
        if (isValid) {
            $scope.SaveSparePartMaster(sparepartMaster);
            $scope.SparePartMasterForm.$setPristine();
        }
        else {
            angular.forEach($scope.SparePartMasterForm.$error.required, function (field) {
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

    $scope.SaveSparePartMaster = function (sparepartMaster) {
        if (sparepartMaster.IsActive == true) {
            sparepartMaster.IsActive = "1";

        }
        else {
            sparepartMaster.IsActive = "0";
        }
        var request = new sparepartmasterServices.SaveSparePartMaster(sparepartMaster);
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;

            if (response.liSparePartmaster != null) {
                if (response.liSparePartmaster[0].MSG == "Updated Success") {
                    $("#Message").val('Updated !! ');//Messgae
                    $('#Title').html('Spare PartMaster Updated Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = null;
                    $scope.SparePartMasterForm.$setPristine();
                }
                else if (response.liSparePartmaster[0].MSG == "Part Number Already Exists") {

                    $("#Message").val('Alter !! ');//Messgae
                    $('#Title').html('Part Number - "' + response.liSparePartmaster[0].PartNumber + '" Already Exists');//Title
                    $("#Message").trigger("click");
                    $scope.obj.IsActive = true;
                }
                else {
                    $("#Message").val('Saved !! ');//Messgae
                    $('#Title').html('Spare PartMaster Saved Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = null;
                    $scope.SparePartMasterForm.$setPristine();
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
        $scope.obj = new sparepartmasterServices.sparepartmasterData(row);
        myFunctionCompany();
    }

});