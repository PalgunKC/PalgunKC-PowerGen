partmasterApp.controller('partmasterCtrl', function (Excel, $timeout,$scope, $filter, partmasterServices, commonService, DTOptionsBuilder, DTColumnBuilder) {
    $scope.PartMasterList = [];
    $scope.StateList = [];
    $scope.CityList = [];
    $scope.ToolLocationList = [];
    $scope.ToolVendorList = [];

    $scope.obj = new partmasterServices.partmasterData(null);

    $scope.init = function () {
        debugger;
        commonService.postWebService('Tool/BindListPartMasterWithParameter', {}).then(function (response) {
            $scope.PartMasterList = response.ddlToolPartmaster;
            $scope.ToolLocationList = response.ddlToolLocation;
            $scope.ToolVendorList = response.ddlVendormaster;

            angular.forEach($scope.PartMasterList, function (value, key) {
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
    $scope.filterToolLocationList = function (ToolLocationList) {
        return (ToolLocationList.IsActive === 'Y');
    };
    $scope.filterToolVendorList = function (ToolVendorList) {
        return (ToolVendorList.IsActive === 'Y');
    };

    $scope.BindVendorName = function (row) {
        debugger;
        angular.forEach($scope.ToolVendorList, function (value, key) {
            if (value.VendorCode == row.VendorCode)
            {
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
        $scope.IsEditDivVisible = true;
        $scope.IsListDivVisible = false;
        if (key == 'E') {
            $scope.BindVendorName(row);
            $scope.obj = new partmasterServices.partmasterData(row);
           
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
            $scope.obj = new partmasterServices.partmasterData(null);
            $scope.disablecode = false;
            $scope.obj.IsActive = true;
            $scope.obj.KEY = key;
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
            var CostPerUnit = document.getElementById("CostPerUnit");

            var SubInv = document.getElementById("SubInv");
            var ItemType = document.getElementById("ItemType");
            var Min_qty = document.getElementById("Min_qty");
            var Max_qty = document.getElementById("Max_qty");
            var Reorder_qty = document.getElementById("Reorder_qty");
            var LifeTime = document.getElementById("LifeTime");

            if (SubInv.value == "") {
                SubInv.focus();
            }
            else if (ItemType.value == "") {
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
            else if (CostPerUnit.value == "") {

                CostPerUnit.focus();
            }
            else if (Min_qty.value == "") {
                Min_qty.focus();
            }
            else if (Max_qty.value == "") {
                Max_qty.focus();
            }
            else if (Reorder_qty.value == "") {
                Reorder_qty.focus();
            }
            else if (LifeTime.value == "") {
                LifeTime.focus();
            }

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

    $scope.returnAcive = function (act) {
        return act == 1 ? 'Y' : 'N';
    };

    $scope.init();

    $scope.myFunctionCompany = function (row, key) {
        $scope.obj = new partmasterServices.partmasterData(row);
        myFunctionCompany();
    }

});