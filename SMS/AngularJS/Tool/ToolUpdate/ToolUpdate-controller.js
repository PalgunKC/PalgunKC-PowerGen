toolupdateApp.controller('toolupdateCtrl', function ($scope, $filter, toolupdateServices, commonService, DTOptionsBuilder, DTColumnBuilder) {
    $scope.PartMasterList = [];
    $scope.ToolLocationList = [];
    $scope.ToolUpdateList = [];
    $scope.obj = new toolupdateServices.toolupdateData(null);

    $scope.init = function () {
        debugger;
        commonService.postWebService('Tool/BindListToolUpdate', {}).then(function (response) {
            $scope.PartMasterList = response.ddlToolUpload;
            $scope.ToolLocationList = response.ddlToolLocation;
            $scope.ToolUpdateList = response.ddlToolUpdate;
            $scope.IsListDivVisible = true;
            $scope.IsEditDivVisible = false;
        });
        $scope.DatatableInitialize();
    };
    //$scope.filterPartMasterList = function (PartMasterList) {
    //    return (PartMasterList.SpareType === 'T');
    //}
    $scope.DatatableInitialize = function () {
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
		  .withOption('order', [0, 'asc']);;
    };

    $scope.CancelToolUpdate = function () {
        $scope.IsListDivVisible = true;
        $scope.IsEditDivVisible = false;
        $scope.obj = null;
        $scope.ToolUpdateMasterForm.$setPristine();
    };


    $scope.editClick = function (row, key, IsActive) {
        debugger;
        $scope.IsEditDivVisible = true;
        $scope.IsListDivVisible = false;
        if (key == 'E') {
            $scope.obj = new toolupdateServices.toolupdateData(row);
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
            $scope.obj = new toolupdateServices.toolupdateData(null);
            $scope.disablecode = false;
            $scope.obj.IsActive = true;
            $scope.obj.KEY = key;
        }
    };
    $scope.BindPartName = function (row) {
        debugger;
        angular.forEach($scope.PartMasterList, function (value, key) {
            if (value.PartNumber == row.PartNumber) { row.PartName = value.PartName };
            if (value.PartNumber == row.PartNumber) { row.Quantity = value.Quantity };
            if (value.PartNumber == row.PartNumber) { row.ToolUploadId = value.ToolUploadId };
            
        });
    }
    //$scope.BindVendorName = function (row) {
    //    debugger;
    //    angular.forEach($scope.ToolLocationList, function (value, key) {
    //        if (value.VendorCode == row.VendorCode) { row.VendorName = value.VendorName };
    //    });
    //}
    $scope.submitForm = function (isValid, toolupdate) {
        // check to make sure the form is completely valid
        debugger;
        if (isValid) {
            $scope.SaveToolUpdate(toolupdate);
            $scope.ToolUpdateMasterForm.$setPristine();
        }
        else {
            angular.forEach($scope.ToolUpdateMasterForm.$error.required, function (field) {
                field.$setDirty();
            });
            var PartNumber = document.getElementById("PartNumber");
            var PartName = document.getElementById("PartName");
            var VendorCode = document.getElementById("VendorCode");
            var CostPerUnit = document.getElementById("CostPerUnit");
            var Quantity = document.getElementById("Quantity");
            if (PartNumber.value == "") {
                PartNumber.focus();
            }

            else if (PartName.value == "") {

                PartName.focus();
            }
          
            else if (CostPerUnit.value == "") {

                CostPerUnit.focus();
            }
            else if (Quantity.value == "") {

                Quantity.focus();
            }
              else if (VendorCode.value == "") {

                VendorCode.focus();
            }
        }
    };

    $scope.SaveToolUpdate = function (toolupdate) {
        if (toolupdate.IsActive == true) {
            toolupdate.IsActive = "1";

        }
        else {
            toolupdate.IsActive = "0";
        }
        var request = new toolupdateServices.SaveToolUpdate(toolupdate);
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;

            if (response.liToolUpdate != null) {
                if (response.liToolUpdate[0].MSG == "Updated Success") {
                    $("#Message").val('Updated !! ');//Messgae
                    $('#Title').html('Tool Updated Successfully');//Title
                     $("#Message").trigger("click");
                $scope.init();
                $scope.obj = null;
                $scope.ToolUpdateMasterForm.$setPristine();
                }
                else if (response.liToolUpdate[0].MSG == "Tool Already Updated") {
                   
                    $("#Message").val('Alter !! ');//Messgae
                    $('#Title').html('Part Number - "' + response.liToolUpdate[0].PartNumber + '" Already Exists');//Title
                    $("#Message").trigger("click");
                    $scope.obj.IsActive = true;
                }
                else {
                    $("#Message").val('Saved !! ');//Messgae
                    $('#Title').html('Tool Update Saved Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = null;
                    $scope.ToolUpdateMasterForm.$setPristine();
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
        $scope.obj = new toolupdateServices.toolupdateData(row);
        myFunctionCompany();
    }

});